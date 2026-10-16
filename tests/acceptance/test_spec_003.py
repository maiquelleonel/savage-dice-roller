import json
import subprocess
from pathlib import Path

WORKSPACE_ROOT = Path(__file__).resolve().parent.parent.parent


def run_bun_snippet(script: str) -> dict:
    """Run a JavaScript snippet via Bun and parse JSON stdout."""
    res = subprocess.run(
        ["bun", "-e", script],
        capture_output=True,
        text=True,
        cwd=WORKSPACE_ROOT,
        check=False,
    )
    if res.returncode != 0:
        raise RuntimeError(f"Bun execution failed (exit code {res.returncode}):\n{res.stderr}\n{res.stdout}")
    return json.loads(res.stdout)


def test_scenario_1_save_deck_state():
    """Scenario 1: Salvar estado do baralho no storage.

    Given a deck with remaining cards and drawn cards
    When saveDeckState(deck, drawnCards, callback) is executed
    Then data is persisted to chrome.storage.local and callback is invoked.
    """
    js = """
    import { saveDeckState } from "./src/core.js";

    let savedData = null;
    let callbackCalled = false;

    globalThis.chrome = {
      storage: {
        local: {
          set: (data, cb) => {
            savedData = data;
            if (cb) cb();
          }
        }
      }
    };

    const mockDeck = [{ name: "A of ♠️", weight: 143 }];
    const mockDrawn = [{ name: "K of ♥️", weight: 132 }];

    saveDeckState(mockDeck, mockDrawn, () => {
      callbackCalled = true;
    });

    console.log(JSON.stringify({
      savedData,
      callbackCalled
    }));
    """
    result = run_bun_snippet(js)
    assert result["callbackCalled"] is True
    assert result["savedData"] is not None
    assert result["savedData"]["deck"] == [{"name": "A of ♠️", "weight": 143}]
    assert result["savedData"]["drawnCards"] == [{"name": "K of ♥️", "weight": 132}]


def test_scenario_2_load_deck_state_persisted():
    """Scenario 2: Carregar estado existente do storage.

    Given persisted deck state and drawn cards in chrome.storage.local
    When loadDeckState(callback) is executed
    Then the deck and drawn cards are restored and returned to callback.
    """
    js = """
    import { loadDeckState, deck } from "./src/core.js";

    const mockDeck = [{ name: "10 of ♦️", weight: 101 }];
    const mockDrawn = [{ name: "2 of ♣️", weight: 20 }];

    globalThis.chrome = {
      storage: {
        local: {
          get: (keys, cb) => {
            cb({ deck: mockDeck, drawnCards: mockDrawn });
          }
        }
      }
    };

    let receivedState = null;
    loadDeckState((state) => {
      receivedState = state;
    });

    console.log(JSON.stringify({
      receivedState,
      currentCoreDeck: deck
    }));
    """
    result = run_bun_snippet(js)
    assert result["receivedState"] is not None
    assert result["receivedState"]["deck"] == [{"name": "10 of ♦️", "weight": 101}]
    assert result["receivedState"]["drawnCards"] == [{"name": "2 of ♣️", "weight": 20}]
    assert result["currentCoreDeck"] == [{"name": "10 of ♦️", "weight": 101}]


def test_scenario_3_fallback_to_new_deck():
    """Scenario 3: Fallback para baralho novo quando storage vazio ou indisponível.

    Given chrome.storage.local has no saved state or is unavailable
    When loadDeckState(callback) is executed
    Then a fresh deck of 54 cards is created and drawnCards is empty.
    """
    js = """
    import { loadDeckState } from "./src/core.js";

    // Test with empty storage
    globalThis.chrome = {
      storage: {
        local: {
          get: (keys, cb) => {
            cb({});
          }
        }
      }
    };

    let emptyStorageState = null;
    loadDeckState((state) => {
      emptyStorageState = state;
    });

    // Test with chrome undefined
    delete globalThis.chrome;
    let noChromeState = null;
    loadDeckState((state) => {
      noChromeState = state;
    });

    console.log(JSON.stringify({
      emptyStorageState,
      noChromeState
    }));
    """
    result = run_bun_snippet(js)
    assert len(result["emptyStorageState"]["deck"]) == 54
    assert result["emptyStorageState"]["drawnCards"] == []

    assert len(result["noChromeState"]["deck"]) == 54
    assert result["noChromeState"]["drawnCards"] == []

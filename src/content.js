// savage-dice-roller/src/content.js

import {
  createDeck,
  drawCard,
  rollDice,
  formatDiceResultMessage,
} from "./core.js";

let savageWorldsUI = null;

function toggleSavageWorldsUI() {
  if (savageWorldsUI) {
    savageWorldsUI.style.display =
      savageWorldsUI.style.display === "none" ? "flex" : "none";
  } else {
    createSavageWorldsUIElement();
    savageWorldsUI.style.display = "flex";
  }
}

function createSavageWorldsUIElement() {
  if (document.getElementById("savage-worlds-dice-roller")) {
    savageWorldsUI = document.getElementById("savage-worlds-dice-roller");
    return;
  }

  savageWorldsUI = document.createElement("div");
  savageWorldsUI.id = "savage-worlds-dice-roller";
  savageWorldsUI.style.display = "none";
  savageWorldsUI.innerHTML = `
      <h3>Savage Worlds Dice</h3>
      <div class="dice-buttons">
          <button data-die="d4">d4</button>
          <button data-die="d6">d6</button>
          <button data-die="d8">d8</button>
          <button data-die="d10">d10</button>
          <button data-die="d12">d12</button>
      </div>
      <div class="wild-die-toggle">
          <label for="include-wild-die">Include Wild Die:</label>
          <input type="checkbox" id="include-wild-die" checked>
      </div>
      <div id="roll-results"></div>
      <button id="clear-results-button">Clear Results</button>

      <h3>Initiative Tracker</h3>
      <div class="initiative-controls">
          <button id="draw-card-button">Draw Card</button>
          <button id="reset-deck-button">Reset Deck</button>
      </div>
      <div id="initiative-results"></div>
  `;
  document.body.appendChild(savageWorldsUI);

  const includeWildDieCheckbox =
    savageWorldsUI.querySelector("#include-wild-die");
  const storedWildDieState = localStorage.getItem(
    "savageWorlds_includeWildDie",
  );
  if (storedWildDieState !== null) {
    includeWildDieCheckbox.checked = storedWildDieState === "true";
  }

  includeWildDieCheckbox.addEventListener("change", () => {
    localStorage.setItem(
      "savageWorlds_includeWildDie",
      includeWildDieCheckbox.checked,
    );
  });

  savageWorldsUI.querySelectorAll(".dice-buttons button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const dieType = event.target.dataset.die;
      const includeWildDie = includeWildDieCheckbox.checked;
      const rollResult = rollDice(dieType, includeWildDie);
      const message = formatDiceResultMessage(
        rollResult,
        dieType,
        includeWildDie,
      );
      displayMessage(message, "roll-results");
    });
  });

  savageWorldsUI
    .querySelector("#clear-results-button")
    .addEventListener("click", () => {
      const resultsDiv = document.getElementById("roll-results");
      if (resultsDiv) resultsDiv.innerHTML = "";
    });

  savageWorldsUI
    .querySelector("#draw-card-button")
    .addEventListener("click", () => {
      const card = drawCard();
      const message =
        card === "No cards left"
          ? "No cards left! Please reset the deck."
          : `Drew: ${card}`;
      displayMessage(message, "initiative-results");
    });

  savageWorldsUI
    .querySelector("#reset-deck-button")
    .addEventListener("click", () => {
      createDeck();
      displayMessage("Deck has been reset and shuffled!", "initiative-results");
      const initResults = document.getElementById("initiative-results");
      if (initResults) initResults.innerHTML = "";
    });

  createDeck();
}

function displayMessage(message, targetElementId) {
  const resultsDiv = document.getElementById(targetElementId);
  if (!resultsDiv) return;

  const resultContainer = document.createElement("div");
  resultContainer.classList.add("result-item");
  const p = document.createElement("p");
  p.textContent = message;
  resultContainer.appendChild(p);

  resultsDiv.prepend(resultContainer);
  if (resultsDiv.children.length > 5) {
    resultsDiv.removeChild(resultsDiv.lastChild);
  }

  sendToMeetChat(message);
}

function sendToMeetChat(message) {
  const chatInput = document.querySelector(
    'textarea[placeholder="Send a message"]',
  );
  if (chatInput) {
    chatInput.value = message;
    chatInput.dispatchEvent(new Event("input", { bubbles: true }));

    const sendButton = document.querySelector(
      'button[aria-label="Send message"]',
    );
    if (sendButton) {
      sendButton.click();
    } else {
      const enterEvent = new KeyboardEvent("keydown", {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        which: 13,
        bubbles: true,
        cancelable: true,
      });
      chatInput.dispatchEvent(enterEvent);
    }
    console.log("Message sent to chat:", message);
  }
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "toggleSavageWorldsUI") {
    toggleSavageWorldsUI();
  }
});

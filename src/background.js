// savage-dice-roller/src/background.js

chrome.action.onClicked.addListener((tab) => {
  if (!tab.id) return;

  const tabId = tab.id;

  // Primeiro injetamos o CSS
  chrome.scripting.insertCSS(
    {
      target: { tabId: tabId },
      files: ["src/styles.css"],
    },
    () => {
      // Depois injetamos o JS (o bundle gerado pelo Bun)
      chrome.scripting.executeScript(
        {
          target: { tabId: tabId },
          files: ["dist/content.js"],
        },
        () => {
          // Por fim, enviamos a mensagem para o toggle
          chrome.tabs.sendMessage(tabId, { action: "toggleSavageWorldsUI" });
        },
      );
    },
  );
});

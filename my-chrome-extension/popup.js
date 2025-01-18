const levels = {
    1: "Economy",
    2: "Business",
    3: "First-Class",
};
  
const slider = document.getElementById("intensity");
const intensityValue = document.getElementById("intensity-value");
const startButton = document.getElementById("start-trip");
  
slider.addEventListener("input", () => {
    intensityValue.textContent = levels[slider.value];
});

function handleResponse(message) {
    alert(`Message from the background script: ${message.response}`);
}
  
function handleError(error) {
    console.log(`Error: ${error}`);
}

startButton.addEventListener("click", () => {
    const selectedLevel = levels[slider.value];
    alert(`Enjoy your ${selectedLevel} trip!`);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: 'start',
            funLevel: selectedLevel
        }, (response) => {
            if (chrome.runtime.lastError) {
                console.warn("Error sending message:", chrome.runtime.lastError);
            } else {
                console.info("Popup received response:", response);
            }
        });
    });
});

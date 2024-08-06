let intervalId;
let intervalTime = 15000; // Default interval time in milliseconds

// Function to switch to the next tab
function switchToNextTab() {
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    if (tabs.length > 1) {
      chrome.tabs.query({active: true, currentWindow: true}, function(activeTabs) {
        const activeIndex = activeTabs[0].index;
        const nextIndex = (activeIndex + 1) % tabs.length;
        chrome.tabs.update(tabs[nextIndex].id, {active: true});
      });
    }
  });
}

// Function to start the tab switching
function startTabCarousel() {
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(switchToNextTab, intervalTime);
}

// Function to stop the tab switching
function stopTabCarousel() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "start") {
    intervalTime = request.intervalTime;
    startTabCarousel();
  } else if (request.action === "stop") {
    stopTabCarousel();
  }
  sendResponse({status: "ok"});
});

document.getElementById('startButton').addEventListener('click', () => {
    const intervalTime = parseInt(document.getElementById('intervalTime').value) * 1000;
    chrome.runtime.sendMessage({action: "start", intervalTime: intervalTime}, (response) => {
      console.log(response.status);
    });
  });
  
  document.getElementById('stopButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({action: "stop"}, (response) => {
      console.log(response.status);
    });
  });
  
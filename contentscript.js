function sendSelection(request, sender, sendResponse) {
  sendResponse(window.getSelection().toString());
}

chrome.runtime.onMessage.addListener(sendSelection);

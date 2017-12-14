function sendSelection(request, sender, sendResponse) {
  sendResponse(window.getSelection().toString());
}

chrome.runtime.onMessage.addListener(sendSelection);

  // "content_scripts": [
  //   {
  //     "matches": ["<all_urls>"],
  //     "js": ["scripts/contentscript.js"],
  //     "all_frames": true
  //   }
  // ],
// http://yuyin.baidu.com/docs/tts/136#POST调用方式

var chunks = [];

function textToChunks(text) {
  chunks = text.match(/[\s\S]{1,500}/mg)
}

function sourceUrl(text) {
  var url = 'http://tts.baidu.com/text2audio?text='
          + escape(text)
          + '&lan=ZH&ie=UTF-8';
  return url;
}

function startReader() {
  if (chunks.length == 0) return;

  var text = chunks.shift();
  var url  = sourceUrl(text);

  console.log(url);
  document.getElementById('source').src = url;
}

function readText(text) {
  if (!text) return;

  textToChunks(text);
  startReader();
}

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, {}, function(text) {
    readText(text);
  });
});
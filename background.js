// http://yuyin.baidu.com/docs/tts/136#POST调用方式

var chunks = [];
var audio = document.getElementById('audio');

function textToChunks(text) {
  chunks = text.replace(/\s/mg, ' ').match(/[\s\S]{1,500}/g)
}

function sourceUrl(text) {
  var url = 'http://tts.baidu.com/text2audio?text='
          + encodeURI(text)
          + '&lan=ZH&ie=UTF-8';
  return url;
}

function playUrl(url) {
  audio.src = url;
  audio.play();
}

function startReader() {
  if (chunks.length == 0) return;

  var text = chunks.shift();
  var url  = sourceUrl(text);

  playUrl(url);
}

function readText(text) {
  if (!text) return;

  textToChunks(text);
  startReader();
}

audio.onended = startReader;

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, {}, function(text) {
    readText(text);
  });
});
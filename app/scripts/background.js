// http://yuyin.baidu.com/docs/tts/136#POST调用方式

const PAT_BLANK = /^\s*$/g

var chunks = [];
var audio = document.getElementById('audio');


function isBlank(text) {
  return PAT_BLANK.test(text)
}

function addToList(text) {
  console.log('ADDED:', text)
  chunks = chunks.concat(text.replace(/\s/mg, ' ').match(/[\s\S]{1,500}/g))
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

function play() {
  if (chunks.length == 0) return;

  var text = chunks.shift();
  var url  = sourceUrl(text);

  playUrl(url);
}

audio.onended = play;

const code = 'window.getSelection().toString()'
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({ code, allFrames: true, matchAboutBlank: true }, (results) => {
    results.forEach(text => {
      if (!isBlank(text)) {
        addToList(text)
      }
    })

    play()
  })
});

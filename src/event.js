const initValue = {
  time: {
    hour: 0,
    minute: 60,
    second: 0
  },
  active: false
};

var interval;
var activeTimer = false;
var nowTime;

function getTime() {
  if (nowTime) {
    return nowTime;
  }
  return initValue.time;
}

function getActive() {
  return activeTimer;
}

function countStart(time) {
  activeTimer = true;
  this.interval = setInterval(() => {
    --time.second;
    if (time.second < 0) {
      --time.minute;
      time.second = 59;
      if (!time.minute || time.minute < 0) {
        time = null;
        _countStop();
      }
    }
    noticeCount(time);
    nowTime = time;
  }, 1000);
}

function noticeCount(time) {
  chrome.browserAction.setBadgeText({
    text: formatTime(time)
  });
  let color = [76, 187, 23, 255];
  if (time && !time.hour && !time.minute) {
    color = [250, 150, 0, 255];
  }
  chrome.browserAction.setBadgeBackgroundColor({
    color: color
  });
}

function formatTime(time) {
  if (!time) {
    return '';
  } else if (time.hour) {
    return time.hour + "h";
  } else if (time.minute) {
    return time.minute + "m";
  } else {
    return time.second + "s";
  }
}

function countStop() {
  _countStop();
}

function _countStop() {
  activeTimer = false;
  nowTime = null;
  clearInterval(this.interval);
  chrome.browserAction.setBadgeText({
    text: ''
  });
}
const initValue = {
  time: {
    hour: 0,
    minute: 60,
    second: 0
  },
  setting: "top",
  active: false
};

var interval;
var activeTimer = false;

function getConfig() {
  let value = localStorage["chrome-timer"];
  if (value) {
    return value;
  } else {
    return initValue;
  }
}

function setConfig(value) {
  localStorage["chrome-timer"] = value;
}

function countStart(time) {
  activeTimer = true;
  this.interval = setInterval(() => {
    --time.second;
    if (time.second < 0) {
      --time.minute;
      time.second = 59;
    }
    if (time.minute == 0) {
      clearInterval(this.interval);
    }
    noticeCount(time);
  }, 1000);
}

function noticeCount(time) {
  chrome.browserAction.setBadgeText({
    text: formatTime(time)
  });
  chrome.browserAction.setBadgeBackgroundColor({
    color: [76, 187, 23, 255]
  });
}

function formatTime(time) {
  if (time.hour) {
    return time.hour + "h";
  } else if (time.minute) {
    return time.minute + "min";
  } else {
    return time.second + "s";
  }
}

function countStop() {
  activeTimer = false;
  clearInterval(this.interval);
}

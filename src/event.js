var greenColor = [76, 187, 23, 255];
var yellowColor = [250, 150, 0, 255];

function getConfig() {
  let value = localStorage['chrome-timer'];
  if (value) {
    return value;
  } else {
    return defaultSetting;
  }
}

function setConfig(value) {
  localStorage['chrome-timer'] = value;

}

var defaultSetting = {
  'time': {
    'hour': 0,
    'minute': 60,
    'seconde': 0,
  },
  'setting': 'top'
}

var interval;

function countStart(time) {
  if (!time) {
    time = defaultSetting['time'];
  }
  this.interval = setInterval(() => {
    --time.seconde;
    if (time.seconde < 0) {
      --time.minute;
      time.seconde = 59;
    }
    if (time.minute == 0) {
      clearInterval(this.interval);
    }
    noticeCount(time);
  }, 1000);
}

function noticeCount(time) {

}

function countStop() {
  clearInterval(this.interval);
}

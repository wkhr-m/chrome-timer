import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscribable } from '../../../../node_modules/rxjs';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent implements OnInit {
  timerActive: boolean;
  time = {
    hour: 0,
    minute: 0,
    seconde: 0,
  }
  interval;
  bg: any;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.bg = chrome.extension.getBackgroundPage();
    this.time = this.bg.getConfig().time;
  }

  onClick() {
    if (this.timerActive) {
      clearInterval(this.interval);
      this.timerActive = false;
    } else {
      this.timerActive = true;
      this.time.seconde = 0;
      this.time.minute = 60;
      this.count();
    }
  }

  count() {
    this.interval = setInterval(() => {

      --this.time.seconde;
      if (this.time.seconde < 0) {
        --this.time.minute;
        this.time.seconde = 59;
      }
      if (this.time.minute == 0) {
        clearInterval(this.interval);
        this.timerActive = false;
      }
    }, 1000);
  }

}

import { Component, OnInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.less"]
})
export class MainPageComponent implements OnInit {
  timerActive: boolean;
  time = {
    hour: 0,
    minute: 0,
    second: 0
  };
  interval;
  bg: any;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.bg = chrome.extension.getBackgroundPage();
    this.time = this.bg.getConfig().time;
  }

  onClick() {
    if (this.timerActive) {
      clearInterval(this.interval);
      this.timerActive = false;
      this.bg.countStop();
    } else {
      this.timerActive = true;
      if (!this.time) {
        this.time.second = 0;
        this.time.minute = 60;
      }
      this.count();
    }
  }

  count() {
    this.bg.countStart(this.time);
    this.interval = setInterval(() => {
      --this.time.second;
      if (this.time.second < 0) {
        --this.time.minute;
        this.time.second = 59;
      }
      if (this.time.minute == 0) {
        clearInterval(this.interval);
        this.timerActive = false;
      }
    }, 1000);
  }
}

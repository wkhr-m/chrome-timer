import { Component, OnInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { Subscription, interval } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.less"]
})
export class MainPageComponent implements OnInit, OnDestroy {
  timerActive: boolean;
  time = {
    hour: 0,
    minute: 0,
    second: 0
  };
  interval;
  bg: any;
  subsctription: Subscription;
  form: FormGroup;

  constructor(private cd: ChangeDetectorRef, private fb: FormBuilder) { }

  ngOnInit() {
    this.bg = chrome.extension.getBackgroundPage();
    this.time = this.bg.getTime();
    this.timerActive = this.bg.getActive();
    if (this.timerActive) {
      this.subsctription = interval(1000).subscribe(() => {
        this.cd.detectChanges();
        if (!this.time.hour && !this.time.minute && !this.time.second) {
          this.timerActive = false;
          this.subsctription.unsubscribe();
        }
      });
    }
    this.form = this.fb.group({
      'hour': [this.time.hour ? this.time.hour : 0, Validators.required],
      'minute': [this.time.minute ? this.time.minute : 0, Validators.required],
      'second': [this.time.second ? this.time.second : 0, Validators.required],
    });
  }

  ngOnDestroy() {
    if (this.subsctription) {
      this.subsctription.unsubscribe();
    }
  }

  onClick() {
    if (this.timerActive) {
      this.bg.countStop();
      this.timerActive = false;
      clearInterval(this.interval);
      this.form.controls['hour'].setValue(this.time.hour);
      this.form.controls['minute'].setValue(this.time.minute);
      this.form.controls['second'].setValue(this.time.second);
    } else {
      this.timerActive = true;
      this.subsctription = interval(1000).subscribe(() => {
        this.time = this.bg.getTime();
        if (!this.time.hour && !this.time.minute && !this.time.second) {
          this.subsctription.unsubscribe();
          this.timerActive = false;
        }
      });
      const time = {
        hour: this.form.value['hour'] ? this.form.value['hour'] : 0,
        minute: this.form.value['minute'] ? this.form.value['minute'] : 0,
        second: this.form.value['second'] ? this.form.value['second'] : 0
      }
      this.time = time;
      this.bg.countStart(time);
    }
  }
}

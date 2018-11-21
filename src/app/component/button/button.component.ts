import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'w-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less']
})
export class ButtonComponent implements OnInit {
  @Input() label: string = 'Button';
  @Input() type: string = 'default';

  constructor() { }

  ngOnInit() {
  }

}

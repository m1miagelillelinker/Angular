import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity-field',
  templateUrl: './activity-field.component.html',
  styleUrls: ['./activity-field.component.scss'],
})
export class ActivityFieldComponent implements OnInit {

  tabHasBeenSelected = new EventEmitter();
  constructor(
      private router: Router,
  ) { }

  ngOnInit() {
  }


}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-subscribers',
  templateUrl: './display-subscribers.component.html',
  styleUrls: ['./display-subscribers.component.scss']
})
export class DisplaySubscribersComponent implements OnInit {

  @Input() title: String;
  @Input() users: Array<Object>;

  constructor() { }

  ngOnInit() {
  }

}

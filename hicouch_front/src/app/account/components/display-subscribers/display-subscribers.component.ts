import { Component, OnInit, Input } from '@angular/core';
import {User} from '../../../shared/models/user';

@Component({
  selector: 'app-display-subscribers',
  templateUrl: './display-subscribers.component.html',
  styleUrls: ['./display-subscribers.component.scss']
})
export class DisplaySubscribersComponent implements OnInit {

  @Input() title: String;
  @Input() users: Array<User>;

  constructor() { }

  ngOnInit() {
  }

}

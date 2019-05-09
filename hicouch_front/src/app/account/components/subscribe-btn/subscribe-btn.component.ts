import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-subscribe-btn',
  templateUrl: './subscribe-btn.component.html',
  styleUrls: ['./subscribe-btn.component.css']
})
export class SubscribeBtnComponent implements OnInit {

  @Input() isSubscribed: boolean;
  @Output() toggledSubscription: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleSubscribtion() {
  this.toggledSubscription.emit(this.isSubscribed);
  }
}



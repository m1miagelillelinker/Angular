import { Component, OnInit ,Input} from '@angular/core'

@Component({
  selector: 'app-display-badges',
  templateUrl: './display-badges.component.html',
  styleUrls: ['./display-badges.component.scss']
})
export class DisplayBadgesComponent implements OnInit {

  @Input() title: String;
  @Input() badges: Array<Object>;

  constructor() {}

  ngOnInit() {
  }

}

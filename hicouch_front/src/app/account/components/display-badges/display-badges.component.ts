import { Component, OnInit ,Input} from '@angular/core'

@Component({
  selector: 'app-display-badges',
  templateUrl: './display-badges.component.html',
  styleUrls: ['./display-badges.component.scss']
})
export class DisplayBadgesComponent implements OnInit {

  @Input() title: String;
  @Input() badges: Array<Object>;

  profileProgress = {
    fullProgress: '150px', //'150px',
    userProgress: '100px', // user.score * 150 / 100
     
  }
  
  constructor() {}

  ngOnInit() {
  }

}

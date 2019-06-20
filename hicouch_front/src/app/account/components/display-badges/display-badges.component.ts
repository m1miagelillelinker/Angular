import { Component, OnInit , Input} from '@angular/core';
import { Badge } from 'src/app/shared/models/badge';


@Component({
  selector: 'app-display-badges',
  templateUrl: './display-badges.component.html',
  styleUrls: ['./display-badges.component.scss']
})
export class DisplayBadgesComponent implements OnInit {

  @Input() title: String;
  @Input() badges: Badge[];

  constructor() { }

  ngOnInit() {

  }

}

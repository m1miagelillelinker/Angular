import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-display-activities',
  templateUrl: './display-activities.component.html',
  styleUrls: ['./display-activities.component.scss']
})
export class DisplayActivitiesComponent implements OnInit {

  @Input() activities: any;
  @Input() user: any;
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.getHistoryById(this.user.id).subscribe(res => console.log(res));
  }

}

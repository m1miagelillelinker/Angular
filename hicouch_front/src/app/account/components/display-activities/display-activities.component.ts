import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-activities',
  templateUrl: './display-activities.component.html',
  styleUrls: ['./display-activities.component.scss']
})
export class DisplayActivitiesComponent implements OnInit {

  @Input() activities: any;
  @Input() user: any;
  @Output() change = new EventEmitter();

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  goToProduct(type, id) {
    this.router.navigate(['app/products', type, id]);
  }

  goToUser(id) {
    this.change.emit(id);
    this.router.navigate(['app/account', id]);
  }

}

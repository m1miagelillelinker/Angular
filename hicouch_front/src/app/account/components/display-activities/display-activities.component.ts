import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-display-activities',
  templateUrl: './display-activities.component.html',
  styleUrls: ['./display-activities.component.scss']
})
export class DisplayActivitiesComponent implements OnInit {

  @Input() activities:any;
  constructor() { }

  ngOnInit() {
  }

}

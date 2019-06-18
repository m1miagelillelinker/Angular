import { Injectable } from '@angular/core';
import {HicouchAPIService} from './hicouchAPI.service';

@Injectable({
  providedIn: 'root'
})

export class BadgesService {

 
  constructor(private api: HicouchAPIService) { }

  getBadges(userId) {
    return this.api.getBadgesByUser(userId);
  }
}

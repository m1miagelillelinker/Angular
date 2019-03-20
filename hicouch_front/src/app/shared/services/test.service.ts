import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TestService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get('//localhost:8080/test');
  }
}

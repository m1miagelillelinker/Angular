import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/login/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
    title = "HiCouch";
    user: User;
    form: FormGroup;

  constructor(
    private authService: AuthenticationService 
      ) {}

  ngOnInit() {
  }

  loadUser(event: User) {
    this.user = event;
  }

  isFieldInvalid(field: string) {
    
  }

  onSubmit() {
    if (this.form.valid) {
    }
  }
}
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginFormComponent {
  model: any = {};

  login() {

    console.log('Username:', this.model.username);
    console.log('Password:', this.model.password);

  }
}
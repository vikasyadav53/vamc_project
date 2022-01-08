import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { User } from '../modules/User';
import { BackendServicesManagerService } from "../backend-services-manager.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  loginForm: FormGroup
  user:User;

  constructor(private router : Router, 
    private backendServicesManagerService : BackendServicesManagerService) {
    this.loginForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      userPwd: new FormControl(null, Validators.required)
    });
   }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.table(this.loginForm.value);
      this.user = new User();
      this.user.userName=this.loginForm.controls.userName.value;
      this.user.userPwd=this.loginForm.controls.userPwd.value;
      this.backendServicesManagerService.saveUserDetails(this.user).subscribe(data => {
        console.log(data);
        this.backendServicesManagerService.setToken(data.token);
        this.router.navigate(['home']);
      },
      error => {
        console.log(error);
      })
    }
  }

}

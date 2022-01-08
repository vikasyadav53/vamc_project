import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserFormCustomeValidationService  } from "../user-form-custome-validation.service";
import { Router } from "@angular/router";
import { BackendServicesManagerService } from "../backend-services-manager.service";
import { User } from '../modules/User';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  user: User;

  constructor(private userFormCustomeValidationService : UserFormCustomeValidationService, 
    private router: Router,
    private backendServicesManagerService : BackendServicesManagerService) { 
    this.registrationForm = new FormGroup ( {
      //userName: new FormControl(null, Validators.compose([Validators.required, this.userFormCustomeValidationService.userNameValidator.bind(this.userFormCustomeValidationService)])),
      userName: new FormControl(null, Validators.compose([Validators.required])),
      userEmail: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      userPwd: new FormControl(null, Validators.compose([Validators.required, this.userFormCustomeValidationService.patternValidator])),
      userConfirmPwd: new FormControl(null, Validators.required)
    }, {
      validators: this.userFormCustomeValidationService.MatchPassword("userPwd", "userConfirmPwd"),
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.table(this.registrationForm.value);
      this.user = new User();
      this.user.userEmail=this.registrationForm.controls.userEmail.value;
      this.user.userName=this.registrationForm.controls.userName.value;
      this.user.userPwd=this.registrationForm.controls.userPwd.value;
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

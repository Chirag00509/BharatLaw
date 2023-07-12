import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  changePasswordForm!: FormGroup


  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private userservice: UserService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.changePasswordForm = this.formBuilder.group({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  getControl(name: any): AbstractControl | null {
    return this.changePasswordForm.get(name);
  }

  changePassword(data: any) {
    let token = localStorage.getItem("token");

    if (data.password == data.newPassword) {
      this.initializeForm();
      alert("Current and new password could not be same..");
    }

    this.userservice.newPassword(data, token).subscribe((res) => {
      this.initializeForm();
      alert("Password is successfully change.")

    }, (error) => {
      this.initializeForm();
      alert("Your current password do not match");
    });
  }
}

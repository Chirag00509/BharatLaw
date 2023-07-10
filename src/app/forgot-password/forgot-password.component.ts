import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm! : FormGroup

  token: any ="Cghsdaopfjd164";

  constructor(private router : Router, private formBuilder : FormBuilder, private userService : UserService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.forgotForm = this.formBuilder.group({
      email : new FormControl('', [ Validators.required, Validators.email ]),
    })
  }

  getControl(name: any) : AbstractControl | null {
    return this.forgotForm.get(name);
  }

  forgot(email : string) {



    this.userService.forgot(email).subscribe();
  }

}

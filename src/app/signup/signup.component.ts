import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signForm! : FormGroup

  constructor(private router : Router, private formBuilder : FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.signForm = this.formBuilder.group({
      email : new FormControl('', [ Validators.required, Validators.email ]),
      password: new FormControl('', [ Validators.required, Validators.minLength(6) ])
    })
  }

  getControl(name: any) : AbstractControl | null {
    return this.signForm.get(name);
  }


  navigatePage() {
    this.router.navigateByUrl('/user/registration')
  }

  login(data: any) {
    console.log(data);

    
    }
  }


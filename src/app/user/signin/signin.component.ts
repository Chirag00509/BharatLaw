import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  signForm!: FormGroup

  constructor(private router: Router, private formBuilder: FormBuilder, private userService : UserService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.signForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  getControl(name: any): AbstractControl | null {
    return this.signForm.get(name);
  }


  navigatePage() {
    this.router.navigateByUrl('/user/registration')
  }

  login(data: any) {
    this.userService.getUser().subscribe((users : any[]) => {
      const user = users.find(u => u.email === data.email && u.password === data.password);
      if(user) {
        alert("You are successfully login");
        this.router.navigateByUrl('/dashboard')
      } else {
        alert("Your email and password dose not match");
      }
    })
  }

}

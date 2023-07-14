import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent implements OnInit {
  updateForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userservice: UserService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.updateForm = this.formBuilder.group({
      password: new FormControl('', [Validators.required]),
    });
  }

  getControl(name: any): AbstractControl | null {
    return this.updateForm.get(name);
  }

  updatePassword(password: string) {
    let token = this.route.snapshot.paramMap.get('token');
    this.userservice.getupdatePassword(password, token).subscribe();
    alert('Successfully Updated the password');
  }
}

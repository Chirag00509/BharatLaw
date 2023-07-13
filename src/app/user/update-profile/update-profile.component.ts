import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit {
  updateProfile!: FormGroup;

  producList: any;
  emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  phonenoRegex = /^[0-9]+$/;
  firstNameRegex = /^[A-Z][a-zA-Z]*$/;
  lastNameRegex = /^[A-Z][a-zA-Z]*$/;

  constructor(
    private formBuilder: FormBuilder,
    private userservice: UserService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getFormDetails();
  }

  initializeForm() {
    this.updateProfile = this.formBuilder.group({
      firstName: [
        '',
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[A-Z][a-zA-Z]*$'),
      ],
      lastName: [
        '',
        Validators.required,
        Validators.pattern('^[A-Z][a-zA-Z]*$'),
      ],
      email: ['', Validators.required, Validators.email],
      contactDetails: ['', [Validators.required, Validators.maxLength(10)]],
      organization: ['', Validators.required],
    });
  }

  getControl(name: any): AbstractControl | null {
    return this.updateProfile.get(name);
  }

  getFormDetails() {
    let token = localStorage.getItem('token');
    this.userservice.getUser().subscribe((users: any[]) => {
      let user = users.find((u) => u.actionToken == token);

      this.producList = user;

      this.updateProfile.patchValue({
        firstName: this.producList.firstName,
        lastName: this.producList.lastName,
        email: this.producList.email,
        contactDetails: this.producList.contactDetails,
        organization: this.producList.organization,
      });
    });
  }

  updateForm(data: any) {
    let token = localStorage.getItem('token');
    this.userservice.getDetailsByToken(token).subscribe((user) => {
      data.email = user.email;
      data.password = user.password;
      data.actionToken = token;
      data.Id = user.id;

      this.userservice.updateProfile(user.id, data).subscribe();
    });
  }
}

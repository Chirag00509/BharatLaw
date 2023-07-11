import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  updateProfile!: FormGroup

  producList: any;

  constructor(private formBuilder: FormBuilder, private userservice: UserService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getFormDetails();
  }

  initializeForm() {
    this.updateProfile = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contact: ['', Validators.required],
      organization: ['', Validators.required],
    });
  }

  getControl(name: any): AbstractControl | null {
    return this.updateProfile.get(name);
  }

  getFormDetails() {
    let token = localStorage.getItem("token");
    this.userservice.getUser().subscribe((users: any[]) => {
      let user = users.find(u => u.actionToken == token);

      this.producList = user;

      this.updateProfile.patchValue({
        firstName: this.producList.firstName,
        lastName: this.producList.lastName,
        contact: this.producList.contactDetails,
        organization: this.producList.organization
      })
    })
  }

  updateForm(data: any) {
    let token = localStorage.getItem('token')
    this.userservice.getDetailsByToken(token)
    this.userservice.updateProfile(token, data)

  }

}

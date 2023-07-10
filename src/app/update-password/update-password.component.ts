import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {

  updateForm!: FormGroup


  constructor(private route : ActivatedRoute, private userservice : UserService) {}

  updatePassword(password: any) {
    let token = this.route.snapshot.paramMap.get("token");

    this.userservice.getupdatePassword(password, token).subscribe();
  }

}

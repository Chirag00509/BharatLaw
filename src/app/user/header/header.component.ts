import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user:any;
  firstName:any;
  lastName:any;
  isDropdownOpen = false;


  constructor(private userService : UserService, private router : Router) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    let token = localStorage.getItem("token");

    this.userService.getDetailsByToken(token).subscribe((res) => {
      this.user = res.firstName;
      this.firstName = res.firstName.charAt(0);
      this.lastName = res.lastName.charAt(0);
    })
  }

  logout() {
    let token = localStorage.getItem('token');

    this.userService.logout(token).subscribe((res) => {
      this.router.navigateByUrl("/");
      localStorage.clear();
    })
  }

  yourProfile(){
    this.router.navigateByUrl("/user/update-profile");
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}

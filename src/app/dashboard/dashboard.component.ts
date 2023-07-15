import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ResearchService } from '../services/research.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  cards: any[] = [];

  showPopup = false;

  createResearchName!: FormGroup;

  user: any;
  firstName: any;
  lastName: any;
  isDropdownOpen = false;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder, private researchService: ResearchService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getData();
    this.getUser();
  }

  initializeForm() {
    this.createResearchName = this.formBuilder.group({
      research: new FormControl('', [Validators.required]),
    });
  }

  getControl(name: any): AbstractControl | null {
    return this.createResearchName.get(name);
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toDateString();
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  research(data: any) {
    let token = localStorage.getItem('token');
    this.userService.getDetailsByToken(token).subscribe((res) => {
      const body = {
        name: data.research,
        dateCreated: new Date(),
        lastModified: new Date(),
        userId: res.id,
      };
      this.researchService.createResearch(body).subscribe();
      this.showPopup = false;
      this.router.navigateByUrl('/home');
    });
  }

  getData() {
    let token = localStorage.getItem('token');
    this.userService.getDetailsByToken(token).subscribe((res) => {
          let id = res.id;
          console.log(id);

      this.researchService.getResearchDetails(id).subscribe((res) => {
        this.cards = res;
      });
    });
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

  yourProfile() {
    this.router.navigateByUrl("/user/update-profile");
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}

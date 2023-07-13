import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ResearchService } from '../services/research.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  researches: any[] = [];

  showPopup = false;

  firstNameUser:any;
  lastNameUser:any;
  firstName:any;
  lastName:any;

  createResearchName!: FormGroup

  constructor(private userService : UserService, private router : Router, private formBuilder : FormBuilder, private researchService : ResearchService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getData();
    this.getUserDetails();
  }

  initializeForm() {
    this.createResearchName = this.formBuilder.group({
      research: new FormControl('', [Validators.required, ]),
    })
  }

  getControl(name: any): AbstractControl | null {
    return this.createResearchName.get(name);
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  research(data: any) {
    let token = localStorage.getItem("token")
    this.userService.getDetailsByToken(token).subscribe((res) => {

      const body = {
        name : data. research,
        dateCreated : new Date(),
        lastModified : new Date(),
        userId : res.id
      }
      this.researchService.createResearch(body).subscribe();
      this.showPopup = false;
      this.router.navigateByUrl("/home");
    })
  }

  getData() {
    this.researchService.getResearchDetails().subscribe((res) => {
      this.researches = res;
    });
  }

  getUserDetails() {
    let token = localStorage.getItem('token');

    this.userService.getDetailsByToken(token).subscribe((res) => {
      this.firstNameUser = res.firstName;
      this.lastNameUser = res.lastName;
      this.firstName = res.firstName.charAt(0);
      this.lastName = res.lastName.charAt(0);
    })
  }

  logout() {
    let token = localStorage.getItem('token');

    this.userService.logout(token).subscribe((res) => {
      this.router.navigateByUrl("/");
    })
  }

}


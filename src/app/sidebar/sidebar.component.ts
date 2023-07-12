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

  createResearchName!: FormGroup

  constructor(private userService : UserService, private router : Router, private formBuilder : FormBuilder, private researchService : ResearchService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getData();
  }

  initializeForm() {
    this.createResearchName = this.formBuilder.group({
      research: new FormControl('', [Validators.required, ]),
    })
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

}


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

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private researchService: ResearchService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getData();
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
    this.researchService.getResearchDetails().subscribe((res) => {
      this.cards = res;
    });
  }
}

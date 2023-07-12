import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  cards = [
    {
      imageUrl: 'path/to/image1.jpg',
      title: 'Query 1',
      link: 'https://example.com/card1',
    },
    {
      imageUrl: 'path/to/image2.jpg',
      title: 'Query 2',
      link: 'https://example.com/card2',
    },
  ];
  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toDateString();
  }
  redirectToLink(link: string): void {
    // Redirect logic here
    window.location.href = link;
  }

  showPopup = false;

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

}

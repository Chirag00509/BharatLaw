import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  searchQuery: string = '';

  search(): void {
    // Perform search operation
    // Example: log the search query
    console.log('Search query:', this.searchQuery);
  }
  research: string[] = ['Research 1', 'Research 2', 'Research 3', 'Reasearch 4'];
  openAddResearchModal() {
    console.log('Add new Research');
}
}
  

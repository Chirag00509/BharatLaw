import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  researches: any[] = [
    {
      title: "Research 1",
      creationDate: "2023-07-1"
    },
    {
      title: "Research 2",
      creationDate: "2023-07-2"
    },
    {
      title: "Research 3",
      creationDate: "2023-07-3"
    },
    {
      title: "Research 4",
      creationDate: "2023-07-4"
    },
  ];
  filteredResearches :string[]=[];
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
  

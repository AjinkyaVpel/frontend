import { Component } from '@angular/core';

@Component({
  selector: 'app-settlements',
  templateUrl: './settlements.component.html',
  styleUrls: ['./settlements.component.css']
})
export class SettlementsComponent {
   
  openSearch:boolean = false;
  completed:boolean = false;
  pending:boolean = false;
  rejected:boolean = false;

  openSearchBar(){
    this.openSearch = !this.openSearch;
  }
}

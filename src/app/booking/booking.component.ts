import { Component } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  openSearch: boolean = false;

  openSearchBar(){
    this.openSearch = true;
  }
  
}

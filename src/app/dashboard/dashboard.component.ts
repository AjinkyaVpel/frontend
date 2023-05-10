import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    displayCard:boolean=true;
    selectedOption: string = '';
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];  //used in dropdown for selecting month to show booking data of that particular month
  
    
  ngOnInit(){
  }
  displayHide(){
    this.displayCard=false;
  }
}

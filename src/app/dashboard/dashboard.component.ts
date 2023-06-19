import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    displayCard:boolean=true;
    selectedOption: string = 'daily';
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];  //used in dropdown for selecting month to show booking data of that particular month
  
    
  ngOnInit(){
      
  }
  // displayHide(){
  //   this.displayCard=false;
  // }
  latitude!: number;
  longitude!: number;

  updateMap() {
    const mapFrame = document.getElementById('mapFrame') as HTMLIFrameElement;
    const newSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242117.68101876185!2d${this.longitude}!3d${this.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1679571022103!5m2!1sen!2sin`;

    mapFrame.src = newSrc;
  }
  
}

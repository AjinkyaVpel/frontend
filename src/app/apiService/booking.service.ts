import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  
 constructor(private http:HttpClient) { }

  //get booking by hostid
  getBookingByHostId(hostId: string){   
    return this.http.get(`http://192.168.0.243:8099/manageBooking/getBookingsByHost?hostId=${hostId}`);
  }

}

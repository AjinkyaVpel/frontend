import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {

  constructor(private http:HttpClient) { }
  
  getHostDetailsByHostId(){   
    
    return this.http.get(`http://192.168.0.243:8095/manageHost/getHostDetails?hostId=HST20230718154906552`);
  }

  updateProfileByHostId( data:string){
    console.log(data)
    return this.http.put(`http://192.168.0.243:8095/manageHost/updateHost?hostId=HST20230718154906552`,data);
  }
}

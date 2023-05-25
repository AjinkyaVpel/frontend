import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestrictedAccessService {

  constructor(private http:HttpClient) { }

  //Get all settlement details

  // getUserByEmailId(emailId:string){
  
  //    return this.http.get<string>(`http://192.168.0.41:8097/manageUser/getByEmail?userEmail=${emailId}`);
  // }

  getUserByEmailId(emailId: string) {
    return this.http.get(`http://192.168.0.41:8097/manageUser/getByEmail?userEmail=${emailId}`, { responseType: 'text' });
  }

  getIsUserPresent(stationId:string,userId:string){
    return this.http.get(`http://192.168.0.44:8096/manageStation/getIsUserPresentInRestrictionList?stationId=${stationId}&userId=${userId}`);
  }


  setUserRestrictionToStation(stationId:string,data:string[]){
    return this.http.post(`http://192.168.0.44:8096/manageStation/addUserAccessList?stationId=${stationId}`, data,{ responseType: 'text' });
  }



}

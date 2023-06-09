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
    return this.http.get(`http://192.168.0.243:8097/manageUser/getByEmail?userEmail=${emailId}`, { responseType: 'text' });
  }

  getUserByContactNumber(number: string) {
    return this.http.get(`http://192.168.0.243:8097/manageUser/getByContactNo?userContactNo=${number}`, { responseType: 'text' });
  }

  getIsUserPresent(stationId:string,userId:string){
    return this.http.get(`http://192.168.0.243:8096/manageStation/getIsUserPresentInRestrictionList?stationId=${stationId}&userId=${userId}`);
  }


  setUserRestrictionToStation(stationId:string,data:string[]){
    return this.http.post(`http://192.168.0.243:8096/manageStation/addUserAccessList?stationId=${stationId}`, data,{ responseType: 'text' });
  }

  // get list of users that are given access to the station
  getRestrictedUsersByStationId(stationId:string){
    return this.http.get(`http://192.168.0.243:8096/manageStation/getRestrictedUsers?stationId=${stationId}`,{responseType:'text'});

  }
  

  getUsersDetailsByListOfIds(userIdList:string[]){
    return this.http.post(`http://192.168.0.243:8097/manageUser/getUserDetailsByUserIds`,userIdList);
  }

  deleteUserFromRestrictedAccess(stationId:string,userId:string){
    return this.http.delete(`http://192.168.0.243:8096/manageStation/deleteUserFromRestrictionList?stationId=${stationId}&userId=${userId}`,{responseType:'text'})
  }

}

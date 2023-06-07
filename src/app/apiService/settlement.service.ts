import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettlementService {

  constructor(private http:HttpClient) { }

  //Get all settlement details

  getSettlement(hostId:any){
     return this.http.get(`http://192.168.0.243:8095/manageHost/getSettlementByHostId?hostId=${hostId}`)
  }
}

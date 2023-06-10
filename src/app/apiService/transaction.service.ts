import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http:HttpClient) { }

  //get transactions by hostId
  getTransacationsByHostId(hostId:string){ 
    return this.http.get(`http://192.168.0.243:8097/manageUser/getTransactionByHostId?transactionHostId=${hostId}`);  
  }
}
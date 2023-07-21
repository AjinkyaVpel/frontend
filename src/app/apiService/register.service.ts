import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
constructor( private http:HttpClient) { }


  requestOTP(phoneNumber: string) {
    return this.http.get(`http://192.168.0.41:9999/auth/registerHost/sendOtp?phoneNumber=${phoneNumber}`);
  }

  verifyOTP(phoneNumber: string, otp: number) { 
    return this.http.get(`http://192.168.0.41:9999/auth/registerHost/verifyOtp?phoneNumber=${phoneNumber}&otp=${otp}`);
  }

  existUserSendOtp(phoneNumber: string){
    return this.http.get(`http://192.168.0.41:9999/auth/registerHost/ExistsUser/sendOtp?phoneNumber=${phoneNumber}`)
  }

  updateUserDetails( hostContactNo: string,userDetails: any)
  {
    return this.http.put(`http://192.168.0.41:9999/auth/registerHost/AdditinalDetails?hostContactNo=${hostContactNo}`, userDetails);
  }

  verifyOTPForExistingUser(phoneNumber: string, otp: number){
    return this.http.get(`http://192.168.0.41:9999/auth/registerHost/existUser/verifyOtp?phoneNumber=${phoneNumber}&otp=${otp}`);
  }

  registerExistingUserPassword(hostContactNo: string,userDetails: any){
    return this.http.put(`http://192.168.0.41:9999/auth/registerHost/updatePassword?hostContactNo=${hostContactNo}`, userDetails);
  }
}


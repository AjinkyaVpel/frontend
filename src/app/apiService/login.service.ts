import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http:HttpClient) { }

  requestOTP(phoneNumber: string) {
   phoneNumber='+91'+ phoneNumber;
    return this.http.post(`http://192.168.0.41:9999/auth/send-otp`, { phoneNumber  },{ responseType: 'text' });
  }

  
  verifyOTP(phoneNumber: string, otp: number) {
    phoneNumber='+91'+ phoneNumber;
    return this.http.post(`http://192.168.0.41:9999/auth/loginByOtp`, { phoneNumber, otp },{ responseType: 'json' });
  }
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../apiService/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailOrPhone!: string;
  password!: string;
  otp!: number;
  isEmail!: boolean | undefined;
  showOtpField: boolean = false; // Initially hide the OTP field
  token!:string;
  passwordVisible: boolean = false;
  constructor(private dialog:MatDialog, private loginApi:LoginService,private router:Router){}
  ngOnInit(): void {
   
  }
    detectInputType() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneNumberRegex = /^\d{10}$/;
    
      if (emailRegex.test(this.emailOrPhone)) {
        this.isEmail = true;
      } else if (phoneNumberRegex.test(this.emailOrPhone)) {
        this.isEmail = false;
        if (this.emailOrPhone.length > 13) {
          // More than 13 characters (including "+91")
          throw new Error('Please enter a valid phone number with the country code prefix "+91".');
        }
      } else {
        this.isEmail = undefined;
        throw new Error('Invalid input. Please enter a valid email or a phone number with the country code prefix "+91".');
      }
    }
    
    
togglePasswordVisibility() {
  this.passwordVisible = !this.passwordVisible;
}

  requestOtp() {
    // Make the API call to request OTP
    this.loginApi.requestOTP(this.emailOrPhone).subscribe(
      response => {
        // Handle the successful response
        console.log('OTP request successful:', response);
        // Toggle the visibility of the OTP field
        this.showOtpField = true;
      },
      error => {
        // Handle the error response
        console.error('Error requesting OTP:', error);
      }
    );
  }

  login(): void {
    if (this.isEmail === true) {
      // Login with email and password
      if (this.emailOrPhone && this.password) {
        // Perform login logic
        console.log('Logging in with email and password');
        // Assuming the login is successful, navigate to the dashboard
        this.router.navigate(['/dashboard']);
      }
    } else if (this.isEmail === false) {
      // Login with OTP
      if (this.emailOrPhone && this.otp) {
        // Perform login with OTP logic
        console.log('Logging in with OTP');
        const phoneNumber = this.emailOrPhone; // Assign emailOrPhone to phoneNumber
        const otp = this.otp; // Assign this.otp to otp
        this.loginApi.verifyOTP(phoneNumber, otp).subscribe(
          (res:any) => {
            console.log(res);
            
            if(res.token){
              if(localStorage.getItem("token")){
              localStorage.removeItem("token");
              }
              localStorage.setItem("token",res.token);
            }else if(res.status=='exist'){
              

            }else if(res.status=='invalid'){
              console.log('please enter valid otp')
            }else{
              console.log('handle default else condition here')
            }
          },(err) => {
            console.log(err);
          });
      }
    }
  }
  
}

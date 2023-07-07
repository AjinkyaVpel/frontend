import { Component } from '@angular/core';

@Component({
  selector: 'app-notification-setting',
  templateUrl: './notificationSetting.component.html',
  styleUrls: ['./notificationSetting.component.css']
})
export class NotificationSettingComponent {
  //display key group for roles management
  supportDisplayKey:boolean=true;
  vendorDisplayKey:boolean=true;
  hostDisplayKey:boolean=true;
  adminDisplayKey:boolean=true;
  superAdminDisplayKey:boolean=true;
  //display key group ends
  emailOrPhone: any;
  password!: string;
  showOtpInput!: boolean;
  showPasswordInput!: boolean;
  showOrText!: boolean;

  
  constructor() {
   
  }

  detectInputType() {
    console.log(this.emailOrPhone)
    alert('called')
    const value = this.emailOrPhone.trim();
    alert(this.emailOrPhone)
    if (/^\d+$/.test(value)) {
      // Only digits, assume it's a phone number
      this.showOtpInput = true;
      this.showPasswordInput = false;
      this.showOrText = false;
    } else {
      // Not only digits, assume it's an email
      this.showOtpInput = false;
      this.showPasswordInput = true;
      this.showOrText = true;
    }
  }

  login() {
    if (this.showOtpInput) {
      // Logic to handle login with OTP
      console.log('Login with OTP button clicked');
      console.log('Phone:', this.emailOrPhone);
      console.log('OTP:', this.password);
      // Add your code here to perform login with OTP
    } else {
      // Logic to handle login with email and password
      console.log('Login button clicked');
      console.log('Email:', this.emailOrPhone);
      console.log('Password:', this.password);
      // Add your code here to perform login with email and password
    }
  }

  requestOTP() {
    // Logic to handle requesting OTP
    console.log('Request OTP button clicked');
    console.log('Phone:', this.emailOrPhone);
    // Add your code here to request OTP

    // Set showOtpInput to true to display the OTP input field
    this.showOtpInput = true;

    // Hide the OR text
    this.showOrText = false;
  }

  loginWithOTP() {
    // Logic to handle login with OTP
    console.log('Login with OTP button clicked');
    console.log('Phone:', this.emailOrPhone);
    console.log('OTP:', this.password);
    //Add your code here to perform login with OTP
  }


}

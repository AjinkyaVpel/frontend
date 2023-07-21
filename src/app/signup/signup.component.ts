import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { RegisterService } from 'src/app/apiService/register.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
   //display key group for roles management
   supportDisplayKey:boolean=true;
   vendorDisplayKey:boolean=true;
   hostDisplayKey:boolean=true;
   adminDisplayKey:boolean=true;
   superAdminDisplayKey:boolean=true;
   //display key group ends
 
   registerForm!: FormGroup;
   additionalDetailsForm!:FormGroup;
   phoneNumber!: string;
   otp!: string;
   otpRequested: boolean = false;
   otpErrorMessage: string = '';
   continueAsHost: boolean = false;
   continueUserAsHost: boolean = false;
   userExist: boolean = false;
   otpValid: boolean = false;
   successMessage: string = '';
   registrationStatus!: string;
   showFields: boolean = false;
   showPassword: boolean = false;
   
 
   // Flags to control visibility of each form
   showRegisterForm: boolean = true;
   showAdditionalDetailsForm: boolean = false;
   // Add other flags as needed
 
 
   constructor(private formBuilder:FormBuilder,
     private registerApi:RegisterService,
     private router: Router,
     private dialog:MatDialog,
     ){}
 
   ngOnInit(): void {
     this.registerForm = this.formBuilder.group({
       phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
       // Other form controls here
       otp: ['', Validators.required],
      
     });
 
     this.additionalDetailsForm = this.formBuilder.group({
       hostFirstName: ['', [Validators.required]],
       hostLastName: ['', [Validators.required]],
       hostEmail: ['', [Validators.required, Validators.email]],
       password: ['', [Validators.required, Validators.minLength(6)]]
     });
   }
 
 
   showRegisterFormFn(): void {
     this.showRegisterForm = true;
     this.showAdditionalDetailsForm = false;
     // Add other form visibility controls as needed
   }
 
   showAdditionalDetailsFormFn(): void {
     this.showRegisterForm = false;
     this.showAdditionalDetailsForm = true;
     // Add other form visibility controls as needed
   }
 
   togglePasswordVisibility() {
     this.showPassword = !this.showPassword;
   }
 
   requestOTP() {
     this.otp = '';
     this.otpErrorMessage = '';
     if (this.registerForm.controls['phoneNumber'].valid) {
       this.phoneNumber = this.registerForm.controls['phoneNumber'].value;
       this.registerApi.requestOTP(this.phoneNumber).subscribe(
         (response: any) => {
           if (response.status) {
             this.otpRequested = true;
             this.registerForm.get('phoneNumber')?.disable();
             console.log(response.status);
             if (response.status === 'userExist') {
               this.otpErrorMessage = 'User account already exists. Do you want to continue as a host?';
               this.userExist = true;
             } else if (response.status === 'hostExist') {
               this.otpErrorMessage = 'Host account already exists. Please log in or use a different phone number.';
               this.userExist = false;
               this.otpRequested = false;
             } else if (response.status === 'sent' || response.status === 'alreadySent' || response.status === 'wait') {
               console.log('OTP sent successfully');
               this.otpRequested = true;
               this.successMessage = 'Creating a new account? Simply enter your OTP below and lets get started!';
             } else if (response.status === 'error') {
               console.error('Error sending OTP:', Error);
               this.otpErrorMessage = 'Failed to send OTP. Please try again later.';
               this.userExist = false;
             }
           }
         },
         (error: any) => {
           console.error('Error sending OTP:', error);
           this.otpErrorMessage = 'Failed to send OTP. Please try again later.';
           this.userExist = false;
         }
       );
     }
   }
 
   continue() {
     
     console.log(this.continueUserAsHost);
     
     if (this.registerForm.valid) {
       const phoneNumber = this.registerForm.controls['phoneNumber'].value;
       const enteredOTP = this.registerForm.controls['otp'].value;
   
       if (!this.continueUserAsHost) {
         this.registerApi.verifyOTP(phoneNumber, enteredOTP).subscribe(
           (response: any) => {
             if (response.status === 'created') {
               this.successMessage = 'OTP is valid. Account created successfully. Please fill the required details';
               this.showFields = true;
               this.otpValid = true; // Set otpValid to true
               this.showAdditionalDetailsForm = true; // Show the additional details form
             } else if (response.status === 'failed') {
               this.otpErrorMessage = 'OTP verification failed. Please try again later.';
               console.log('OTP verification failed');
             } else {
               this.otpErrorMessage = 'Invalid OTP. Please try again.';
               console.log('Invalid OTP');
             }
           },
           (error: any) => {
             console.error('Error verifying OTP:', error);
           }
         );
       } else {
         // Since continueUserAsHost is true, we can directly show the additional details form
 
         this.registerApi.verifyOTPForExistingUser(phoneNumber, enteredOTP).subscribe((res)=>{
           console.log(res);
         },(err)=>{
 
         });
         this.successMessage = 'Account created successfully. Lets setup your password!';
         this.showFields = true;
         this.otpValid = true; // Set otpValid to true
         this.showAdditionalDetailsForm = true; // Show the additional details form
       }
     } else {
       console.log('Form is not valid');
     }
   }
   
 
 continueAsHostClicked() {
   this.continueUserAsHost=true;
   const phoneNumber = this.registerForm.controls['phoneNumber'].value;
   this.registerApi.existUserSendOtp(phoneNumber).subscribe(
     (response: any) => {
       if (response.status === 'sent' || response.status === 'alreadySent' || response.status === 'wait') {
         console.log('OTP sent successfully');
         this.userExist = true;
         this.continueAsHost = true;
         this.showFields = true;
       } else if (response.status === 'error') {
         console.error('Error sending OTP:', Error);
         this.otpErrorMessage = 'Failed to send OTP. Please try again later.';
         this.userExist = false;
         this.continueAsHost = false;
         this.showFields = false;
       } else {
         // Handle other status codes if needed
       }
     },
     (error: any) => {
       console.error('Error sending OTP:', error);
       this.otpErrorMessage = 'Failed to send OTP. Please try again later.';
       this.userExist = false;
       this.continueAsHost = false;
       this.showFields = false;
       
     }
   );
 }
 
   updateUserDetails() {
     if (this.additionalDetailsForm.valid) {
       const userDetails = {
         hostFirstName: this.additionalDetailsForm.controls['hostFirstName'].value,
         hostLastName: this.additionalDetailsForm.controls['hostLastName'].value,
         hostEmail: this.additionalDetailsForm.controls['hostEmail'].value,
         password: this.additionalDetailsForm.controls['password'].value,
       };
   
       this.registerApi.updateUserDetails(this.phoneNumber, userDetails).subscribe(
         (response: any) => {
           console.log('User details updated successfully:', response);
   
           if (response.status === 'success') {
             this.successMessage = 'User details updated successfully.';
             this.showAdditionalDetailsForm = false; // Hide the additional details form
             this.router.navigate(['/login']); // Navigate to the dashboard page
           } else {
             this.otpErrorMessage = 'Failed to update user details. Please try again.';
             console.error('Failed to update user details. Response:', response);
           }
         },
         (error: any) => {
           console.error('Error updating user details:', error);
           this.otpErrorMessage = 'Failed to update user details. Please try again.';
         }
       );
     } else {
       console.log('Additional details form is not valid');
     }
   }
   
 
   register() {
     // Implement the registration logic here
     // You can access the phone number from this.registerForm.value.phoneNumber
     // and other form fields as needed.
     // For simplicity, we'll just display a success message here.
     this.successMessage = 'Registration successful!';
   }
   registerExistingUser(){
     if(this.additionalDetailsForm.controls['password'].value){
       const userDetails = {
         password: this.additionalDetailsForm.controls['password'].value,
       };
       this.registerApi.registerExistingUserPassword(this.phoneNumber,userDetails).subscribe(
         (response: any) => {
           console.log('Passwsord updated successfully:', response);
   
           if (response.status === 'success') {
             this.successMessage = 'Password updated successfully.';
             this.showAdditionalDetailsForm = false; // Hide the additional details form
             this.router.navigate(['/login']); // Navigate to the dashboard page
           } else {
             this.otpErrorMessage = 'Failed to update user details. Please try again.';
             console.error('Failed to update user details. Response:', response);
           }
         },
         (error: any) => {
           console.error('Error updating user details:', error);
           this.otpErrorMessage = 'Failed to update user details. Please try again.';
         }
       );
     }
   }
 
 }
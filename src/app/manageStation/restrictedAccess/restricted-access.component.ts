import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-restricted-access',
  templateUrl: './restricted-access.component.html',
  styleUrls: ['./restricted-access.component.css']
})
export class RestrictedAccessComponent implements OnInit {

  selectedMethod!: string;
  email!: string;
  phoneNumber!: string;
  mobileNumbersInput: FormControl=new FormControl(); 
  mobileNumbersArray: string[] = [];
  emailInput: FormControl=new FormControl('',[Validators.required]);
  emailInputArray:string[]=[];
  emailInvalidInputArray:string[]=[];
  selectedField:string='email';
  

  constructor(private ref: MatDialogRef<RestrictedAccessComponent>, private builder: FormBuilder) {

  }
  ngOnInit(): void {
   
  }

  closePopup() {
    this.ref.close();
  }

 

  

 

   
  addMobileNumbers() {
    
    // Split the input string by spaces and trim each number 
     const numbers = this.mobileNumbersInput.value.split(';').map((num:string) => num.trim());
    // Add non-empty numbers to the array 
    for (const number of numbers) {
      if (number !== '') {
        this.mobileNumbersArray.push(number);
      }
      
    }
    this.mobileNumbersInput.reset();
    console.log(this.mobileNumbersArray)
    // Clear the input field  
    
  }
   removeNumber(index:number){
    this.mobileNumbersArray.splice(index,1);  
  }
  addEmail() {
    const emails = this.emailInput.value.split(',').map((mail: string) => mail.trim());
    for (const email of emails) {
      if (email !== '' && this.validateEmail(email)) {
        this.emailInputArray.push(email);
      }else{
        if(email !== ''){
        this.emailInvalidInputArray.push(email);
        }
      }
    }
    console.log(this.emailInputArray);
    this.emailInput.reset();
    
  }
  
  validateEmail(email: string): boolean {
    // Use a regular expression to validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
   removeInvalidEmail(index:number){
    this.emailInvalidInputArray.splice(index,1);  
  }
  removeEmail(index:number){
    this.emailInputArray.splice(index,1);  
  }

  updateRestrictionList(){
// write code to call an api and send array of email ids or mobile numbers
//  along with station id and type of data in list
  }

  submitForm() {
    if (this.selectedMethod === 'email') {
      // Handle email submission
      console.log('Email:', this.email);
    } else if (this.selectedMethod === 'number') {
      // Handle phone number submission
      console.log('Phone Number:', this.phoneNumber);
    }
  }
  

}

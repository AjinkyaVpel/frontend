import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { RestrictedAccessService } from 'src/app/apiService/restricted-access.service';



@Component({
  selector: 'app-restricted-access',
  templateUrl: './restricted-access.component.html',
  styleUrls: ['./restricted-access.component.css']
})
export class RestrictedAccessComponent implements OnInit {
  //display key group for roles management
  supportDisplayKey:boolean=true;
  vendorDisplayKey:boolean=true;
  hostDisplayKey:boolean=true;
  adminDisplayKey:boolean=true;
  superAdminDisplayKey:boolean=true;
  //display key group ends
  
  email!: string;
  phoneNumber!: string;
  mobileNumbersInput: FormControl=new FormControl(); 
  mobileNumbersArray: string[] = [];
  mobileInvalidNumbersArray:string[]=[];
  emailInput: FormControl=new FormControl('');
  emailInputArray:string[]=[];
  emailInvalidInputArray:string[]=[];
  userId!:string;
  userIdList:string[]=[];
  selectedField:string='email';
  stationId!:string;
  
  

  constructor(private ref: MatDialogRef<RestrictedAccessComponent>, private builder: FormBuilder, private restrictedAccessApi:RestrictedAccessService, @Inject(MAT_DIALOG_DATA) public data: any,private snackBar:MatSnackBar) {

  }
  ngOnInit(): void {
    this.stationId=this.data.stationId; 
  }

  closePopup() {
    this.ref.close();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message,'close', {
      duration: 3000,
      verticalPosition: 'bottom',
      panelClass: 'success',
      
    });
  }
 
  resetForms(){
    console.log('called')
    this.emailInvalidInputArray.length=0;
    this.emailInputArray.length=0;
    this.mobileInvalidNumbersArray.length=0;
    this.mobileNumbersArray.length=0;
    this.userIdList.length=0;
    this.mobileNumbersInput.reset();
    this.emailInput.reset();

  }
  addEmail() {
    const emails = this.emailInput.value.split(',').map((mail: string) => mail.trim());
    for (const email of emails) {
      if (email !== '' && this.validateEmail(email)) {
      this.restrictedAccessApi.getUserByEmailId(email).subscribe((result) => {
        this.restrictedAccessApi.getIsUserPresent(this.stationId,result).subscribe(res=>{
          if(!res&&result){
            this.userIdList.push(result);
          this.emailInputArray.push(email);
          }
          else if(res){
            this.emailInvalidInputArray.push(email);
          }
        
        },err=>{
          console.log(err)
        })

      },(err)=>{
        console.log(err)
        this.emailInvalidInputArray.push(email);
      }) 
      }else{
        if(email !== ''){
        this.emailInvalidInputArray.push(email);
        }
      }
    }
   
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
    this.userIdList.splice(index,1);  
  }


  addMobileNumbers() {
   
    const numbers = this.mobileNumbersInput.value.split(',').map((number: string) => number.trim());
    for (const number of numbers) {
      if (number !== '' && this.validateNumber(number)) {
      this.restrictedAccessApi.getUserByContactNumber(number).subscribe((result) => {
        this.restrictedAccessApi.getIsUserPresent(this.stationId,result).subscribe(res=>{
          if(!res&&result){
            this.userIdList.push(result);
            this.mobileNumbersArray.push(number);
          }
          else if(res){
            this.mobileInvalidNumbersArray.push(number);
          }
        
        },err=>{
          console.log(err)
        })

      },(err)=>{
        console.log(err)
        this.mobileInvalidNumbersArray.push(number);
      }) 
      }else{
        if(number !== ''){
          this.mobileInvalidNumbersArray.push(number);
        }
      }
    }
   
    this.mobileNumbersInput.reset();
    
  }
  
  validateNumber(number: string): boolean {
    // Use a regular expression to validate a 10-digit number
    const numberPattern = /^\d{10}$/;
    return numberPattern.test(number);
  }
  
   removeInvalidNumber(index:number){
    this.mobileInvalidNumbersArray.splice(index,1);  
  }
  removeNumber(index:number){
    this.mobileNumbersArray.splice(index,1);  
  }


  // updateRestrictionList(){
// write code to call an api and send array of email ids or mobile numbers
//  along with station id and type of data in list

  //   console.log(this.userIdList)
  // }





  updateRestrictionList() {
    
    if (this.userIdList.length>0) {
      this.restrictedAccessApi.setUserRestrictionToStation(this.stationId,this.userIdList).subscribe
      (res=>{
          this.openSnackBar(res);
          window.location.reload();
      },err=>{
        console.log(err.error);
      })
    }else{
      this.openSnackBar("add at least on user")
    }
  }
  

}

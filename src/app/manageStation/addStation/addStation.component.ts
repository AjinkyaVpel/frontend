import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManageStationService } from 'src/app/apiService/manage-station.service';


@Component({
  selector: 'app-add-station',
  templateUrl: './addStation.component.html',
  styleUrls: ['./addStation.component.css']
})
export class AddStationComponent {
  addStation:FormGroup;
  stationData:any;
  updateStationId!:string;
  submit:boolean=true;
  update:boolean=false;
  amenities: Array<any> = [
    {name:'WiFi',value: 'WiFi' },
    {name:'Restaurants',value: 'Restaurants' },
    {name:'Telephone',value: 'Telephone' },
    {name:'Garden',value: 'Garden' },
    {name:'Restroom',value: 'Restroom' },
    {name:'EV accessary store',value: 'EV accessary store' },
    {name:'Car Wash',value: 'Car Wash' },
  ];
  powerStation =[
    "IS-17017",
    "IS-27017",
    "IS-37017",
    "IS-47017",
    "IS-57017",
  ]
  parkingType =[
    "Private",
    "Public"
  ]
  linkPattern = /^https:\/\/goo\.gl\/maps\/[A-Za-z0-9]+$/;
  constructor(private formBuilder: FormBuilder,private manageStation:ManageStationService,private dialogRef: MatDialogRef<AddStationComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private snackBar:MatSnackBar) {
    this.addStation = this.formBuilder.group({
     
      stationName: '',
      stationArea: '',
      stationHostId:'',
      stationVendorId: '',
      stationAddressLineOne:'',
      stationAddressLineTwo:'',
      stationZipCode:['', [Validators.required, this.validatePincode]],
      stationCity:'',
      stationLatitude: ['', [Validators.required, Validators.min(-90), Validators.max(90), Validators.pattern(/^[-+]?([1-8]?\d(\.\d{1,15})?|90(\.0{1,15})?)$/)]],
      stationLongitude: ['', [Validators.required, Validators.min(-180), Validators.max(180), Validators.pattern(/^-?((1?[0-7]?|[0-9]?[0-9])[0-9](\.\d{1,15})?|180(\.0{1,15})?)$/)]],
      ystationLocationURL: ['', [Validators.pattern('^https:\/\/goo\.gl\/maps\/[A-Za-z0-9]+$')]],
      stationParkingArea: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      stationContactNumber: ['+91', [Validators.required, Validators.pattern(/^\+91\d{10}$/)]],
      stationStatus: '',
      stationPowerStandard: '',
      stationOpeningTime:'',
      stationClosingTime:'',
      stationParkingType: '',
      stationAmenity: this.formBuilder.array([])
    })


  }
  ngOnInit():void{
    
    if(this.data.stationId){
      this.updateStationId=this.data.stationId;
      this.update=true;
      this.submit=false;
    }
  this.addStation.patchValue(this.data);  
  console.log(this.addStation);
 
}
  onCheckboxChange(event:any){
    const stationAmenity: FormArray = this.addStation.get('stationAmenity') as FormArray;
    if(event.target.checked){
      stationAmenity.push(new FormControl(event.target.value));
    }
  }
  openSnackBar(message: any,action: any = 'ok') {
    this.snackBar.open(message,action, {
      duration: 3000,
      verticalPosition: 'bottom',
      panelClass: ['warning']
      
    });
  }
  
  hasError(controlName: string, errorName: string): boolean {
  const control = this.addStation.get(controlName);
  return !!(control?.errors && control?.errors[errorName] && control?.touched);
}

validatePincode(control: FormControl) {
  const pincodeRegex = /^[1-9][0-9]{5}$/; // Regular expression for pincode validation
  const valid = pincodeRegex.test(control.value);
  return valid ? null : { invalidPinCode: true };
}

  getStationDetails(stationId:string){
    this.stationData= this.manageStation.getStationById(stationId);
  }

  onFormSubmit(){
    if(this.updateStationId){
      
      this.manageStation.onEditStation(this.updateStationId,this.addStation.value,).subscribe((result) =>{
        window.location.reload();
      })
    }else{  
           
      this.manageStation.addStationToList(this.addStation.value);
      this.openSnackBar("Station added successfully","Done")
      this.dialogRef.close(true);
      this.manageStation.getStationById(this.data.stationId);
      window.location.reload();
    }
    window.location.reload();
    
  }
    
   
}

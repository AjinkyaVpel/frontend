import { Component, Inject,OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChargerService } from 'src/app/apiService/charger.service';
import { ManageStationComponent } from 'src/app/manageStation/manageStation.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-charger',
  templateUrl: './addCharger.component.html',
  styleUrls: ['./addCharger.component.css']
})
export class AddChargerComponent {
    //display key group for roles management
    supportDisplayKey:boolean=true;
    vendorDisplayKey:boolean=true;
    hostDisplayKey:boolean=true;
    adminDisplayKey:boolean=true;
    superAdminDisplayKey:boolean=true;
    //display key group ends
  addStation:FormGroup ;
  stationId:string='';
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
  constructor(private activeRoute: ActivatedRoute,private formBuilder: FormBuilder,private chargerApi:ChargerService,private dialogRef: MatDialogRef<AddChargerComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private snackBar:MatSnackBar) {
    
    
    this.addStation = this.formBuilder.group({
      chargerName: ['', Validators.required],
      chargerNumber:'',
      chargerInputVoltage: '',
      chargerOutputVoltage:'',
      chargerOutputAmpere:'',
      chargerMinInputAmpere:'',
      chargerMaxInputAmpere:'',
      chargerInputFrequency:'',
      chargerOutputFrequency:'',
      chargerIPRating:'',
      chargerMountType:'',
      chargerNumberOfConnector:'',
      isRFID:'',
      chargerPointSerialNumber:'',
      chargerOCPPProtocol:'',
      chargerConnectorType:'',
      chargerPointModel:'',
      chargerPointVendor:'',
      meterType:'',
      chargeBoxSerialNumber:'',
      isAppSupport:'',
      isTBCutOff:'',
      isAntitheft:'',
      isLEDDisplay:'',
      isLEDIndications:'',
      isSmart: ''
    })
  }
  ngOnInit(): void {
   this.stationId=this.data.stationId;
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

  onFormSubmit() {
    this.chargerApi.addChargerToList(this.addStation.value, this.stationId).subscribe(
      (response:any) => {
        console.log('Response', response);
        this.openSnackBar("Charger added successfully", "Done");
      },
      (error:any) => {
        console.log('Error', error);
        this.openSnackBar("Something went wrong", "Close");
      });
    
    this.dialogRef.close(true);
    window.location.reload();
  }

}

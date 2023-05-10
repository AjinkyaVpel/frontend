import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChargerService } from 'src/app/apiService/charger.service';
import { ManageStationComponent } from 'src/app/manageStation/manageStation.component';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-add-charger',
  templateUrl: './addCharger.component.html',
  styleUrls: ['./addCharger.component.css']
})
export class AddChargerComponent {
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
  constructor(private activeRoute: ActivatedRoute,private formBuilder: FormBuilder,private chargerService:ChargerService,private dialogRef: MatDialogRef<AddChargerComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private snackBar:MatSnackBar) {
    
    
    this.addStation = this.formBuilder.group({
      chargerName: '',
      chargerNumber:'',
      chargerInputVoltage: '',
      chargerOutputVoltage:'',
      chargerOutputAmpere:'',
      chargerMaxInputAmpere:'',
      chargerInputFrequency:'',
      chargerOutputFrequency:'',
      chargerIpRating:'',
      chargerMountType:'',
      chargerNumberOfConnector:'',
      isRFID:'',
      chargerSerialNumber:'',
      chargerOcppProtocol:'',
      chargerConnectorType:'',
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
      this.chargerService.addChargerToList(this.addStation.value, this.stationId);
      this.openSnackBar("Charger added successfully","Done")
      this.dialogRef.close(true);
  }

}

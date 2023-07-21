import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChargerService } from 'src/app/apiService/charger.service';
import { Charger } from '../charger';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-charger-setting',
  templateUrl: './chargerSetting.component.html',
  styleUrls: ['./charger-setting.component.css']
  
})
export class ChargerSettingComponent {
    //display key group for roles management
    supportDisplayKey:boolean=true;
    vendorDisplayKey:boolean=true;
    hostDisplayKey:boolean=true;
    adminDisplayKey:boolean=true;
    superAdminDisplayKey:boolean=true;
    //display key group ends
    
  chargerForm:FormGroup;
  chargerId: any;
  stationId: any;
  isChecked = false;
  chargerData: any;
  chargerFormData: any;
  connector: any;
  chargerUpdateData:Charger | undefined;
  
  constructor(private activeRoute: ActivatedRoute,private formbuilder:FormBuilder,private charger:ChargerService,private snackBar:MatSnackBar) {
    this.chargerForm = this.formbuilder.group({
      chargerName: '',
      chargerNumber:'',
      chargerInputVoltage: '',
      chargerOutputVoltage: '',
      chargerMinInputAmpere: '',
      chargerMaxInputAmpere: '',
      chargerOutputAmpere: '',
      chargerInputFrequency: '',
      chargerOutputFrequency: '',
      chargerIPRating: '',
      chargerMountType: '',
      chargerSerialNumber: '',
      chargePointModel:'',
      chargePointVendor:'',
      chargerPointSerialNumber:'',
      chargeBoxSerialNumber:'',
      chargerOCPPProtocol:'',
      chargerConnectorType:'',
      chargerNumberOfConnector:'',
      meterType:'',
      firmwareVersion:'',
      chargerStatus:'',
      isRFID:'',
      isAppSupport:'',
      isTBCutOff:'',
      isAntitheft:'',
      isLEDDisplay:'',
      isLEDIndications:'',
      isSmart: ''
    })
  }
  

  ngOnInit(): void {
      this.stationId = this.activeRoute.snapshot.paramMap.get('stationId')
      this.chargerId = this.activeRoute.snapshot.paramMap.get('chargerId');
      this.chargerDetailsUsingId(this.chargerId);     
      // this.connector.getConnector(this.stationId,this.chargerId).subscribe((res: any)=>{
      //   console.warn(res);
        
      // }) 
  }

  chargerDetailsUsingId(id: any){
    this.charger.getChargerById(id).subscribe((result: any)=>{      
      this.chargerFormData = result;
      this.chargerForm.patchValue(this.chargerFormData)
      
    })
  }
  openSnackBar(message: any,action: any = 'ok') {
    this.snackBar.open(message,action, {
      duration: 3000,
      verticalPosition: 'bottom',
      panelClass: ['warning']
      
    });
  }
  closeUpdateCharger(){
    this.isChecked = false;
  }

  updateChargerForm(){
    this.charger.updateCharger(this.chargerId,this.stationId,this.chargerForm.value).subscribe((res:any)=>{
     if(res.status=='success'){
      this.openSnackBar("Charger updated successfully", "Done");
      }else if(res.status=='failed'){

      }
    },(err:any)=>{
      console.log(err);
      this.openSnackBar("Something went wrong", "Done");
    });
    window.location.reload();
  }


  toggleSlideToggle() {
    this.isChecked = !this.isChecked;
  }
}

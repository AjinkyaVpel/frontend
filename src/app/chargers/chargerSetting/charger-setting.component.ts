import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChargerService } from 'src/app/apiService/charger.service';

@Component({
  selector: 'app-charger-setting',
  templateUrl: './chargerSetting.component.html',
  styleUrls: ['./charger-Setting.component.css']
})
export class ChargerSettingComponent {
  chargerSetting:any;
  chargerId: any;
  stationId: any;
  isChecked = false;
  chargerData: any;
  chargerFormData: any;
  connector: any;

  constructor(private activeRoute: ActivatedRoute,private formbuilder:FormBuilder,private charger:ChargerService,) {
    this.chargerSetting = this.formbuilder.group({
      chargerId: '',
      chargerName: '',
      chargerInputVoltage: '',
      chargerOutputVoltage: '',
      chargerMinInputAmpere: '',
      chargerMaxInputAmpere: '',
      chargerOutputAmpere: '',
      chargerInputFrequency: '',
      chargerOutputFrequency: '',
      chargerIPRating: '',
      chargerMountType: '',
      chargerSerialNumber: ''
    })
  }
  

  ngOnInit(): void {
      this.stationId = this.activeRoute.snapshot.paramMap.get('stationId')
      this.chargerId = this.activeRoute.snapshot.paramMap.get('chargerId');
      this.chargerDetailsUsingId(this.chargerId);     
      this.connector.getConnector(this.stationId,this.chargerId).subscribe((res: any)=>{
        console.warn(res);
        
      }) 
  }

  chargerDetailsUsingId(id: any){
    this.charger.getChargerById(id).subscribe((result: any)=>{      
      this.chargerFormData = result;
      this.chargerSetting.patchValue(this.chargerFormData)
      
    })
  }

  closeUpdateCharger(){
    this.isChecked = false;
  }

  updateChargerForm(){
    this.charger.updateCharger(this.chargerId,this.chargerSetting.value).subscribe((result: any)=>{
      console.warn(result);
      
    })
  }
}

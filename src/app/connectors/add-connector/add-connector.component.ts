import {Component, Inject, OnInit} from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ConnectorService } from 'src/app/apiService/connector.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-connector',
  templateUrl: './add-connector.component.html',
  styleUrls: ['./add-connector.component.css']
})
export class AddConnectorComponent implements OnInit {
  //display key group for roles management
  supportDisplayKey:boolean=true;
  vendorDisplayKey:boolean=true;
  hostDisplayKey:boolean=true;
  adminDisplayKey:boolean=true;
  superAdminDisplayKey:boolean=true;
  //display key group ends
  addConnector:FormGroup;
  connectorId: any;
  stationId: any;
  chargerId: any;

  connectorType =[
    "Type A",
    "Type B",
    "Type C"
  ]
  connectorSocket =[
    "Socket A",
    "Socket B",
    "Socket C"
  ]

  constructor(private activeRoute: ActivatedRoute,private formBuilder: FormBuilder,private dialogRef: MatDialogRef<AddConnectorComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private connectors:ConnectorService) {
    this.addConnector = this.formBuilder.group({
      connectorNumber:['', [Validators.required, Validators.pattern(/^\d+$/)]],
      connectorType: '',
      connectorSocket: '',
      connectorStatus: '',
      connectorOutputPower: ['', [Validators.required, Validators.pattern(/^\d{1,3}$/)]],
      connectorCharges: '',
    })
  }

  ngOnInit(): void {
    this.connectorId = this.activeRoute.snapshot.paramMap.get('connectorId');
    this.addConnector.patchValue(this.data);      
    this.stationId = this.data.stationId;
    this.chargerId = this.data.chargerId;
    console.log(this.stationId);
    console.log(this.chargerId);
    console.log(this.data);
  }

   getConnectorDetails(sId:any,cId:any){
     this.connectors.getConnector(sId,cId);
   }

   hasError(controlName: string, errorName: string): boolean {
    const control = this.addConnector.get(controlName);
    return control ? control.hasError(errorName) : false;
  }
  

  onFormSubmit() {
    // if (this.addConnector.invalid) {
    //   // Form is invalid, display error messages or handle the case accordingly
    //   return;
    // }
  
    if (this.data.connectorId) {
      this.connectors.updateConnector(this.data.connectorId, this.addConnector.value).subscribe((result) => {
        console.warn(result);
      });
    } else {
    
      this.connectors.addConnector(this.addConnector.value, this.stationId, this.chargerId);
      this.dialogRef.close(true);
      this.getConnectorDetails(this.stationId, this.chargerId);
    }
    window.location.reload();
  }
  
}

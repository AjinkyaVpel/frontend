import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChargerService {
  

  constructor(private http:HttpClient) { }

  //get the complete list of charger bu passing the stationId
  getChargerAllList(stationId: any){    
    return this.http.get(environment.stationServiceUrl+`manageCharger/getChargers?stationId=${stationId}`);
    
  }

  // get the information of charger using chargerId
  getChargerById(chargerId: any){
    return this.http.get(environment.stationServiceUrl+`manageCharger/getCharger?chargerId=${chargerId}`);
  }

  // update the charger details using the chargerId 
  updateCharger(chargerId:any,stationId:any,data: any){
    console.log(data)
    return this.http.put(environment.stationServiceUrl+`manageCharger/udpateCharger?chargerId=${chargerId}&stationId=${stationId}`,data);
  }
  //Delete the charger by using the chargerId
  deleteChargerById(id: any) {
    return this.http.delete(environment.stationServiceUrl+`manageCharger/deleteCharger?chargerId=${id}`);
  }
  // Add Charger in the charger list
  addChargerToList(data: any,stationId:any) {
    console.log(data);
    console.log(stationId);
    return this.http.post(environment.stationServiceUrl+`manageCharger/addCharger?stationId=${stationId}`, data).subscribe(
      (response) => {
        console.log('Response', response);
      },
      (error) => {
        console.log('Error', error.status);
      }
    )  //real station api
    return this.http.post(`http://192.168.0.243:8096/manageCharger/addCharger?stationId=${stationId}`, data,{ responseType: 'text' });
  }
}

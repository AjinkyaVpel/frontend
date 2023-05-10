import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Station } from '../manageStation/station';

@Injectable({
  providedIn: 'root'
})
export class ManageStationService {

  addChargerToList(value: any) {
    console.log(value)
    // throw new Error('Method not implemented.');
  }
  removechargerById: any;
  removeChargerById(chargerId: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  //give complete list of station
  getMyStationList() {
    //return this.http.get('assets/json/stationInfo.json');
    return this.http.get('http://192.168.0.243:8096/manageStation/getStations');
  }

  // not working as patch service of this is not created
  changeStation(data: any, id: any) {
    return this.http.patch('' + id, { "stationStatus": data });
  }

  // give complete list of station using stationId
  getStationById(id: string) {
    //console.log(this.http.get<Station>(`http://192.168.0.243:8080/vst1/manageStation/getStationByStationId?stationId=${id}`));
    return this.http.get<Station>(`http://192.168.0.243:8096/manageStation/getStation?stationId=${id}`);
  }

  //for adding the station in staionlist
  addStationToList(data: any) {
    return this.http.post('http://192.168.0.243:8096/manageStation/addStation', data).subscribe(
      (response) => {
        console.log('Response', response);
      },
      (error) => {
        console.log('Error', error.status);
      }
    )  //real station api
  }
  // delete station from list of station using stationId

  deleteStationById(id: any) {
    return this.http.delete(`http://192.168.0.243:8096/manageStation/deleteStation?stationId=${id}`);
  }
}

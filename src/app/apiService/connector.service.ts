import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {

  constructor(private http:HttpClient) { }

  // get all connectors details
  getConnector(stationId: any,chargerId: any){
    return this.http.get(`http://192.168.0.243:8096/manageConnector/getConnectors?stationId=${stationId}&chargerId=${chargerId}`)
  }

  // get connector information by connectorId
  getConnectorById(connectorId: any){
    return this.http.get(`http://192.168.0.243:8096/manageConnector/getConnector?connectorId=${connectorId}`);
  }

  // adding connectors data
  addConnector(data: any,stationId: any,chargerId: any){
    return  this.http.post(`http://192.168.0.243:8096/manageConnector/addConnector?stationId=${stationId}&chargerId=${chargerId}`,data).subscribe(
      (response)=>{
        console.log('Response',response);
      },
      (error) => {
        console.log('Error',error.status);
      }
    )
  }
   
  // updating connnector data
  updatingConnector(id:any,data:any){
    return this.http.put(`${id}`,data)
  }
  //Delete the connector by using connectorId
  deleteConnectorById(id:any){
    alert(id)
    console.log(id)
    return this.http.delete(`http://192.168.0.243:8096/manageConnector/deleteConnector?connectorId=${id}`);
  
  }
}

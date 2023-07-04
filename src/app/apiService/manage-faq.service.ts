import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManageFaqService {

  constructor( private http:HttpClient) { }
  getAllFaqList(){          
    return this.http.get( `http://192.168.0.243:8098/manageFaq/faqs`);
  }

  addFaq(data:any){
    return this.http.post(`http://192.168.0.243:8098/manageFaq/addFaq`,data).subscribe(
      (response) => {
        console.log('Response', response);
      },
      (error) => {
        console.log('Error', error.status);
      }
    )  //real station api
  }

  editFaq(faqId:string,data:any){ 
   return this.http.put(`http://192.168.0.243:8098/manageFaq/updateFaq?faqId=${faqId}`,data);
  }

   //Delete the connector by using connectorId
   deleteFaqById(faqId:string){       
    return this.http.delete(`http://192.168.0.243:8098/manageFaq/deleteFaq?faqId=${faqId}`);
  
  }
}

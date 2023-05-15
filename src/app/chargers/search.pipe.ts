import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items:any, searchText:any):any {
    if(items) { return null }
    if(!searchText) {
      return items
    }
 
    searchText=searchText.toLowerCase();
   //console.log(args)
    return items.filter((item: { chargerName: string; })=>{
      //console.log(JSON.stringify(chargerId).toLowerCase().includes(args))
    return item.chargerName.toLowerCase().includes(searchText);
   
    });
    
  }

}

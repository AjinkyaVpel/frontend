import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-live-data',
  templateUrl: './live-data.component.html',
  styleUrls: ['./live-data.component.css']
})
export class LiveDataComponent {
  constructor(private http : HttpClient) {  
  }
   //display key group for roles management
   supportDisplayKey:boolean=true;
   vendorDisplayKey:boolean=true;
   hostDisplayKey:boolean=true;
   adminDisplayKey:boolean=true;
   superAdminDisplayKey:boolean=true;
   //display key group ends
  dataPoints:any[] = [];
  timeout:any = null;
  xValue:number = 1;
  yValue:number = 10;
  newDataCount:number = 10;
  chart: any;
 
  chartOptions = {
    theme: "light2",
    title: {
      text: "Live Data"
    },
    data: [{
      type: "line",
      dataPoints: this.dataPoints
    }]
  }
 
  getChartInstance(chart: object) {
    this.chart = chart;
    this.updateData();
  }
 
  ngOnDestroy() {
    clearTimeout(this.timeout);
  }
 
  updateData = () => {
    this.http.get("https://canvasjs.com/services/data/datapoints.php?xstart="+this.xValue+"&ystart="+this.yValue+"&length="+this.newDataCount+"type=json", { responseType: 'json' }).subscribe(this.addData);
  }
 
  addData = (data:any) => {
    if(this.newDataCount != 1) {
      data.forEach( (val:any[]) => {
        this.dataPoints.push({x: val[0], y: parseInt(val[1])});
        this.xValue++;
        this.yValue = parseInt(val[1]);  
      })
    } else {
      //this.dataPoints.shift();
      this.dataPoints.push({x: data[0][0], y: parseInt(data[0][1])});
      this.xValue++;
      this.yValue = parseInt(data[0][1]);  
    }
    this.newDataCount = 1;
    this.chart.render();
    this.timeout = setTimeout(this.updateData, 1000);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
	  //display key group for roles management
	  supportDisplayKey:boolean=true;
	  vendorDisplayKey:boolean=true;
	  hostDisplayKey:boolean=true;
	  adminDisplayKey:boolean=true;
	  superAdminDisplayKey:boolean=true;
	  //display key group ends
	  
  chartOptions = {
	  animationEnabled: true,
	  title: {
		text: "Charger Status"
	  },
	  data: [{
		type: "pie",
		startAngle: -90,
		indexLabel: "{name}: {y}",
		yValueFormatString: "#,###.##'%'",
		dataPoints: [
		  { y: 6, name: "Malfunctioned" },
		  { y: 27, name: "Occupied" },
		  { y: 27, name: "Idle Devices" },
		  { y: 43.3, name: "Active Chargers" }
		]
	  }]
	}	
}

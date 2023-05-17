import { Component, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
  canvas: any;
  ctx: any;
  @ViewChild('pieCanvas') pieCanvas!: { nativeElement: any };

  pieChart: any;

  constructor() {}

  ngAfterViewInit(): void {
    this.pieChartBrowser();
  }

  pieChartBrowser(): void {
    this.canvas = this.pieCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    this.pieChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: ['Active Charger','Occupied','Idle Devices','Malfunctioned'],
        datasets: [
          {
            backgroundColor: [
              '#2ecc71',
              
              '#9b59b6',
              '#f1c40f',
              '#e74c3c',
            ],
            data: [ 45, 27, 27, 6],
          },
        ],
      },
    });
  }
}

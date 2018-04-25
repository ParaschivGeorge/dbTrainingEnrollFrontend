import * as Chart from 'chart.js';
import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [ReportsService]
})
export class ReportsComponent implements OnInit {
  public barChartData: number[] = [];
  public barChartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales : {
      yAxes: [{
         ticks: {
            steps : 15,
            stepValue : 1,
            max : 20,
          },
          display: true,
      }],
      xAxes: [{
        display: true,
        gridLines: {
          color: 'rgba(0, 0, 0, 0)'
        }
      }]
    }
  };

  public barChartLabels: string[] = ['2006', '2007', '2008', '2009'];
  public barChartType = 'bar';
  public barChartLegend = false;

  public barChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(49,64,165,1)',
      pointHoverBackgroundColor: '#fff'
    }
  ];

  constructor(
    private reportsService: ReportsService,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  getPopularity(): void {
    this.reportsService.getPopularity().subscribe(
      result => {

        const labels = (result as Array<any>).map(res => res.technology);
        const data = (result as Array<any>).map(res => res.attendees);

        this.barChartData = data;
      });
  }

  getSoftPopularity(): void {
    this.reportsService.getSoftPopularity().subscribe(
      result => {

        const labels = (result as Array<any>).map(res => res.technology);
        const data = (result as Array<any>).map(res => res.attendees);

        this.barChartData = data;

      });
  }

  getTechPopularity(): void {
    this.reportsService.getTechPopularity().subscribe(
      result => {

        const labels = (result as Array<any>).map(res => res.technology);
        const data = (result as Array<any>).map(res => res.attendees);

        this.barChartData = data;

      });
  }

    ngOnInit() {
      this.getPopularity();
    }
}

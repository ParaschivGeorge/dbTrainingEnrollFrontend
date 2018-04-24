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
  public barChartType: string = 'bar';
  public doughnutChartType: string = 'doughnut';
  public doughnutChartLabels: string[];
  public doughnuTechSoftChartLabels: string[];

  public barChartLegend: boolean = false;
  public doughnutChartLegend: boolean = false;
  public doughnutWomenChartData: number[]  = [];
  public doughnutMenChartData: number[]  = [];
  public doughnutSoftChartData: number[]  = [];
  public doughnutTechChartData: number[]  = [];
  // public barChartLabels: string[];


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

  public doughnutChartOptions: any = {
    responsive: true,
    cutoutPercentage: 85
  };

  public barChartLabels: string[] = ['2006', '2007', '2008', '2009'];

  public barChartColors: Array<any> = [
    { // primary
      backgroundColor: 'rgba(49,64,165,1)',
      pointHoverBackgroundColor: '#fff'
    }
  ];

  public doughnutWomenChartColors: Array<any> = [
    { // warn
      backgroundColor: ['rgba(204,53,73,1)', 'rgba(232,232,232,1)'],
      pointHoverBackgroundColor: '#fff'
    }
  ];

  public doughnutMenChartColors: Array<any> = [
    { // primary
      backgroundColor: ['rgba(232,232,232,1)', 'rgba(49,64,165,1)'],
      pointHoverBackgroundColor: '#fff'
    }
  ];

  public doughnutSoftChartColors: Array<any> = [
    { // warn
      backgroundColor: ['rgba(28,142,137,1)', 'rgba(232,232,232,1)'],
      pointHoverBackgroundColor: '#fff'
    }
  ];

  public doughnutTechChartColors: Array<any> = [
    { // primary
      backgroundColor: ['rgba(232,232,232,1)', 'rgba(62,173,214,1)'],
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
        console.log(result);
        // let labels: string[];
        let labels = (result as Array<any>).map(res => res.technology);
        // this.barChartLabels = labels;
        console.log(this.barChartLabels);
        let data = (result as Array<any>).map(res => res.attendees);

        this.barChartData = data;
        // this.barChartLabels = labels;

        console.log(data);
      });
  }

  getSoftPopularity(): void {
    this.reportsService.getSoftPopularity().subscribe(
      result => {
        console.log(result);
        let labels = (result as Array<any>).map(res => res.technology);
        let data = (result as Array<any>).map(res => res.attendees);

        this.barChartData = data;

        console.log(data);
      });
  }

  getTechPopularity(): void {
    this.reportsService.getTechPopularity().subscribe(
      result => {
        console.log(result);
        let labels = (result as Array<any>).map(res => res.technology);
        let data = (result as Array<any>).map(res => res.attendees);

        this.barChartData = data;

        console.log(data);
      });
  }

  getGender(): void {
    this.reportsService.getGender().subscribe(
      result => {
        let labels = ['Men', 'Women'];
        let data = (result as Array<any>).map(res => res);

        // let data = [19, 14];
        this.doughnutWomenChartData = data.reverse();
        this.doughnutMenChartData = data;
        this.doughnutChartLabels = labels;

        console.log(this.doughnutMenChartData);
      });
  }

  getSoftTech(): void {
    this.reportsService.getSoftTech().subscribe(
      result => {
        let labels = ['Tech', 'Soft'];
        let data = (result as Array<any>).map(res => res);

        // let data = [19, 14];
        this.doughnutSoftChartData = data.reverse();
        this.doughnutTechChartData = data;
        this.doughnuTechSoftChartLabels = labels;

        console.log(this.doughnutMenChartData);
      });
  }


    ngOnInit() {
      this.getPopularity();
      this.getGender();
      this.getSoftTech();
    }
}

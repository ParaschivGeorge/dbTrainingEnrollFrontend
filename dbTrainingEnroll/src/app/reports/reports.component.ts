import * as Chart from 'chart.js';
import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
  
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

  public percWomen: number;
  public percMen: number;
  public percSoft: number;
  public percTech: number;
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

  public barChartLabels: string[] = [];

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
        this.barChartLabels = labels;
        let data = (result as Array<any>).map(res => res.attendees);

        this.barChartData = data;
      });
  }

  getSoftPopularity(): void {
    this.reportsService.getSoftPopularity().subscribe(
      result => {
        console.log(result);
        let labels = (result as Array<any>).map(res => res.technology);
        let data = (result as Array<any>).map(res => res.attendees);

        this.barChartData = data;
        this.barChartLabels = labels;

        console.log(data);
      });
  }

  getTechPopularity(): void {
    this.reportsService.getTechPopularity().subscribe(
      result => {
        let labels = (result as Array<any>).map(res => res.technology);
        let data = (result as Array<any>).map(res => res.attendees);

        this.barChartData = data;
        this.barChartLabels = labels;
      });
  }

  getGender(): void {
    this.reportsService.getGender().subscribe(
      result => {
        let labels = ['Men', 'Women'];
        let data = (result as Array<any>).map(res => res);
        let totalGender: number;

        // let data = [19, 14];
        this.doughnutWomenChartData = data.reverse();
        this.doughnutMenChartData = data;
        this.doughnutChartLabels = labels;

        totalGender = data[0] + data[1];
        this.percMen = Math.round((data[1] / totalGender) * 100);
        this.percWomen = Math.round((data[0] / totalGender) * 100);
      });
  }

  getSoftTech(): void {
    this.reportsService.getSoftTech().subscribe(
      result => {
        let labels = ['Tech', 'Soft'];
        let data = (result as Array<any>).map(res => res);
        let totalTrain: number;

        // let data = [19, 14];
        this.doughnutSoftChartData = data.reverse();
        this.doughnutTechChartData = data;
        this.doughnuTechSoftChartLabels = labels;

        totalTrain = data[0] + data[1];
        this.percTech = Math.round((data[1] / totalTrain) * 100);
        this.percSoft = Math.round((data[0] / totalTrain) * 100);
      });
  }


    ngOnInit() {
      this.getPopularity();
      this.getGender();
      this.getSoftTech();
    }
}

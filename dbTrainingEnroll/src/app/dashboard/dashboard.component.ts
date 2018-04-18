import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Training } from '../interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ApiService]
})

export class DashboardComponent implements OnInit {
  trainings: Training[];

    constructor(private apiService: ApiService) {
    }

    getTrainings(): void {
      this.apiService.getTrainings()
      .subscribe(
        result => this.trainings = result,
        error => console.log('Error: ' + error));
    }

    ngOnInit(): void {
      this.getTrainings();
    }

}

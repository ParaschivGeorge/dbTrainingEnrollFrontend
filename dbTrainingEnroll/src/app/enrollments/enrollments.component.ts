import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Training } from '../training';

@Component({
  selector: 'app-enrollments',
  templateUrl: '../dashboard/dashboard.component.html',
  styleUrls: ['../dashboard/dashboard.component.scss'],
  providers: [ApiService]
})
export class EnrollmentsComponent implements OnInit {
  trainings: Training[];

  constructor(private apiService: ApiService) { }

  getEnrollmentsList(): void {
    this.apiService.getEnrollmentsList()
    .subscribe(
      result => this.trainings = result,
      error => console.log('Error: ' + error));
  }

  ngOnInit() {
    this.getEnrollmentsList();
  }

}

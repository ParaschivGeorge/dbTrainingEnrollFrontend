import { Component, OnInit } from '@angular/core';
import { Training } from '../../models/training';
import { ApiService } from '../../services/api.service';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-training-form',
  templateUrl: './add-training-form.component.html',
  styleUrls: ['./add-training-form.component.scss']
})
export class AddTrainingFormComponent implements OnInit {
  training: Training[];
  addTrainingForm: FormGroup;
  trainingTypes = ['SOFT', 'TECHNICAL', 'BOOTCAMP', 'INDUCTION', 'PERSONAL', 'PROFESSIONAL', 'BUSINESS'];

  noSaturdayAndSunday = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }

  constructor(private userService: UserService,
    private apiService: ApiService) { }

  ngOnInit() {
    this.addTrainingForm = new FormGroup({
      'trainingType': new FormControl('TECHNICAL', [Validators.required]),
      'trainingName': new FormControl(null, [Validators.required]),
      'trainingDescription': new FormControl(null, [Validators.required]),
      'trainingResponsible': new FormControl(null, [Validators.required]),
      'trainingVendor': new FormControl(null, [Validators.required]),
      'startDate': new FormControl(null, [Validators.required]),
      'endDate': new FormControl(null, [Validators.required]),
      'minParticipants': new FormControl(null, [Validators.required]),
      'maxParticipants': new FormControl(null, [Validators.required]),
    });
  }
}

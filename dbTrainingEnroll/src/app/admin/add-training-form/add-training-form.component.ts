import { Component, OnInit } from '@angular/core';
import { Training } from '../../models/training';
import { ApiService } from '../../services/api.service';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AddTrainingFormData } from '../../models/add-training-form-data';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-add-training-form',
  templateUrl: './add-training-form.component.html',
  styleUrls: ['./add-training-form.component.scss']
})
export class AddTrainingFormComponent implements OnInit {
  training: Training[];
  addTrainingForm: FormGroup;
  trainingTypes = [
    'SOFT',
    'TECHNICAL',
    'BOOTCAMP',
    'INDUCTION',
    'PERSONAL',
    'PROFESSIONAL',
    'BUSINESS'
  ];

  noSaturdayAndSunday = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  };

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    public submitSnackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.addTrainingForm = new FormGroup({
      trainingType: new FormControl('TECHNICAL', [Validators.required]),
      trainingName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(15)
      ]),
      trainingDescription: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      trainingResponsible: new FormControl(null, [Validators.required]),
      trainingVendor: new FormControl(null),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      // tslint:disable-next-line:max-line-length
      minParticipants: new FormControl(8, [
        Validators.required,
        CustomValidators.number
      ]),
      // tslint:disable-next-line:max-line-length
      maxParticipants: new FormControl(20, [
        Validators.required,
        CustomValidators.number
      ])
    });
  }

  onSubmit() {
    if (this.addTrainingForm.valid) {
      this.submitSnackBar.open('Form submitted', 'Ok', { duration: 2000 });
    } else {
      this.submitSnackBar.open('Form is not valid', 'Ok', { duration: 2000 });
    }
  }
}

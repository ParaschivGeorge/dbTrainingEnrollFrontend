import {Component, EventEmitter, OnInit} from '@angular/core';
import {UploaderOptions} from 'ngx-uploader';
import {UploadFile} from '../../upload/upload-file';
import {UploadInput} from '../../upload/upload-input';
import {UploadOutput} from '../../upload/upload-output';
import * as XLSX from 'ts-xlsx';
import { Training } from '../../models/training';
import { UserDto } from '../../models/userDto';
import * as moment from 'moment';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-trainings',
  templateUrl: './add-trainings.component.html',
  styleUrls: ['./add-trainings.component.scss']
  // styleUrls: ['../../forms.scss'],
})
export class AddTrainingsComponent implements OnInit {

  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  dragOver: boolean;

  arrayBuffer: any;
  fileToUpload: File;
  file: File;

  constructor(private userService: UserService) {
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
  }

  incomingfile(event: UploadOutput) {
    if (event.type === 'addedToQueue'  && typeof event.file !== 'undefined') { // add file to array when added
      this.file = event.file.nativeFile;

    } else if (event.type === 'dragOver') {
      this.dragOver = true;
    } else if (event.type === 'dragOut') {
      this.dragOver = false;
    } else if (event.type === 'drop') {
      this.dragOver = false;
    }
  }

  ngOnInit() {
    this.file = null;
  }

  onDelete() {
    this.file = null;
  }

  onSubmit() {
    this.userService.newTrainingsList = [];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = [];
      for (let i = 0; i !== data.length; ++i) { arr[i] = String.fromCharCode(data[i]); }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, {type: 'binary'});
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      XLSX.utils.sheet_to_json(worksheet, {raw: true}).forEach(row => {
        // tslint:disable-next-line:forin
        const newTraining: Training = new Training();
        let i = 0;
        newTraining.acceptedUsers = 0;
        // tslint:disable-next-line:forin
        for (const prop in row) {
          if (i === 0) {
            newTraining.name = row[prop];
          } else if (i === 1) {
            const d = new Date((row[prop] - (25567 + 1)) * 86400 * 1000);
            newTraining.date = moment(d).format('DD/MM/YYYY');
          } else if (i === 2) {
            const d = new Date((row[prop] - (25567 + 1)) * 86400 * 1000);
            newTraining.date += ' - ' + moment(d).format('DD/MM/YYYY');
          } else if (i === 3) {
            newTraining.technology = row[prop];
          } else if (i === 4) {
            newTraining.categoryType = row[prop];
          } else if (i === 5) {
            newTraining.nrMin = row[prop];
          } else if (i === 6) {
            newTraining.nrMax = row[prop];
          } else if (i === 7) {
            newTraining.trainingResponsible = new UserDto();
            newTraining.trainingResponsible.userType = 'USER';
            newTraining.trainingResponsible.mail = row[prop];
          } else if (i === 8) {
            newTraining.vendor = row[prop];
          }
          i++;
        }
        this.userService.newTrainingsList.push(newTraining);
      });
      this.userService.insertNewTrainings().subscribe(result => {
        this.userService.closeDialog.emit(true);
      },
      error => {
      });
    };
    fileReader.readAsArrayBuffer(this.file);
  }
}


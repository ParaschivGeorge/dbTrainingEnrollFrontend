import { Component, OnInit } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AddTrainingsComponent} from './add-trainings/add-trainings.component';
import {AddTrainingFormComponent} from "./add-training-form/add-training-form.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  arrayBuffer:any;
  fileToUpload:File;
  // file: File = null;
  file:File;
  adminAddForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(AddTrainingsComponent, {
    });
  }

  openTrainingForm(){
    const dialogRef = this.dialog.open(AddTrainingFormComponent, {
    });
  }

  ngOnInit() {
    this.adminAddForm = new FormGroup({
      'excelInput': new FormControl(null)
    });
  }

  // handleFileInput(files: FileList) {
    // let reader = new FileReader();
    // if(files && files.length > 0) {
    //   this.file = files[0];
    //   console.log(this.file);
    //   reader.
    //   reader.readAsDataURL(this.file);
    //   reader.onload = () => {
    //     this.adminAddForm.get('excelInput').setValue(this.file)
    //   };
    // }

    // if(files && files.length > 0) {
    //   this.file = files[0];
    //   let fileReader = new FileReader();
    //
    //   fileReader.onload = (e) => {
    //
    //     this.arrayBuffer = fileReader.result;
    //     var data = new Uint8Array(this.arrayBuffer);
    //     var arr = new Array();
    //     for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    //     var bstr = arr.join("");
    //     var workbook = XLSX.read(bstr, {type:"binary"});
    //     var first_sheet_name = workbook.SheetNames[0];
    //     var worksheet = workbook.Sheets[first_sheet_name];
    //     this.adminAddForm.get('excelInput').setValue(this.file);;
    //
    //     console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
    // }
    //
    // fileReader.readAsArrayBuffer(this.file);
    //
  // }
  // }

  incomingfile(event)
  {
    this.file= event.target.files[0];
  }

  onSubmit() {
    // console.log(this.adminAddForm);
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = [];
      for(let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      const bstr = arr.join("");
      const workbook = XLSX.read(bstr, {type: "binary"});
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
    };
    fileReader.readAsArrayBuffer(this.file);
  }
}

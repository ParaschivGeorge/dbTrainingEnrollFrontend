import {UploadFile} from "ngx-uploader";

export class UploadInput {
  type: 'uploadAll' | 'uploadFile' | 'cancel' | 'cancelAll' | 'remove' | 'removeAll';
  url?: string; // URL to upload file to
  method?: string; // method (POST | PUT)
  id?: string; // unique id of uploaded file
  fieldName?: string; // field name (default 'file')
  fileIndex?: number; // fileIndex in internal ngx-uploader array of files
  file?: UploadFile; // uploading file
  data?: { [key: string]: string | Blob }; // custom data sent with the file
  headers?: { [key: string]: string }; // custom headers
  concurrency?: number; // concurrency of how many files can be uploaded in parallel (default is 0 which means unlimited)
  withCredentials?: boolean; // apply withCredentials option
}

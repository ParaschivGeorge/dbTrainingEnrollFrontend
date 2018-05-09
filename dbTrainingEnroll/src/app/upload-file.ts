import {UploadProgress} from "./upload-progress";

export class UploadFile {
  id: string; // unique id of uploaded file instance
  fileIndex: number; // fileIndex in internal ngx-uploader array of files
  lastModifiedDate: Date; // last modify date of the file (Date object)
  name: string; // original name of the file
  size: number; // size of the file in bytes
  type: string; // mime type of the file
  form: FormData; // FormData object (you can append extra data per file, to this object)
  progress: UploadProgress;
  response?: any; // response when upload is done (parsed JSON or string)
  responseStatus?: number; // response status code when upload is done
  responseHeaders?: { [key: string]: string };
}// response headers when upload is done}

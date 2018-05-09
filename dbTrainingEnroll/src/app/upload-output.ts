import {UploadFile} from "ngx-uploader";

export class UploadOutput {
  type: 'addedToQueue' | 'allAddedToQueue' | 'uploading' | 'done' | 'removed' | 'start' | 'cancelled' | 'dragOver' | 'dragOut' | 'drop';
  file?: UploadFile;
  nativeFile?: File; // native javascript File object, can be used to process uploaded files in other libraries
}

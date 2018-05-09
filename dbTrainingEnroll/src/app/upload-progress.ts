import {UploadStatus} from 'ngx-uploader';

export class UploadProgress {
  status: UploadStatus; // current status of upload for specific file (Queue | Uploading | Done | Canceled)
  data?: {
    percentage: number; // percentage of upload already completed
    speed: number; // current upload speed per second in bytes
    speedHuman: string; // current upload speed per second in human readable form,
    eta: number; // estimated time remaining in seconds
    etaHuman: string; // estimated time remaining in human readable format
  };
}

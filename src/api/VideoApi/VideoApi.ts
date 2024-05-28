import { instance } from '@src/api/base';
import {VideoProcessResult} from "@src/api/VideoApi/models";

export class VideoApi {
  static processVideo(formData: FormData) {
    return instance.post<VideoProcessResult>('/process', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}

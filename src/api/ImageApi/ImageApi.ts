import { instance } from '@src/api/base';
import {ImageProcessResult, ImageUploadResult} from '@src/api/ImageApi/models';

export class ImageApi {
  static uploadImage(formData: FormData) {
    return instance.post<ImageUploadResult>('/images/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  static fetchCmykImage(formData: FormData) {
    return instance.post<ImageUploadResult>('/images/cmyk', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  static processImage(formData: FormData) {
    return instance.post<ImageProcessResult>('/images/process', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}

import { instance } from '@src/api/base';
import { ImageUploadResult } from '@src/api/ImageApi/models';

export class ImageApi {
  static uploadImage(formData: FormData) {
    return instance.post<ImageUploadResult>('/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  static fetchCmykImage(formData: FormData) {
    return instance.post<ImageUploadResult>('/cmyk', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}

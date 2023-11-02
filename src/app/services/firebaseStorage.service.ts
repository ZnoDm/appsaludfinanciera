import { Injectable, inject } from '@angular/core';
import { ref, uploadBytesResumable, getDownloadURL, FirebaseStorage } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  storage: FirebaseStorage;

  constructor( ) { }

  async uploadToStorage(path: string, input: HTMLInputElement, contentType: any) {
    if (!input.files) return  null
      const  files: FileList = input.files;
            for (let  i = 0; i  <  files.length; i++) {
                    const  file = files.item(i);
                    if (file) {
                            const  imagePath = `${path}/${file.name}`
                            const  storageRef = ref(this.storage, imagePath);
                            await  uploadBytesResumable(storageRef, file);
                            return  await  getDownloadURL(storageRef);
                    }
            }
    return  null;
  }

}


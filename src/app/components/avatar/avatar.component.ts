import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize } from 'rxjs';
import { PersonService } from 'src/app/services/person/person.service';


@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  @ViewChild('fileInput') fileInput: ElementRef;
  uploadPercent: Observable<number>;

  constructor(
    private storage: AngularFireStorage,
    private personService : PersonService
  ) {
  }
  onUploadFile(){
  // Obtén el elemento del archivo
  const fileInputElement = this.fileInput.nativeElement;

  // Haz clic en el elemento del archivo
  fileInputElement.click();
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const filePath = `tesis/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(async () => {
          let downloadURL = await fileRef.getDownloadURL().toPromise();
          this.updateAvatar(downloadURL);
        } )
     )
    .subscribe()
  }
  updateAvatar(url:string){
    this.personService.updateAvatar({urlAvatar: url}).subscribe(
			(data:any)=>{
				console.log(data);
			}, (error)=>{
				console.log(error);
			}
		);
  }

}


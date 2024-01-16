import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize } from 'rxjs';
import { Person, Usuario } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PersonService } from 'src/app/services/person/person.service';
import { ToastrService } from 'src/app/services/toastr.service';


@Component({
  selector: 'app-avatar-edit',
  templateUrl: './avatar-edit.component.html',
  styleUrls: ['./avatar-edit.component.scss']
})
export class AvatarEditComponent implements OnInit{

  @ViewChild('fileInput') fileInput: ElementRef;
  @Input() urlImagen: string = null;
  uploadPercent: Observable<number>;


  user : any =null;


  defaultUrlAvatar:string = './assets/avatars/av-1.png';

  constructor(
    private storage: AngularFireStorage,
    private personService : PersonService,
    private authService: AuthService,
    private toastr: ToastrService,
    private chgRef: ChangeDetectorRef
  ) {
    // this.user = this.authService.currentUserValue;
  }

  ngOnInit(): void {

  }


  onUploadFile(){
    const fileInputElement = this.fileInput.nativeElement;
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
          console.log(downloadURL);
          this.updateAvatar(downloadURL);
        } )
     )
    .subscribe()
  }
  async updateAvatar(url:string){
    console.log('updateAvata')
    const personService =  await this.personService.updateAvatar({urlAvatar: url});
    personService.subscribe({
      next: (resp : any) => {
        this.urlImagen = url;
        console.log(resp);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}


import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize } from 'rxjs';
import { Person, Usuario } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PersonService } from 'src/app/services/person/person.service';
import { ToastrService } from 'src/app/services/toastr.service';


@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit{
  @ViewChild('fileInput') fileInput: ElementRef;
  uploadPercent: Observable<number>;


  user : Usuario =null;
  person : Person = null;


  defaultUrlAvatar:string = './assets/avatars/av-1.png';

  constructor(
    private storage: AngularFireStorage,
    private personService : PersonService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUsuario();
    this.getPerson()
  }

  getPerson(){
    this.personService.getPerson().subscribe({
      next: (resp : any) => {
        if(resp.ok){
          console.log(resp);
          this.person = resp.person
        }else{
          this.toastr.alertaInformativa(resp.message || resp);
        }
      },
      error: (error) => {
        this.toastr.alertaInformativa(error?.error?.message || error?.message);
        console.log(error);
      }
    });
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
  updateAvatar(url:string){
    console.log('updateAvata')
    this.personService.updateAvatar({urlAvatar: url}).subscribe({
      next: (resp : any) => {
        this.person.urlAvatar = url;
        console.log(resp);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}


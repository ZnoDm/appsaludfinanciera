import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, finalize } from 'rxjs';
import { PersonService } from '../../../../services/person/person.service';
import { ToastrService } from 'src/app/services/toastr.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  @Input() urlImagen: string = null;

  defaultUrlAvatar:string = './assets/avatars/av-1.png';
  @ViewChild('fileInput') fileInput: ElementRef;
  uploadPercent: Observable<number>;

  personForm: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(
    private storage: AngularFireStorage,
    private fb: FormBuilder,
    private personService:PersonService,
    private toastr: ToastrService,
    private chgRef: ChangeDetectorRef,
    private toastrService: ToastrService,
    private authService:AuthService,
    private modalController: ModalController,
    private loadingController: LoadingController
  ) {
    this.isLoading$ = this.personService.isLoading$;
  }

  ngOnInit() {
    this.showLoading(1000)
    this.personFormInit();
    this.getDatosPersonales();
  }

  personFormInit(){
    this.personForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required],
      tipoDocumentoIdentidad: ['', Validators.required],
      documentoIdentidad: ['', Validators.required],
    });
  }

  async getDatosPersonales() {
    const getDatosPersonales = await this.personService.getDatosPersonales();

    getDatosPersonales.subscribe({
      next: async (resp: any) => {
        if (resp.ok) {
          console.log(resp.person);
          this.personForm.patchValue(resp.person);
          this.chgRef.markForCheck();
        } else {
          this.toastr.alertaInformativa(resp.message || resp);
        }
      },
      error: async (error) => {
        this.toastr.alertaInformativa(error?.error?.message || error?.message);
        console.log(error);
      },
    });

  }

  onUploadFile(){
    const fileInputElement = this.fileInput.nativeElement;
    fileInputElement.click();
  }

  onFileSelected(event: any) {

    this.personService.isLoadingSubject.next(true);
    const file = event.target.files[0];
    if (file) {
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
            this.personService.isLoadingSubject.next(false);
          } )
      )
      .subscribe()
    }
    else{
      this.personService.isLoadingSubject.next(false);
    }
  }

  async updateAvatar(url:string){
    const personService =  await this.personService.updateAvatar({urlAvatar: url});
    personService.subscribe({
      next: async (resp : any) => {
        this.urlImagen = url;
        await this.authService.setCurrentUserValue(resp.user);
        console.log(resp);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  private prepareModel(){
    const formData = this.personForm.value;
    return {
			nombres:         formData.nombres,
			apellidos:    formData.apellidos,
			telefono:     formData.telefono,
			tipoDocumentoIdentidad:  formData.tipoDocumentoIdentidad,
			documentoIdentidad: formData.documentoIdentidad,
    }
  }
  // Puedes usar esta función para enviar el formulario
  async onSubmit() {
    const controls = this.personForm.controls;
    if ( this.personForm.invalid ) {
      Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
      this.toastrService.alertaInformativa('Formulario Inválido');
      return;
    }
    const model = this.prepareModel()
    const updatePerson = await this.personService.updatePerson(model);

    updatePerson.subscribe({
      next: async (resp: any) => {
        console.log(resp);
        if (resp.ok) {
          console.log(resp);
          await this.authService.setCurrentUserValue(resp.user);
          this.modalController.dismiss(resp);
        } else {
          this.toastrService.alertaInformativa(resp.message || resp);
        }
        this.chgRef.markForCheck();
      },
      error: async (error) => {
        this.toastrService.alertaInformativa(error?.error?.message || error?.message);
        console.log(error);
      },
    });
  }

  async showLoading(duracion) {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: duracion,
    });

    loading.present();
  }

  cerrarModal(){
    this.modalController.dismiss(null);
  }
}

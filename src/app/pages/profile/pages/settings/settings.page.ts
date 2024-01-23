import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PersonService } from '../../../../services/person/person.service';
import { ToastrService } from 'src/app/services/toastr.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  @Input() urlAvatar :  any = null;
  personForm: FormGroup;

  isLoading$: Observable<boolean>;

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
  constructor(
    private fb: FormBuilder,
    private personService:PersonService,
    private toastr: ToastrService,
    private chgRef: ChangeDetectorRef,
    private toastrService: ToastrService,
    private router: Router,
    private authService:AuthService,
    private modalController: ModalController,
    private loadingController: LoadingController
  ) {
    this.isLoading$ = this.personService.isLoading$;
  }

  ngOnInit() {
    this.showLoading()
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

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 500,
    });

    loading.present();
  }

  cerrarModal(){
    this.modalController.dismiss(null);
  }
}

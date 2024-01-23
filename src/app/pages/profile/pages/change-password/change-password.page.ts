import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PersonService } from 'src/app/services/person/person.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  passwordForm: FormGroup;

  isLoading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private personService:PersonService,
    private toastr: ToastrService,
    private chgRef: ChangeDetectorRef,
    private toastrService: ToastrService,
    private router: Router,
    private authService:AuthService,
    private modalController: ModalController,
  ) {
    this.isLoading$ = this.personService.isLoading$;
  }


  ngOnInit() {

    this.passwordFormInit()

  }

  passwordFormInit(){
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required], // Campo de contraseña
      password: ['', Validators.required], // Campo de contraseña
      confirmPassword: ['', Validators.required], // Campo de confirmación de contraseña
    }, {
      validator: this.passwordMatchValidator // Agrega la validación personalizada
    });
  }

  // Función de validación personalizada para asegurarse de que las contraseñas coincidan
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    // Verifica si las contraseñas coinciden
    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }

  private prepareModel(){
    const formData = this.passwordForm.value;
    return {
      oldPassword: formData.oldPassword,
      newPassword:  formData.password,
      confirmPassword: formData.confirmPassword,
    }
  }
  // Puedes usar esta función para enviar el formulario
  async onSubmit() {
    const controls = this.passwordForm.controls;
    if ( this.passwordForm.invalid ) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      this.toastrService.alertaInformativa('Formulario Inválido');
      return;
    }
    const model = this.prepareModel()
    const updatePassword = await this.personService.updatePassword(model);

    updatePassword.subscribe({
      next: async (resp: any) => {
        console.log(resp);
        if (resp.ok) {
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
  cerrarModal(){
    this.modalController.dismiss(null);
  }
}

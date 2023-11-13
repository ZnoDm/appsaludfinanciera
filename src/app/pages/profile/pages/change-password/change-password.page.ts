import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Crea el formulario con los campos correspondientes, incluyendo contraseña y confirmación de contraseña
    this.userForm = this.fb.group({
      password: ['', Validators.required], // Campo de contraseña
      confirmPassword: ['', Validators.required], // Campo de confirmación de contraseña
    }, {
      validator: this.passwordMatchValidator // Agrega la validación personalizada
    });

    // Llama al servicio para obtener los datos del usuario y actualiza el formulario


  }

  // Función de validación personalizada para asegurarse de que las contraseñas coincidan
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    // Verifica si las contraseñas coinciden
    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }

 // Puedes usar esta función para enviar el formulario
 onSubmit() {
  if (this.userForm.valid) {
    // Aquí puedes enviar los datos a tu backend
    console.log(this.userForm.value);
  } else {
    // El formulario no es válido, puedes manejarlo según tus necesidades
  }
}
}

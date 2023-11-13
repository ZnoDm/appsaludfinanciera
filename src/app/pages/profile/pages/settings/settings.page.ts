import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  personForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    // Crea el formulario con los campos correspondientes
    this.personForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required],
      tipoDocumentoIdentidad: ['', Validators.required],
      documentoIdentidad: ['', Validators.required],
    });

    /*
    // Llama al servicio para obtener los datos del usuario y actualiza el formulario
    this.userService.getUserData().subscribe(
      (userData) => {
        // Actualiza el formulario con los datos obtenidos
        this.userForm.patchValue(userData);
      },
      (error) => {
        // Manejar el error según tus necesidades
        console.error('Error al obtener datos del usuario:', error);
      }
    ); */
  }

  // Puedes usar esta función para enviar el formulario
  onSubmit() {
    if (this.personForm.valid) {
      // Aquí puedes enviar los datos a tu backend
      console.log(this.personForm.value);
    } else {
      // El formulario no es válido, puedes manejarlo según tus necesidades
    }
  }
}

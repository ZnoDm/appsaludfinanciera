import { Component } from '@angular/core';
import { Observable, finalize } from 'rxjs';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
 /*  imagenSeleccionada: File | null = null;
  tareaSubida: AngularFireUploadTask;
  porcentajeSubida: Observable<number>;
  urlImagen: Observable<string>;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFireDatabase
  ) {}

  seleccionarImagen(event: any) {
    this.imagenSeleccionada = event.target.files[0];
  }

  subirImagen() {
    if (this.imagenSeleccionada) {
      const ruta = `imagenes/${new Date().getTime()}_${this.imagenSeleccionada.name}`;
      this.tareaSubida = this.storage.upload(ruta, this.imagenSeleccionada);
      this.porcentajeSubida = this.tareaSubida.percentageChanges();
      this.tareaSubida.snapshotChanges().pipe(
        finalize(() => {
          this.urlImagen = this.storage.ref(ruta).getDownloadURL();
          this.urlImagen.subscribe((url) => {
            // Aquí puedes guardar la URL de la imagen en Firebase Database o Firestore
            this.db.list('imagenes').push(url);
          });
        })
      )
      .subscribe();
    }
  }
} */
}

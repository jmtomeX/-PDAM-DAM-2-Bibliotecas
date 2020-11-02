import { Component } from '@angular/core';
import { from } from 'rxjs';

// cámara
import { Plugins, CameraResultType } from '@capacitor/core';
import { DomSanitizer } from '@angular/platform-browser';
// desestructuramos la cámara
const { Camera } = Plugins;
@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage {
  public imagen;
  constructor(public domSanitizer: DomSanitizer) { }

  sacarFoto() {
    const image = Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    }).then((imagen) => {
      const imageUrl = imagen.webPath;
      console.log(imageUrl);
      // Ahora se puede configurar el src de una imagen
      this.imagen = imageUrl;
    }).catch((error) => {
      console.log(error);
    });
    // image.webPath contendrá una ruta que se puede establecer como imagen src.
    // Puede acceder al archivo original usando image.path, que puede ser
    // pasado a la API del sistema de archivos para leer los datos sin procesar  la imagen,
    // si lo desea (o pase resultType: CameraResultType.Base64 a getPhoto)
  }
}

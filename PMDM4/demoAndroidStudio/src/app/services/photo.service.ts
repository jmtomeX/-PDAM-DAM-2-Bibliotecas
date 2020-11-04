import { Injectable } from '@angular/core';
// cámara
import { Plugins, CameraResultType } from '@capacitor/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Photo } from '../model/photo';
// desestructuramos la cámara
const { Camera } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Photo[] = [];
  public imagen;
  constructor(
    public domSanitizer: DomSanitizer,
  ) { }


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
      // Añadir nueva foto a la galería
      this.photos.unshift({
        // data: 'data:image/jpeg;base64,' + imagen.webPath,
        data:  this.domSanitizer.bypassSecurityTrustUrl(imagen.webPath),
      });
    }).catch((error) => {
      console.log(error);
    });
    // image.webPath contendrá una ruta que se puede establecer como imagen src.
    // Puede acceder al archivo original usando image.path, que puede ser
    // pasado a la API del sistema de archivos para leer los datos sin procesar  la imagen,
    // si lo desea (o pase resultType: CameraResultType.Base64 a getPhoto)
  }
}

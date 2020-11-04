import { Component, OnInit } from '@angular/core';

import { PhotoService } from '../../services/photo.service';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
  }

}

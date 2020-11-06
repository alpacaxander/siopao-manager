import { Component, OnInit } from '@angular/core'
import { ImageService } from '../../services/image.service'

@Component({
             selector: 'app-image',
             templateUrl: './image.component.html',
             styleUrls: ['./image.component.scss'],
           })
export class ImageComponent implements OnInit {

  file: File

  constructor (private imageService: ImageService) {
  }

  ngOnInit (): void {
  }

  fileChanged (event): void {
    this.file = event.target.files[0]
    console.log(this.file)
  }

  commit (): void {
    this.imageService.create(this.file)
  }

}

import { Component, OnInit } from '@angular/core'
import { ImageService } from '../../../services/image.service'

@Component({
             selector: 'app-image-upload',
             templateUrl: './image-upload.component.html',
             styleUrls: ['./image-upload.component.scss'],
           })
export class ImageUploadComponent implements OnInit {

  files: File[]

  data: string | ArrayBuffer

  constructor(private imageService: ImageService) { }

  ngOnInit(): void { }

  fileChanged(event): void {
    this.files = event.target.files
  }

  commit(): void {
    this.imageService.new.files$(this.files)
  }

}

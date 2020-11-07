import { Component, OnInit } from '@angular/core'
import { ImageService } from '../../../services/image.service'

@Component({
             selector: 'app-image-upload',
             templateUrl: './image-upload.component.html',
             styleUrls: ['./image-upload.component.scss'],
           })
export class ImageUploadComponent implements OnInit {

  file: File

  data: string | ArrayBuffer

  constructor(private imageService: ImageService) { }

  ngOnInit(): void { }

  fileChanged(event): void {
    this.file = event.target.files[0]
    console.log(this.file)
  }

  commit(): void {
    this.imageService.create(this.file)
    //
    // const reader = new FileReader()
    // reader.readAsDataURL(this.file)
    // reader.onload = () => {
    //   this.data = reader.result;
    //   console.log(this.data)
    // }
  }

}

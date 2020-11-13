import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ImageService } from '../../../services/image.service'

@Component({
             selector: 'app-image-upload',
             templateUrl: './image-upload.component.html',
             styleUrls: ['./image-upload.component.scss'],
           })
export class ImageUploadComponent implements OnInit {

  filesValue: File[]

  @Output() filesChange: EventEmitter<File[]> = new EventEmitter<File[]>()
  data: string | ArrayBuffer

  constructor(private imageService: ImageService) { }

  @Input() get files(): File[] {
    return this.filesValue
  }

  set files(val) {
    this.filesValue = val
    this.filesChange.emit(val)
  }

  ngOnInit(): void { }

  fileChanged(event): void {
    this.files = event.target.files
  }

}

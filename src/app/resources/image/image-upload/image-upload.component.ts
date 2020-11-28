import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
             selector: 'app-image-upload',
             templateUrl: './image-upload.component.html',
             styleUrls: ['./image-upload.component.scss'],
           })
export class ImageUploadComponent implements OnInit {

  // filesValue: any[]
  //
  // @Output() filesChange: EventEmitter<File[]> = new EventEmitter<File[]>()
  //
  // @Input() get files(): any[] {
  //   return this.filesValue === null ? [] : this.filesValue
  // }
  //
  // set files(val) {
  //   this.filesValue = val
  //   this.filesChange.emit(val)
  // }

  bundlesValue: File[][]

  @Output() bundlesChange: EventEmitter<File[][]> = new EventEmitter<File[][]>()

  @Input() get bundles(): File[][] {
    return this.bundlesValue === null ? [] : this.bundlesValue
  }

  set bundles(val) {
    this.bundlesValue = val
    this.bundlesChange.emit(val)
  }
  constructor() { }

  ngOnInit(): void {
  }

  bundleEvent($event) {
    console.log($event)
    this.bundles.push($event)
  }

}

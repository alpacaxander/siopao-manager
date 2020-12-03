import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Image } from '../image'
import { from, Observable } from 'rxjs'
import { combineAll } from 'rxjs/operators'

@Component({
             selector: 'app-image-upload',
             templateUrl: './image-upload.component.html',
             styleUrls: ['./image-upload.component.scss'],
           })
export class ImageUploadComponent implements OnInit {

  bundlesValue: Image[][]

  @Output() bundlesChange: EventEmitter<Image[][]> = new EventEmitter<Image[][]>()

  @Input() get bundles(): Image[][] {
    return this.bundlesValue === null ? [] : this.bundlesValue
  }

  set bundles(val) {
    this.bundlesValue = val
    this.bundlesChange.emit(val)
  }
  constructor() { }

  ngOnInit(): void {
  }

  filesUploaded(files: any[]): void {
    console.log(this.bundles)
    console.log(files)
    const observables: Observable<Image>[] = []
    for (let _i = 0; _i < files.length; _i++) {
      const file = files[_i]
      const observable = new Observable<Image>(
        subscriber => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            subscriber.next(
              {
                type: 'image',
                id: undefined,
                attributes: {
                  index: _i,
                  name: file.name,
                  // @ts-ignore
                  data: reader.result
                }
              }
            )
            subscriber.complete()
          }
        }
      )
      observables.push(observable)
    }
    from(observables)
    .pipe(
      combineAll()
    ).subscribe(
      (images: Image[]) => {
        this.bundles.push(images)
      }
    )
  }

  delete(i: number): void {
    this.bundles.splice(i, 1)
  }

}

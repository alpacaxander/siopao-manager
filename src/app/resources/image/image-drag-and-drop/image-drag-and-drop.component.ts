import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Image } from '../image'
import { from, Observable, Subject } from 'rxjs'
import { combineAll } from 'rxjs/operators'

@Component({
             selector: 'app-image-drag-and-drop',
             templateUrl: './image-drag-and-drop.component.html',
             styleUrls: ['./image-drag-and-drop.component.scss'],
           })
export class ImageDragAndDropComponent implements OnInit {

  @Output() bundleEmitter = new EventEmitter<Image[]>()

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  filesUploaded(files: any[]) {
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
        this.bundleEmitter.emit(images)
      }
    )
  }
}

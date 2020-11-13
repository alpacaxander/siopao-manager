import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Image } from '../resources/image/image'
import { BehaviorSubject, Subject } from 'rxjs'
import { Document } from './json-api-types/document'
import { DocumentData } from '../operators/DocumentData'

@Injectable({
              providedIn: 'root',
            })
export class ImageService {

  images$: BehaviorSubject<Image[]>
  new = {
    file$: (file: File): Subject<Image> => {
      const subject = new Subject<Image>()
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.http.post<Document<Image>>(
          'http://localhost:8081/api/v1/file',
          {
            data: {
              type: 'file',
              attributes: {
                name: file.name,
                data: reader.result,
              },
            },
          },
          {
            headers: {
              'Content-Type': 'application/vnd.api+json',
            },
          },
        ).pipe(
          DocumentData(),
        ).subscribe(
          (image: Image) => {
            this._updateImages()
            subject.next(image)
          },
        )
      }
      return subject
    },
    files$: (files: File[]): Subject<Image>[] => {
      const subjects: Subject<Image>[] = []
      for (const file of files) {
        subjects.push(this.new.file$(file))
      }
      return subjects
    },
  }

  constructor(private http: HttpClient) {
    this.images$ = new BehaviorSubject<Image[]>([])
    this._updateImages()
  }

  private _updateImages(): void {
    this.http.get(
      'http://localhost:8081/api/v1/file',
    ).pipe(
      DocumentData(),
    ).toPromise().then(
      (images: Image[]) => {
        this.images$.next(images)
      },
    )
  }

}

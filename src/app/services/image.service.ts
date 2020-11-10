import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Image } from '../resources/image/image'
import { BehaviorSubject, Subject } from 'rxjs'
import { map } from 'rxjs/operators'

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
        this.http.post(
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
        ).subscribe(
          (data: { data: Image }) => {
            this._updateImages()
            subject.next(data.data)
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
      map((response: { data: Image[] }) => response.data),
    ).toPromise().then(
      (images: Image[]) => {
        this.images$.next(images)
      },
    )
  }

}

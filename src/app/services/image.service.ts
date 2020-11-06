import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
              providedIn: 'root',
            })
export class ImageService {

  constructor (private http: HttpClient) {
  }

  create (file: File): void {
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
      ).subscribe(console.log)
    }
  }
}

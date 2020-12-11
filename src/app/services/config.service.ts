import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _properties: any

  get properties(): any {
    return this._properties
  }

  constructor(private http: HttpClient) {
  }

  loadConfig() {
    return this.http.get(
      '/config/properties.json'
    ).toPromise().then(
      properties => {
        this._properties = properties
      }
    )
  }

}

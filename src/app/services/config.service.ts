import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _properties: properties

  get properties(): properties {
    return this._properties
  }

  constructor(private http: HttpClient) {
  }

  loadConfig() {
    return this.http.get<properties>(
      '/config/properties.json'
    ).toPromise().then(
      properties => {
        this._properties = properties
      }
    )
  }
}

export interface properties {
  INVENTORY_URL: string
}

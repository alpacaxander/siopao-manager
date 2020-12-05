import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Product } from '../resources/product/product'
import { DocumentData } from '../operators/DocumentData'
import { Document } from './json-api-types/document'
import { Image } from '../resources/image/image'
import { PrimaryData } from './json-api-types/primary-data'
import { Coin } from '../resources/coin/coin'
import { Observable, of } from 'rxjs'
import { concatAll, map } from 'rxjs/operators'

@Injectable({
              providedIn: 'root',
            })
export class InventoryService {

  constructor(private http: HttpClient) {
  }

  public products$(): Promise<Product[]> {
    return this.http.get<Document<Product[]>>(
      'http://localhost:8080/api/v1/product',
    ).pipe(DocumentData()).toPromise()
  }

  public create(data: PrimaryData): Promise<PrimaryData> {
    if (data.type === 'product') {
      const product = data as Product
      return this.http.post<Product>(
        'http://localhost:8080/api/v1/product',
        {
          data: product,
        },
        {headers: {'Content-Type': 'application/vnd.api+json'}},
      ).toPromise()
    } else if (data.type === 'coin') {
      const coin = data as Coin
      return this.http.post<Document<Coin>>(
        coin.relationships.product.data.relationships.coins.links.related,
        {
          data: {
            type: 'coin',
            id: '',
            attributes: coin.attributes
          }
        },
        {headers: {'Content-Type': 'application/vnd.api+json'}},
      ).pipe(DocumentData()).toPromise()
    } else if (data.type === 'image') {
      const image = data as Image
      return this.http.post<string>(
        'http://localhost:8081/file/',
        image.attributes.data,
      ).pipe(
        map(
          (id: string): Observable<Image> => {
            image.id = id
            image.attributes.data = undefined
            return this.http.post<Document<Image>>(
              image.relationships.coin.data.relationships.images.links.related,
              {
                data: image,
              },
              {
                headers: {
                  'Content-Type': 'application/vnd.api+json',
                },
              },
            ).pipe(
              DocumentData(),
              map(
                (nestedImage: Image) => {
                  nestedImage.relationships.coin.data = image.relationships.coin.data
                  return nestedImage
                },
              ),
            )
          },
        ),
        concatAll(),
      ).toPromise()
    } else {
      return null
    }
  }

  public read<T>(url: string): Promise<T> {
    return this.http.get<Document<T>>(url).pipe(DocumentData()).toPromise()
  }

  public delete(url: string): Promise<void> {
    return this.http.delete<void>(url).toPromise()
  }
}

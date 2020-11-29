import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs'
import { concatAll, map } from 'rxjs/operators'
import { Product } from '../resources/product/product'
import { Coin } from '../resources/coin/coin'
import { DocumentData } from '../operators/DocumentData'
import { Document } from './json-api-types/document'
import { Image } from '../resources/image/image'

@Injectable({
              providedIn: 'root',
            })
export class InventoryService {

  // This is definitely a weird way to do it but it is <i>fun</i>
  public product = (product: Product) => {
    return {
      product: product,
      create$: (): Subject<Product> => {
        const subject = new Subject<Product>()
        this.http.post<Document<Product>>(
          'http://localhost:8080/api/v1/product',
          {
            data: product,
          },
          {
            headers: {
              'Content-Type': 'application/vnd.api+json',
            },
          },
        ).pipe(
          DocumentData(),
        ).subscribe((product: Product) => {
          subject.next(product)
        })
        return subject
      },
      read$: (): Observable<Product[]> => {
        return this.http.get<Document<Product[]>>(
          'http://localhost:8080/api/v1/product',
        ).pipe(
          DocumentData(),
        )
      },
      delete$: (): void => {
        this.http.delete(
          'http://localhost:8080/api/v1/product/' + product.id,
        ).subscribe()
      },
      coins: (coin: Coin) => {
        return {
          coin: coin,
          create$: (): Promise<Coin> => {
            const subject = new Subject<Coin>()
            return this.http.post<Document<Coin>>(
              'http://localhost:8080/api/v1/product/' + product.id + '/coins',
              {
                data: coin,
              },
              {
                headers: {
                  'Content-Type': 'application/vnd.api+json',
                },
              },
            ).pipe(
              DocumentData(),
            ).toPromise()
          },
          read$: (): Observable<Coin[]> => {
            return this.http.get<Document<Coin[]>>(
              'http://localhost:8080/api/v1/product/' + product.id + '/coins',
            ).pipe(
              DocumentData(),
            )
          },
          delete$: (): void => {
            this.http.delete(
              'http://localhost:8080/api/v1/product/' + product.id + '/coins/' + coin.id,
            ).subscribe()
          },
          image: (image: Image) => {
            return {
              image: image,
              create$: (): Promise<Image> => {
                return this.http.post<string>(
                  "http://localhost:8081/file/",
                  image.attributes.data
                ).pipe(
                  map(
                    (id: string): Observable<Image> => {
                      image.id = id
                      image.attributes.data = undefined
                      return this.http.post<Document<Image>>(
                        'http://localhost:8080/api/v1/product/' + product.id + '/coins/' + coin.id + "/images",
                        {
                          data: image
                        },
                        {
                          headers: {
                            'Content-Type': 'application/vnd.api+json',
                          },
                        },
                      ).pipe(
                        DocumentData(),
                      )
                    }
                  ),
                  concatAll(),
                ).toPromise()
              }
            }
          }
        }
      }
    }
  }

  constructor(private http: HttpClient) {
  }
}

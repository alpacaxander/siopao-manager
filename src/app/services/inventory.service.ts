import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { concat, from, observable, Observable, Subject } from 'rxjs'
import { combineAll, concatAll, map, mergeAll } from 'rxjs/operators'
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
  public product = {
    create$: (product: Product): Promise<Product> => {
      const subject = new Subject<Product>()
      return this.http.post<Document<Product>>(
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
      ).toPromise()
    },
    read$: (): Observable<Product[]> => {
      return this.http.get<Document<Product[]>>(
        'http://localhost:8080/api/v1/product',
      ).pipe(
        DocumentData(),
      )
    },
    delete$: (product: Product): void => {
      this.http.delete(
        'http://localhost:8080/api/v1/product/' + product.id,
      ).toPromise().then()
    },
    coins$: (product: Product): Promise<Coin[]> => {
      return this.http.get<Document<Coin[]>>(
        'http://localhost:8080/api/v1/product/' + product.id + '/coins',
      ).pipe(
        DocumentData(),
        map(
          (coins: Coin[]) => {
            for (const coin of coins) {
              coin.relationships.product.data = product
            }
            return coins
          }
        ),
      ).toPromise()
    }
  }
  public coins = {
    create$: (coin: Coin): Promise<Coin> => {
      return this.http.post<Document<Coin>>(
        'http://localhost:8080/api/v1/product/' + coin.relationships.product.data.id + '/coins',
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
        map(
          (nestedCoin: Coin) => {

            nestedCoin.relationships.product.data = coin.relationships.product.data
            console.log('asdfasdf')
            console.log(nestedCoin)
            return nestedCoin
          }
        ),
      ).toPromise()
    },
    delete$: (coin: Coin): void => {
      this.http.delete(
        'http://localhost:8080/api/v1/product/' + coin.relationships.product.data.id + '/coins/' + coin.id,
      ).toPromise().then()
    },
    images$: (coin: Coin): Promise<Image[]> => {
      return this.http.get<Document<Image[]>>(
        'http://localhost:8080/api/v1/product/' + coin.relationships.product.data.id + '/coins/' + coin.id + '/images',
      ).pipe(
        DocumentData(),
        map(
          (images: Image[]) => {
            const observables: Observable<Image>[] = []
            for (const image of images) {
              observables.push(
                this.http.get(
                  'http://localhost:8081/file/' + image.id,
                  {responseType: 'text'}
                ).pipe(
                  map(
                    (data: string) => {
                      image.attributes.data = data
                      image.relationships.coin.data = coin
                      return image
                    }
                  )
                )
              )
            }
            return from(observables).pipe(combineAll())
          }
        ),
        concatAll()
      ).toPromise()
    },
  }
  public image = {
    create$: (image: Image): Promise<Image> => {
      return this.http.post<string>(
        "http://localhost:8081/file/",
        image.attributes.data
      ).pipe(
        map(
          (id: string): Observable<Image> => {
            image.id = id
            image.attributes.data = undefined
            console.log(image)
            return this.http.post<Document<Image>>(
              'http://localhost:8080/api/v1/product/' + image.relationships.coin.data.relationships.product.data.id + '/coins/' + image.relationships.coin.data.id + '/images',
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
              map(
                (nestedImage: Image) => {
                  nestedImage.relationships.coin.data = image.relationships.coin.data
                  return nestedImage
                }
              ),
            )
          }
        ),
        concatAll(),
      ).toPromise()
    },
  }

  constructor(private http: HttpClient) {
  }
}

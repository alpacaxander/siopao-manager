import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { Product } from '../resources/product/product'
import { Coin } from '../resources/coin/coin'
import { DocumentData } from '../operators/DocumentData'
import { Document } from './json-api-types/document'

@Injectable({
              providedIn: 'root',
            })
export class InventoryService {

  public products$: Subject<Product[]> = new BehaviorSubject<Product[]>([])
  public coins$ = (product: Product): Observable<Coin[]> => {
    return this.http.get<Document<Coin[]>>(
      'http://localhost:8080/api/v1/product/' + product.id + '/coins',
    ).pipe(
      DocumentData(),
    )
  }

  public delete = {
    product$: (product: Product): void => {
      this.http.delete(
        'http://localhost:8080/api/v1/product/' + product.id,
      ).subscribe(() => {this._updateProducts()})
    },
    coin$: (product: Product, coin: Coin): void => {
      this.http.delete(
        'http://localhost:8080/api/v1/product/' + product.id + '/coins/' + coin.id,
      ).subscribe(() => {this._updateProducts()})
    },
  }
  public new = {
    product$: (product: Product): Subject<Product> => {
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
        this._updateProducts()
        subject.next(product)
      })
      return subject
    },
    coin$: (product: Product, coin: Coin): Subject<Coin> => {
      const subject = new Subject<Coin>()
      this.http.post<Document<Coin>>(
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
      ).subscribe(
        (coin: Coin) => {
          this._updateProducts()
          subject.next(coin)
        },
      )
      return subject
    },
  }

  constructor(private http: HttpClient) {
    this._updateProducts()
  }

  private _updateProducts(): void {
    this.http.get('http://localhost:8080/api/v1/product').pipe(
      map(
        (response: { data: Product[] }) => {
          return response.data
        },
      ),
    ).subscribe(this.products$)
  }
}

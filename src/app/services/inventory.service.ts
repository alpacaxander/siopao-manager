import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Product} from '../resources/product/product';
import {Coin} from '../resources/coin/coin';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  public products$: Subject<Product[]> = new BehaviorSubject<Product[]>([]);
  public delete = {
    product$: (product: Product): void => {
      this.http.delete(
        'http://localhost:8080/api/v1/product/' + product.id
      ).subscribe();
    },
    coin$: (product: Product, coin: Coin): void => {
      this.http.delete(
        'http://localhost:8080/api/v1/product/' + product.id + '/coins/' + coin.id
      ).subscribe();
    }
  };
  public new = {
    product$: (product: Product): Promise<Product> => {
      return this.http.post<Product>(
        'http://localhost:8080/api/v1/product',
        {
          data: product
        },
        {
          headers: {
            'Content-Type': 'application/vnd.api+json'
          }
        }
      ).pipe(
        map((data) => {
          this._updateProducts();
          return data;
        })
      ).toPromise();
    },
    coin$: (product: Product, coin: Coin): Promise<Coin> => {
      return this.http.post<Coin>(
        'http://localhost:8080/api/v1/product/' + product.id + '/coins',
        {
          data: coin
        },
        {
          headers: {
            'Content-Type': 'application/vnd.api+json'
          }
        }
      ).pipe(
        map((data) => {
          this._updateProducts();
          return data;
        })
      ).toPromise();
    }
  };

  constructor(private http: HttpClient) {
    this._updateProducts();
  }

  private _updateProducts(): void {
    this.http.get('http://localhost:8080/api/v1/product').pipe(
      map(
        (response: { data: Product[] }) => {
          return response.data;
        }
      )
    ).subscribe(this.products$);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Product } from '../product'

@Component({
             selector: 'app-product-form',
             templateUrl: './product-form.component.html',
             styleUrls: ['./product-form.component.scss'],
           })
export class ProductFormComponent implements OnInit {

  productValue: Product

  @Output() productChange: EventEmitter<Product> = new EventEmitter<Product>()

  constructor () {
  }

  @Input() get product (): Product {
    return this.productValue
  }

  set product (val) {
    this.productValue = val
    this.productChange.emit(val)
  }

  ngOnInit (): void {
  }
}

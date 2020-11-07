import { Component, OnInit } from '@angular/core'
import { Product } from '../../resources/product/product'
import { InventoryService } from '../../services/inventory.service'
import { Observable } from 'rxjs'

@Component({
             selector: 'app-inventory-product',
             templateUrl: './inventory-product.component.html',
             styleUrls: ['./inventory-product.component.scss'],
           })
export class InventoryProductComponent implements OnInit {

  products$: Observable<Product[]>

  displayedColumns = ['name', 'currency', 'nation', 'era', 'denomination', 'unit', 'coin_count', 'coin_add', 'delete']

  constructor(private inventoryService: InventoryService) {
    this.products$ = this.inventoryService.products$
    this.inventoryService.products$.subscribe(console.log)
  }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core'
import { Product } from '../../resources/product/product'
import { Observable } from 'rxjs'
import { Coin } from '../../resources/coin/coin'
import { InventoryService } from '../../services/inventory.service'

@Component({
             selector: 'app-inventory-coin',
             templateUrl: './inventory-coin.component.html',
             styleUrls: ['./inventory-coin.component.scss'],
           })
export class InventoryCoinComponent implements OnInit {

  @Input()
  product: Product

  coins$: Observable<Coin[]>

  displayedColumns = ['status', 'location', 'condition']

  constructor(private inventoryService: InventoryService) {
  }

  ngOnInit(): void {
    this.coins$ = this.inventoryService.coins$(this.product)
  }

}

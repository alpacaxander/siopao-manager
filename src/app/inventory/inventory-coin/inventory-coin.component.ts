import { Component, Input, OnInit } from '@angular/core'
import { Product } from '../../resources/product/product'
import { Coin } from '../../resources/coin/coin'
import { InventoryService } from '../../services/inventory.service'
import { animate, state, style, transition, trigger } from '@angular/animations'

@Component({
             selector: 'app-inventory-coin',
             templateUrl: './inventory-coin.component.html',
             styleUrls: ['./inventory-coin.component.scss'],
             animations: [
               trigger('detailExpand', [
                 state('collapsed', style({height: '0px', minHeight: '0'})),
                 state('expanded', style({height: '*'})),
                 transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
               ]),
             ],
           })
export class InventoryCoinComponent implements OnInit {

  @Input()
  product: Product

  coins$: Promise<Coin[]>

  expandedElement: Coin | null

  displayedColumns = ['status', 'location', 'condition']

  constructor(private inventoryService: InventoryService) {
  }

  ngOnInit(): void {
    this.coins$ = this.inventoryService.product.coins$(this.product)
  }

}

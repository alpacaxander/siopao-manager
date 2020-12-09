import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Coin } from '../../resources/coin/coin'
import { InventoryService } from '../../services/inventory.service'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { Product } from '../../resources/product/product'

@Component({
             selector: 'app-inventory-coin',
             templateUrl: './inventory-coin.component.html',
             styleUrls: ['./inventory-coin.component.scss'],
             animations: [
               trigger('detailExpand', [
                 state(
                   'collapsed',
                   style({
                           height: '0px',
                           minHeight: '0',
                         }),
                 ),
                 state('expanded', style({height: '*'})),
                 transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
               ]),
             ],
           })
export class InventoryCoinComponent implements OnInit {

  productValue: Product

  @Output() productChange: EventEmitter<Product> = new EventEmitter<Product>()
  expandedElement: Coin | null
  displayedColumns = ['status', 'location', 'condition', 'delete']

  @Input() get product(): Product {
    return this.productValue
  }

  set product(val) {
    this.productValue = val
    this.productChange.emit(val)
  }

  constructor(private inventoryService: InventoryService) {
  }

  ngOnInit(): void {
    this._update()
  }

  private _update(): void {
    this.inventoryService.read<Coin[]>(
      this.product.relationships.coins.links.related,
    ).then(
      (coins: Coin[]) => {
        this.product.relationships.coins.data = coins
        for (const coin of coins) {
          coin.relationships.product.data = this.product
        }
      },
    )
  }

}

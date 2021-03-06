import { Component, OnInit } from '@angular/core'
import { Product } from '../../resources/product/product'
import { InventoryService } from '../../services/inventory.service'
import { animate, state, style, transition, trigger } from '@angular/animations'

@Component({
             selector: 'app-inventory-product',
             templateUrl: './inventory-product.component.html',
             styleUrls: ['./inventory-product.component.scss'],
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
export class InventoryProductComponent implements OnInit {

  products: Product[] = []

  searchString: string = ''

  expandedElement: Product | null

  displayedColumns = ['name', 'currency', 'nation', 'era', 'denomination', 'unit', 'coin_count', 'actions']

  constructor(private inventoryService: InventoryService) {
    this.inventoryService.products$().then((products: Product[]) => {this.products = products})
  }

  ngOnInit(): void {
  }

  public update(): void {
    this.inventoryService.products$().then(
      (products: Product[]) => {
        this.products = products
      },
    )
  }

  public search(): void {
    this.inventoryService.products$().then(
      (products: Product[]) => {
        if (this.searchString !== '') {
          this.products = products.filter(product => product.attributes.name.includes(this.searchString))
          this.searchString = ''
        } else {
          this.products = products
        }
      },
    )
  }

}

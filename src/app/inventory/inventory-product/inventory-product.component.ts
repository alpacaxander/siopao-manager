import { Component, OnInit } from '@angular/core'
import { Product } from '../../resources/product/product'
import { InventoryService } from '../../services/inventory.service'
import { Observable } from 'rxjs'
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
             selector: 'app-inventory-product',
             templateUrl: './inventory-product.component.html',
             styleUrls: ['./inventory-product.component.scss'],
             animations: [
               trigger('detailExpand', [
                 state('collapsed', style({height: '0px', minHeight: '0'})),
                 state('expanded', style({height: '*'})),
                 transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
               ]),
             ],
           })
export class InventoryProductComponent implements OnInit {

  products$: Observable<Product[]>

  expandedElement: Product | null

  displayedColumns = ['name', 'currency', 'nation', 'era', 'denomination', 'unit', 'coin_count', 'coin_add', 'delete']

  constructor(private inventoryService: InventoryService) {
    this.products$ = this.inventoryService.products$
  }

  ngOnInit(): void {
  }

}

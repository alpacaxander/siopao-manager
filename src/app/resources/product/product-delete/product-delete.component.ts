import { Component, Input, OnInit } from '@angular/core'
import { Product } from '../product'
import { InventoryService } from '../../../services/inventory.service'

@Component({
             selector: 'app-product-delete',
             templateUrl: './product-delete.component.html',
             styleUrls: ['./product-delete.component.scss'],
           })
export class ProductDeleteComponent implements OnInit {

  @Input() product: Product

  constructor(private inventoryService: InventoryService) {
  }

  ngOnInit(): void {
  }

  delete($event: any): void {
    $event.stopPropagation();
    this.inventoryService.product.delete$(this.product)
  }

}

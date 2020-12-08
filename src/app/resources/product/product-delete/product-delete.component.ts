import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Product } from '../product'
import { InventoryService } from '../../../services/inventory.service'

@Component({
             selector: 'app-product-delete',
             templateUrl: './product-delete.component.html',
             styleUrls: ['./product-delete.component.scss'],
           })
export class ProductDeleteComponent implements OnInit {

  @Output() onDelete: EventEmitter<Product> = new EventEmitter<Product>()

  @Input() product: Product

  constructor(private inventoryService: InventoryService) {
  }

  ngOnInit(): void {
  }

  delete(): void {
    this.inventoryService.delete(this.product.links.self).then(() => {this.onDelete.emit(this.product)})
  }

}

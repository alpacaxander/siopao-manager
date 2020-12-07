import { Component, EventEmitter, Inject, OnInit } from '@angular/core'
import { Product } from '../../product'
import { InventoryService } from '../../../../services/inventory.service'

@Component({
  selector: 'app-product-new-dialog',
  templateUrl: './product-new-dialog.component.html',
  styleUrls: ['./product-new-dialog.component.scss']
})
export class ProductNewDialogComponent implements OnInit {

  public onCreate: EventEmitter<void> = new EventEmitter<void>()

  // @ts-ignore
  public product: Product = {
    type: 'product',
    id: '',
    attributes: {
      name: '',
      description: '',
      currency: '',
      nation: '',
      era: '',
      denomination: 0,
      unit: '',
    },
  }

  constructor(private inventoryService: InventoryService) {
  }

  ngOnInit(): void {
  }

  send(): void {
    this.inventoryService.create(this.product).then(
      (product: Product) => {
        this.onCreate.emit()
      }
    )
  }
}

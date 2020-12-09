import { Component, EventEmitter, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Coin } from '../../coin'
import { Image } from '../../../image/image'
import { Product } from '../../../product/product'
import { FormControl } from '@angular/forms'
import { InventoryService } from '../../../../services/inventory.service'

@Component({
             selector: 'app-coin-new-dialog',
             templateUrl: './coin-new-dialog.component.html',
             styleUrls: ['./coin-new-dialog.component.scss'],
           })
export class CoinNewDialogComponent implements OnInit {

  public conditionFormControl = new FormControl()
  public conditionEnum: string[] = ['Good', 'Great']

  public statusFormControl = new FormControl()
  public statusEnum: string[] = [
    'Ordered from vendor',
    'In Stock (unprocessed)',
    'In Stock',
    'Sold',
    'Dropped off for delivery',
    'Delivered',
  ]

  public location

  public bundles: Image[][] = []

  public onCreate: EventEmitter<void> = new EventEmitter<void>()

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private inventoryService: InventoryService,
  ) { }

  ngOnInit(): void {
  }

  public send(): void {
    for (let bundle of this.bundles) {
      this.inventoryService.create(
        {
          type: 'coin',
          // @ts-ignore
          attributes: {
            status: this.statusFormControl.value ? this.statusFormControl.value : '',
            location: this.location,
            condition: this.conditionFormControl.value ? this.conditionFormControl.value : '',
          },
          relationships: {
            // @ts-ignore
            product: {
              data: this.product,
            },
          },
        },
      ).then(
        (coin: Coin) => {
          for (const image of bundle) {
            image.relationships = {
              // @ts-ignore
              coin: {
                data: coin,
              },
            }
            this.inventoryService.create(image).then()
          }
          this.onCreate.emit()
        },
      )
    }
  }
}

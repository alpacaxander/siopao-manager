import { Component, Input, OnInit } from '@angular/core'
import { Image } from '../../resources/image/image'
import { Coin } from '../../resources/coin/coin'
import { InventoryService } from '../../services/inventory.service'

@Component({
             selector: 'app-inventory-image',
             templateUrl: './inventory-image.component.html',
             styleUrls: ['./inventory-image.component.scss'],
           })
export class InventoryImageComponent implements OnInit {

  @Input()
  coin: Coin

  images$: Promise<Image[]>

  constructor(private inventoryService: InventoryService) {
  }

  ngOnInit(): void {
    // this.images$ = this.inventoryService.coins.images$(this.coin)
  }

}

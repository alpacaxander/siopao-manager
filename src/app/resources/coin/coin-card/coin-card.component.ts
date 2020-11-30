import { Component, Input, OnInit } from '@angular/core'
import { Coin } from '../coin'
import { InventoryService } from '../../../services/inventory.service'
import { Image } from '../../image/image'

@Component({
             selector: 'app-coin-card',
             templateUrl: './coin-card.component.html',
             styleUrls: ['./coin-card.component.scss'],
           })
export class CoinCardComponent implements OnInit {

  @Input()
  coin: Coin

  images: Image[]

  selected: number

  constructor(private inventoryService: InventoryService) {
  }

  ngOnInit(): void {
    this.selected = 0
    this.inventoryService.coins.images$(this.coin).then(
      (images: Image[]) => {
        this.images = images
      }
    )
  }

}

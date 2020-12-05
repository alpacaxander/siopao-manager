import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core'
import { Coin } from '../coin'
import { InventoryService } from '../../../services/inventory.service'
import { Image } from '../../image/image'

@Component({
             selector: 'app-coin-card',
             templateUrl: './coin-card.component.html',
             styleUrls: ['./coin-card.component.scss'],
           })
export class CoinCardComponent implements OnInit, OnChanges {

  coinValue: Coin

  @Output() coinChange: EventEmitter<Coin> = new EventEmitter<Coin>()

  @Input() get coin(): Coin {
    return this.coinValue
  }

  set coin(val) {
    this.coinValue = val
  }

  selected: number = 0

  constructor(private inventoryService: InventoryService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.coin.relationships) {
      this.inventoryService.read<Image[]>(this.coin.relationships.images.links.related).then(
        (images: Image[]) => {
          this.coin.relationships.images.data = images
        }
      )
    }
  }

}

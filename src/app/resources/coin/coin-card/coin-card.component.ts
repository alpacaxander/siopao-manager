import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
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

  @Output()
  onChange: EventEmitter<void> = new EventEmitter<void>()

  selected: number = 0

  constructor(private inventoryService: InventoryService) {
  }

  ngOnInit(): void {
    this.inventoryService.read<Image[]>(this.coin.relationships.images.links.related).then(
      (images: Image[]) => {
        this.coin.relationships.images.data = images
      }
    )
  }

  public update() {
    this.onChange.emit()
  }

}

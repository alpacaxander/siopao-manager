import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Coin } from '../../coin/coin'
import { InventoryService } from '../../../services/inventory.service'

@Component({
             selector: 'app-coin-delete',
             templateUrl: './coin-delete.component.html',
             styleUrls: ['./coin-delete.component.scss'],
           })
export class CoinDeleteComponent implements OnInit {

  @Output() onDelete: EventEmitter<Coin> = new EventEmitter<Coin>()

  @Input() coin: Coin

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
  }

  delete(): void {
    this.inventoryService.delete(this.coin.links.self).then(() => {this.onDelete.emit(this.coin)})
  }

}

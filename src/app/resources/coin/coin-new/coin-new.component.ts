import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Product } from '../../product/product'
import { MatDialog } from '@angular/material/dialog'
import { CoinNewDialogComponent } from './coin-new-dialog/coin-new-dialog.component'

@Component({
             selector: 'app-coin-new',
             templateUrl: './coin-new.component.html',
             styleUrls: ['./coin-new.component.scss'],
           })
export class CoinNewComponent implements OnInit {

  @Input()
  public product: Product

  @Output()
  public onCreate: EventEmitter<void> = new EventEmitter<void>()

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialog = this.dialog.open(
      CoinNewDialogComponent,
      {data: this.product},
    )
    dialog.componentInstance.onCreate.subscribe(() => {this.onCreate.emit()})
  }
}

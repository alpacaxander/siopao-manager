import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { InventoryService } from '../../../services/inventory.service'
import { Product } from '../product'
import { PrimaryData } from '../../../services/json-api-types/primary-data'
import { MatDialog } from '@angular/material/dialog'
import { CoinNewDialogComponent } from '../../coin/coin-new/coin-new-dialog/coin-new-dialog.component'
import { ProductNewDialogComponent } from './product-new-dialog/product-new-dialog.component'

@Component({
             selector: 'app-product-new',
             templateUrl: './product-new.component.html',
             styleUrls: ['./product-new.component.scss'],
           })
export class ProductNewComponent implements OnInit {

  @Output()
  public onCreate: EventEmitter<void> = new EventEmitter<void>()

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialog = this.dialog.open(
      ProductNewDialogComponent,
    )
    dialog.componentInstance.onCreate.subscribe(() => {this.onCreate.emit()})
  }
}

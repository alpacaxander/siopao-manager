import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
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

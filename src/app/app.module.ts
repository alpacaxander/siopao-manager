import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatTableModule } from '@angular/material/table'
import { ProductCompactComponent } from './resources/product/product-compact/product-compact.component'
import { ProductFormComponent } from './resources/product/product-form/product-form.component'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@Angular/material/list'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { InventoryProductComponent } from './inventory/inventory-product/inventory-product.component'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { ProductNewComponent } from './resources/product/product-new/product-new.component'
import { ProductDeleteComponent } from './resources/product/product-delete/product-delete.component'
import { CoinCardComponent } from './resources/coin/coin-card/coin-card.component'
import { CoinNewComponent } from './resources/coin/coin-new/coin-new.component'
import { InventoryCoinComponent } from './inventory/inventory-coin/inventory-coin.component'
import { ImageComponent } from './resources/image/image/image.component'
import { ImageUploadComponent } from './resources/image/image-upload/image-upload.component'
import { DocumentDataPipe } from './pipes/DocumentDataPipe'
import { DragAndDropDirective } from './directives/drag-and-drop.directive'
import { ImageIconComponent } from './resources/image/image-icon/image-icon.component'
import { StopPropagationDirective } from './directives/stop-propagation.directive'
import { CoinDeleteComponent } from './resources/coin/coin-delete/coin-delete.component'
import { MatSelectModule } from '@angular/material/select'
import { MatDialogModule } from '@angular/material/dialog'
import { CoinNewDialogComponent } from './resources/coin/coin-new/coin-new-dialog/coin-new-dialog.component'
import { ProductNewDialogComponent } from './resources/product/product-new/product-new-dialog/product-new-dialog.component'

@NgModule({
            declarations: [
              AppComponent,
              ProductCompactComponent,
              ProductFormComponent,
              InventoryProductComponent,
              ProductNewComponent,
              ProductDeleteComponent,
              CoinCardComponent,
              CoinNewComponent,
              InventoryCoinComponent,
              ImageComponent,
              ImageUploadComponent,
              DocumentDataPipe,
              DragAndDropDirective,
              ImageIconComponent,
              StopPropagationDirective,
              CoinDeleteComponent,
              InventoryProductComponent,
              CoinNewDialogComponent,
              ProductNewDialogComponent,
            ],
            imports: [
              BrowserModule,
              BrowserAnimationsModule,
              AppRoutingModule,
              HttpClientModule,
              MatGridListModule,
              MatTableModule,
              MatCardModule,
              MatFormFieldModule,
              MatInputModule,
              MatSlideToggleModule,
              MatButtonModule,
              MatIconModule,
              MatButtonToggleModule,
              MatListModule,
              NgbModule,
              FormsModule,
              MatSelectModule,
              ReactiveFormsModule,
              MatDialogModule,
            ],
            providers: [],
            bootstrap: [AppComponent],
          })
export class AppModule {
}

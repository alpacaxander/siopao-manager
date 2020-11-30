import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { InventoryComponent } from './inventory/inventory.component'
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
import { FormsModule } from '@angular/forms'
import { InventoryProductComponent } from './inventory/inventory-product/inventory-product.component'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { ProductNewComponent } from './resources/product/product-new/product-new.component'
import { ProductDeleteComponent } from './resources/product/product-delete/product-delete.component'
import { CoinCardComponent } from './resources/coin/coin-card/coin-card.component'
import { CoinNewComponent } from './resources/coin/coin-new/coin-new.component'
import { InventoryCoinComponent } from './inventory/inventory-coin/inventory-coin.component'
import { ImageComponent } from './resources/image/image/image.component'
import { ImageUploadComponent } from './resources/image/image-upload/image-upload.component'
import { InventoryImageComponent } from './inventory/inventory-image/inventory-image.component'
import { DocumentDataPipe } from './pipes/DocumentDataPipe'
import { DragAndDropDirective } from './directives/drag-and-drop.directive'
import { ImageDragAndDropComponent } from './resources/image/image-drag-and-drop/image-drag-and-drop.component'
import { ImageIconComponent } from './resources/image/image-icon/image-icon.component'

@NgModule({
            declarations: [
              AppComponent,
              InventoryComponent,
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
              InventoryImageComponent,
              DocumentDataPipe,
              DragAndDropDirective,
              ImageDragAndDropComponent,
              ImageIconComponent,
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
            ],
            providers: [],
            bootstrap: [AppComponent],
          })
export class AppModule {
}

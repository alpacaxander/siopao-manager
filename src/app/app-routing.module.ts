import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { InventoryProductComponent } from './inventory/inventory-product/inventory-product.component'

const routes: Routes = [
  {
    path: '**',
    redirectTo: '/inventory',
    pathMatch: 'full',
  },
  {
    path: 'inventory',
    component: InventoryProductComponent,
  },
]

@NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule],
          })
export class AppRoutingModule {
}

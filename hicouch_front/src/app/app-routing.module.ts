import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ProductPageComponent } from './products/product.page';
import { AccountPageComponent } from './account/account.page';

export const routes: Routes = [
  {
      path: '',
      redirectTo: 'app/login',
      pathMatch: 'full',
  },
  {
    path: 'app/login',
    component: LoginComponent,
  },
  {
      path: 'app/home',
      component: HomeComponent,
  },
  {
    path: 'app/products/:productId',
    component: ProductPageComponent,
  },
  {
    path: 'app/account/:userId',
    component: AccountPageComponent,
  },
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes),
    ],
    exports: [RouterModule],
    declarations: []
  })

  export class AppRoutingModule {}

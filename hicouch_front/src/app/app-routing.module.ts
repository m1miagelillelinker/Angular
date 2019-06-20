import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ProductPageComponent } from './products/product.page';
import { AccountPageComponent } from './account/account.page';
import {CanActivateGuardService} from './shared/services/canActivateGuard.service';
import {ModerationPageComponent} from './moderation/moderation.page';

export const routes: Routes = [
  {
      path: '',
      redirectTo: 'app/home', // TODO : when ready redirect to app/login
      pathMatch: 'full',
      canActivate: [CanActivateGuardService]
  },
  {
    path: 'app/login',
    component: LoginComponent,
  },
  {
      path: 'app/home',
      component: HomeComponent,
      canActivate: [CanActivateGuardService]
  },
  {
    path: 'app/products/:productType/:productId',
    component: ProductPageComponent,
    canActivate: [CanActivateGuardService]
  },
  {
    path: 'app/account/:userId',
    component: AccountPageComponent,
    canActivate: [CanActivateGuardService]
  },
  {
    path: 'app/moderation',
    component: ModerationPageComponent,
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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatDialogModule,
  MatTabsModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserService } from './shared/services/user.service';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductPageComponent } from './products/product.page';
import { ProductService } from './shared/services/product.service';
import {
  ProductsTopRecommandationComponent
} from './products/components/products-top-recommandation/products-top-recommandation.component';
import { ProductsRelatedComponent } from './products/components/products-related/products-related.component';
import { AccountPageComponent } from './account/account.page';
import { AuthenticationService } from './shared/services/authentification.service';
import {TokenInterceptor} from './shared/services/TokenInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    ProductPageComponent,
    ProductsTopRecommandationComponent,
    ProductsRelatedComponent,
    AccountPageComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
  ],
  providers: [
    UserService,
    AuthenticationService,
    ProductService,
    ReactiveFormsModule,
    FormsModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

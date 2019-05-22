import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDialogModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
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
// tslint:disable-next-line:max-line-length
import { ProductsRelatedComponent, ProductsRelatedAddDialogComponent } from './products/components/products-related/products-related.component';
import { AccountPageComponent } from './account/account.page';
import { AuthenticationService } from './shared/services/authentification.service';
import { AccountSideMenuComponent } from './account/components/account-side-menu/account-side-menu.component';
import { ActivityFieldComponent } from './account/components/activity-field/activity-field.component';
import { SubscribeBtnComponent } from './account/components/subscribe-btn/subscribe-btn.component';
import { MainProductComponent } from './products/components/main-product/main-product.component';
import { SearchProductComponent } from './shared/components/search-product/search-product.component';
import {
    ProductRelatedCommentsComponent,
    ProductsRelatedCommentSignalDialogComponent, ProductsRelatedCommentUpdateDialogComponent
} from './products/components/product-related-comments/product-related-comments.component';
import {CommentService} from './shared/services/comment.service';
import {SignalementService} from './shared/services/signalement.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        LoginComponent,
        ProductPageComponent,
        ProductsTopRecommandationComponent,
        ProductsRelatedComponent,
        MainProductComponent,
        AccountPageComponent,
        ProductsRelatedAddDialogComponent,
        AccountSideMenuComponent,
        ActivityFieldComponent,
        SubscribeBtnComponent,
        SearchProductComponent,
        ProductRelatedCommentsComponent,
        ProductsRelatedCommentSignalDialogComponent,
        ProductsRelatedCommentUpdateDialogComponent,
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
        MatCardModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatIconModule,
        MatListModule,
        MatProgressSpinnerModule,
    ],
    providers: [
        UserService,
        AuthenticationService,
        ProductService,
        ReactiveFormsModule,
        FormsModule,
        CommentService,
        SignalementService
    ],
    entryComponents: [
        ProductsRelatedAddDialogComponent,
        ProductsRelatedCommentUpdateDialogComponent,
        ProductsRelatedCommentSignalDialogComponent

    ],
    bootstrap: [AppComponent],
})
export class AppModule { }

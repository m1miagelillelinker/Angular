import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { TestService } from './shared/services/test.service';
import { LoginComponent } from './login/login.component';
import { DisplaySubscribersComponent } from './account/components/display-subscribers/display-subscribers.component';
import { DisplayBadgesComponent } from './account/components/display-badges/display-badges.component';
import { DisplayActivitiesComponent } from './account/components/display-activities/display-activities.component'; 



// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    DisplaySubscribersComponent,
    DisplayBadgesComponent,
    DisplayActivitiesComponent,
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
  ],
  providers: [TestService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './main-page/main-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { SigninComponent } from './signin/signin.component';
import { ListRoomComponent } from './list-room/list-room.component';
import { DetailRoomComponent } from './detail-room/detail-room.component';
import { DataService } from './service/data.service';
import { RegisterRoomComponent } from './register-room/register-room.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FindRoomComponent } from './find-room/find-room.component';
import { CookieService } from 'ngx-cookie-service';
import { UpdateAccountComponent } from './update-account/update-account.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    AdminPageComponent,
    SigninComponent,
    ListRoomComponent,
    DetailRoomComponent,
    RegisterRoomComponent,
    FindRoomComponent,
    UpdateAccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    MatFormFieldModule,
    NoopAnimationsModule
  ],
  providers: [
    DataService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

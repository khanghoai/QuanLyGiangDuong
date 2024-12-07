import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { SigninComponent } from './signin/signin.component';
import { ListRoomComponent } from './list-room/list-room.component';
import { DetailRoomComponent } from './detail-room/detail-room.component';
import { RegisterRoomComponent } from './register-room/register-room.component';
import { FindRoomComponent } from './find-room/find-room.component';
import { UpdateAccountComponent } from './update-account/update-account.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: '', redirectTo:'login', pathMatch : 'full'},
  {path: 'mainPage', component : MainPageComponent},
  {path: 'adminPage', component : AdminPageComponent},
  {path : 'signin', component : SigninComponent},
  {path : 'listRoom', component:ListRoomComponent},
  {path : 'detailRoom', component: DetailRoomComponent},
  {path : 'registerRoom', component : RegisterRoomComponent},
  {path : 'findRoom', component : FindRoomComponent},
  {path : 'updateAccount', component : UpdateAccountComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

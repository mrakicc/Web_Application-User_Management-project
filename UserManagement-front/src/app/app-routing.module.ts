import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AddUserComponent} from "./components/add-user/add-user.component";
import {EditUserComponent} from "./components/edit-user/edit-user.component";
import {AllUsersComponent} from "./components/all-users/all-users.component";
import {authGuard} from "../guards/auth.guard";
import {readGuard} from "../guards/read.guard";
import {createGuard} from "../guards/create.guard";
import {updateGuard} from "../guards/update.guard";

const routes: Routes = [

  {
    path: "",
    component: LoginComponent,
    canDeactivate: [authGuard],
  },
  {
    path: "all",
    component: AllUsersComponent,
    canActivate:[readGuard]
  },
  {
    path: "add",
    component: AddUserComponent,
    canActivate:[createGuard]
  },
  {
    path: "edit/:email",
    component: EditUserComponent,
    canActivate:[updateGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

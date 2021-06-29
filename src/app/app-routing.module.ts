import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { FirstformComponent } from './firstform/firstform.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: 'Chat',component:ChatroomComponent},
  {path:'Users',component:UsersComponent},
  {path:'',component:FirstformComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

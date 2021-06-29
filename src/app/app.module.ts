import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FirstformComponent } from './firstform/firstform.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import { ApiService } from './services/api.service';
import { UsersComponent } from './users/users.component';
import { WebsocketService } from './services/websocket.service';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { PersonlistComponent } from './users/personlist/personlist.component';
import { PersonformComponent } from './users/personform/personform.component';



@NgModule({
  declarations: [
    AppComponent,
    FirstformComponent,
    NavbarComponent,
    UsersComponent,
    ChatroomComponent,
    PersonlistComponent,
    PersonformComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ApiService,WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }

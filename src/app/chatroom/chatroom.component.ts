import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from '../services/models';
import { WebsocketService } from '../services/websocket.service';



@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  constructor(private webSocket: WebsocketService, private _formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username')!;
    if(this.username) {
      this.connect();
    }else{
this.router.navigateByUrl('/');
    }

  }

  username: string = '';
  message: string = '';

messages: Message[] = [];



  form2: FormGroup = this._formBuilder.group({
    message: ['', Validators.required],
  });

  connect() {
    this.webSocket.connect(this.username);
    this.webSocket.newMessages.subscribe((newMessage) => {
      this.messages.push(newMessage);
    });
  }

  sendMessage() {
  //  this.webSocket.myWebSocket.next(this.username + ':' + this.message);
  if(this.form2.valid) {

    this.webSocket.myWebSocket.next({
      userName: this.username,
      message: this.message,
    });


  }
    this.message = '';
  }


}

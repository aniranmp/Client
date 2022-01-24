import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Message } from '../services/models';
import { WebsocketService } from '../services/websocket.service';



@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  constructor(private webSocket: WebsocketService, private _formBuilder: FormBuilder, private router: Router, private api:ApiService) { }

  private autoSaveInterval = setInterval(() => {
    var res = this.api.getOnlineUsers().subscribe(
      (next) => {
        this.onlineUsers = [];
  // Object.entries()
     for (let [key, value] of Object.entries(next)) {
    console.log(key+":"+value);
    var k = parseInt(key);
    value = value.split("/",4)[3];
    this.onlineUsers[k] = value;
     }

        console.log(next);
        console.log("online users : " + this.onlineUsers);
      },
      (err) => {
        console.log(err);
      }
    );  }, 5000);




ngOnInit(): void {
 console.log( this.autoSaveInterval);

    this.username = localStorage.getItem('username')!;
    if(this.username) {
      this.connect();
    }else{
this.router.navigateByUrl('/');
    }
    var res = this.api.getOnlineUsers().subscribe(
      (next) => {

// Object.entries()
     for (let [key, value] of Object.entries(next)) {
    console.log(key+":"+value);
    var k = parseInt(key);
    value = value.split("/",4)[3];
    this.onlineUsers[k] = value;
     }

        console.log(next);
        console.log("online users : " + this.onlineUsers);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  username: string = '';
  message: string = '';

messages: Message[] = [];

onlineUsers: String[] = [];

  form2: FormGroup = this._formBuilder.group({
    message: ['', Validators.required],
  });

  connect() {
    this.webSocket.connect(this.username);
    this.webSocket.newMessages.subscribe((newMessage) => {
      this.messages.push(newMessage);
    });
    var res = this.api.getOnlineUsers().subscribe(
      (next) => {

// Object.entries()
     for (let [key, value] of Object.entries(next)) {
    console.log(key+":"+value);
    var k = parseInt(key);
    value = value.split("/",4)[3];
    this.onlineUsers[k] = value;
     }

        console.log(next);
        console.log("online users : " + this.onlineUsers);
      },
      (err) => {
        console.log(err);
      }
    );
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
    var res = this.api.getOnlineUsers().subscribe(
      (next) => {
        for (let [key, value] of Object.entries(next)) {
          console.log(key+":"+value);
    var k = parseInt(key);
    value = value.split("/",4)[3];
    this.onlineUsers[k] = value;
           }

        console.log(next);
      },
      (err) => {
        console.log(err);
      }
    );
  }



}

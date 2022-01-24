import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { ApiService } from './api.service';
import { Message } from './models';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor(private api:ApiService) { }

  // urlHost = '171.22.25.154'; //local host
  urlHost  = 'localhost';
  urlPort = '7777';
  urlProtocol = 'ws';

  url =
    this.urlProtocol + '://' + this.urlHost + ':' + this.urlPort + '/ws/chat';

  myWebSocket: any = null;

   newMessages = new Subject<Message>();

  // newMessagesRecived = this.newMessages.asObservable();

  public connect(username: string): void {
    this.myWebSocket = webSocket(this.url + '/' + username);
    this.myWebSocket.asObservable().subscribe(
      (newMessage: Message) => {
        console.log(newMessage);
        this.newMessages.next(newMessage);
      },
      (err: Message) => {
        this.connect(username);
      }
    );
    // this.myWebSocket.next({ message: 'some message' });
  }

  public discounect() {
    this.myWebSocket.complete();

  }

  public sendMessage(message: string) {

    this.myWebSocket.sendData(message);
  //  this.myWebSocket.sendData(message);


  }



}

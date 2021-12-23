import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map, retry } from "rxjs/operators";
import { WebsocketService } from "../web-socket/web.socket.service";

const CHAT_URL = "wss://chat-notif-asdial.herokuapp.com/";

export interface Message {
  author: string;
  message: string;
}

@Injectable()
export class ChatService {
  public messages: Subject<any>;

  constructor(private wsService: WebsocketService) {
    this.connect()
  }

  connect(){
    this.messages = <Subject<any>>this.wsService.connect(CHAT_URL).pipe(
      map(message=>{
        const {data}=message
        const msg = JSON.parse(data)
        const evalMessage = eval(msg.mensaje)
        const parsed = JSON.parse(evalMessage)
        return  parsed
      })
    );
  }
}
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "../../services/login/login.service";
import { NotificationsService } from "../../services/notifications/notifications.service";
import { RightNavService } from "../core-services/right-nav.service";
import { SidebarService } from "../core-services/sidebar.service";
import { ChatService } from "../../services/chat/chat.service";
import { WebsocketService } from "../../services/web-socket/web.socket.service";
import { environment as env } from "../../../environments/environment";

@Component({
  selector: "app-core-header",
  templateUrl: "./core-header.component.html",
  styleUrls: ["./core-header.component.scss"],
  providers:[WebsocketService,ChatService]
})
export class CoreHeaderComponent implements OnInit {
  profilePicture = "";
  constructor(
    private logService: LoginService,
    private rightNavService: RightNavService,
    private sidebarService: SidebarService,
    private router: Router,
    private notificationsService: NotificationsService,
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService,
    private ws : WebsocketService
  ) {
    this.subscribeToWsServer()
  }

  subscribeToWsServer(){
    this.chatService.messages.subscribe(msg=>{
      const idUser = localStorage.getItem('id')
      if(msg.created_by != idUser)this.notificationsService.addNotification(msg)
    },err=>console.log(err),()=>{
      this.ws.cleanWs()
      this.chatService.connect()
      this.subscribeToWsServer()
    })
  }

  user = "";
  search = false;
  sidebar = true;
  role = "";

  dropUser = false;

  ngOnInit(): void {
    this.sidebarService.getSidebar.subscribe((side) => {
      this.sidebar = side;
    });
    this.logService.getRole.subscribe((role) => {
      this.user =
        role != "admin" ? (role != "owner" ? "Usuario" : "Centro") : "APDTR";
      this.role = role;
    });
    this.notificationsService.refreshNoti()
  }

  toogleRightNav(value) {
    this.rightNavService.toogle(value);
  }
  toogleSidebar() {
    this.sidebarService.toogle(!this.sidebar);
  }
  logOut() {
    this.logService.logout().subscribe((res) => {
      localStorage.clear();
      this.router.navigate(["login"]);
    });
  }
}

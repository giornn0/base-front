import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "../../../../services/login/login.service";
import { NotificationsService } from "../../../../services/notifications/notifications.service";
import { RightNavService } from "../../../core-services/right-nav.service";
import { SidebarService } from "../../../core-services/sidebar.service";

@Component({
  selector: "app-medico-header",
  templateUrl: "./medico.header.component.html",
  // styleUrls: ["./medico.header.component.scss"],
})
export class MedicoHeaderComponent implements OnInit {
  profilePicture = "";
  constructor(private logService : LoginService, private  rightNavService: RightNavService ,private sidebarService:SidebarService,private router: Router,private activatedRoute: ActivatedRoute) {}

  user= ''
  search=false
  sidebar =true
  role=''

  notifications=[]
  headerOptions=""

  dropNoti=false

  dropUser=false

  ngOnInit(): void {
    const role = localStorage.getItem('role')
    this.role=role
    this.user = role!='admin'?role!='owner'?'Usuario':'Centro':'APDTR'
    this.sidebarService.getSidebar.subscribe(side=>{
      this.sidebar= side
    })
   
  }

  toogleRightNav(value){
    this.rightNavService.toogle(value)
  }
  toogleSidebar(){
    this.sidebarService.toogle(!this.sidebar)
  }
  logOut(){
    this.logService.logout().subscribe(res=>{
      localStorage.clear()
      this.router.navigate(['login'])
    })
  }
}

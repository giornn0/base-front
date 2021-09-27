import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../../services/login/login.service";

@Component({
  selector: "app-core-header",
  templateUrl: "./core-header.component.html",
  styleUrls: ["./core-header.component.scss"],
})
export class CoreHeaderComponent implements OnInit {
  profilePicture = "";
  constructor(private logService : LoginService, private router: Router) {}

  ngOnInit(): void {}

  logOut(){
    this.logService.logout().subscribe(res=>{
      localStorage.clear()
      this.router.navigate(['login'])
    },error=>{
      console.log(error)
      localStorage.clear()
      this.router.navigate(['login'])
    })
  }

}

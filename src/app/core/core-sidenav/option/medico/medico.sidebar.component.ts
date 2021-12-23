import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../../services/login/login.service';
import { SidebarService } from '../../../core-services/sidebar.service';
import { ThemeService } from '../../../core-services/theme.service';
@Component({
  selector: 'medico-sidenav',
  templateUrl: './medico.sidebar.component.html',
})
export class MedicoSidenavComponent implements OnInit {

  constructor(private logService: LoginService, private themeService:ThemeService,private router: Router,private sidebarService:SidebarService) { }
  public sidebarMinimized = false;
  public navItems 

  theme ='dark'
  userName=''

  openMenus:string[] =[]
  
  ngOnInit(): void {
    this.themeService.getTheme.subscribe(theme=>{
      this.theme = theme
    })
    this.logService.getName.subscribe(name=>this.userName=name)
  }
  changeTheme(){
    this.themeService.changeTheme(this.theme==='dark'?'light':'dark')
  }

  toggleSide(section:string):void{
    if(this.openMenus.includes(section)) this.openMenus.splice(this.openMenus.indexOf(section),1)
    else this.openMenus.push(section)
  }
  toggleSidebar(){
    this.sidebarService.toogle(!this.sidebarService.sidebar.value)
  }

  logOut(){
    this.logService.logout().subscribe(res=>{
      localStorage.clear()
      this.router.navigate(['login'])
    })
  }
}

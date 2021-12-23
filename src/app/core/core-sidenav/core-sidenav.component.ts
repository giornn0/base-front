import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { navItems } from '../../_nav';
import { getNavItemsOwner } from '../../_navOwner';
import { SidebarService } from '../core-services/sidebar.service';
import { ThemeService } from '../core-services/theme.service';
@Component({
  selector: 'app-core-sidenav',
  templateUrl: './core-sidenav.component.html',
  styleUrls: ['./core-sidenav.component.scss']
})
export class CoreSidenavComponent implements OnInit {

  constructor(private logService: LoginService, private themeService:ThemeService, public sidebarService: SidebarService ) { }
  public sidebarMinimized = false;
  public navItems; 
  

  theme ='dark'
  role=""
  
  ngOnInit(): void {
    this.logService.getRole.subscribe(role=>{
      if(role==="admin") this.navItems = navItems
      if(role==='owner') this.navItems =  getNavItemsOwner(localStorage.getItem('owned'))
      this.role=role
    })
    this.themeService.getTheme.subscribe(theme=>{
      this.theme = theme
    })
  }
  changeTheme(){
    this.themeService.changeTheme(this.theme==='dark'?'light':'dark')
  }
  
}


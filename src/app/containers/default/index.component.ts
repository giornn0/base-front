import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component,  OnInit } from "@angular/core";
import { RightNavService } from "../../core/core-services/right-nav.service";
import { SidebarService } from "../../core/core-services/sidebar.service";
import { ThemeService } from '../../core/core-services/theme.service';
import { Alert, AlertsService } from "../../services/alerts/alerts.service";
import { LoaderService } from "../../services/loader/loader.service";
import { showFromUp } from "../../shared/animations/show";

@Component({
  selector: "app-dashboard",
  templateUrl: "./index.component.html",
  styleUrls: ["../../app.component.css"],
  animations:[showFromUp]
})
export class IndexComponent implements OnInit {
  alerts: Alert[]=[]
  loading: boolean =false
  asideMenu: boolean=false
  sidebar: boolean =true
  theme:string='dark'

  // get alerts(){
  //   return this.alerts
  // }
  // get loading(){
  //   return this.loading
  // }
  // get asideMenu(){
  //   return this.asideMenu
  // }
  // get sidebar(){
  //   return this.sidebar
  // }
  // get theme(){
  //   return this.theme
  // }


  constructor(
    private loadService: LoaderService,
    private rightNavService: RightNavService,
    private sidebarService:SidebarService,
    private themeService:ThemeService
  ) {}
  
  ngOnInit() {
    this.loadService.getLoad.subscribe((isLoading) => {
      setTimeout(() => {
        this.loading = isLoading;
      })
    });
    this.rightNavService.getAside.subscribe((toogle) => {
      this.asideMenu = toogle;
    });
    this.themeService.getTheme.subscribe((theme) => {
      this.theme = theme;
    }); 
    this.sidebarService.getSidebar.subscribe((toogle) => {
        this.sidebar = toogle;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { navItems } from '../../_nav';
@Component({
  selector: 'app-core-sidenav',
  templateUrl: './core-sidenav.component.html',
  styleUrls: ['./core-sidenav.component.scss']
})
export class CoreSidenavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}

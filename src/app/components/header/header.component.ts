import { Component, OnInit } from '@angular/core';
import { DropDownAnimation } from "../../animation";
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [DropDownAnimation]
})
export class HeaderComponent implements OnInit {
  navbarOpen = false;
  screenWidth!: number;

  constructor() {
    this.onResize();
    
   }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    // console.log(this.screenWidth);
    if(this.screenWidth > 992) {
      this.navbarOpen = true;
    } else {
      this.navbarOpen = false;
    }
  }

}

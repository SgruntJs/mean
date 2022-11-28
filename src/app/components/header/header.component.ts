import { Component, OnInit } from '@angular/core';
import { DropDownAnimation } from "../../animation";
import { HostListener } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [DropDownAnimation]
})
export class HeaderComponent implements OnInit {
  navbarOpen = false;
  screenWidth!: number;

  constructor(private router: Router) {
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
    if (this.screenWidth > 992) {
      this.navbarOpen = true;
    } else {
      this.navbarOpen = false;
    }
  }


  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('diner-token');
    localStorage.removeItem('username');
    this.router.navigate(['/'])
  }

}

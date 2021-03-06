import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from "angular2-flash-messages";

import { AuthService } from "src/app/services/auth.service";
import { SettingService } from "src/app/services/setting.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isMenuHidden: boolean;
  isLoggedIn: boolean;
  loggedUser: string;
  isRegAllowed: boolean;

  constructor(
    private authService: AuthService,
    private settingService: SettingService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    
    this.isMenuHidden = true;
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.isLoggedIn = true;
        this.loggedUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
    this.settingService.getSettings().subscribe(settings => {
      this.isRegAllowed = settings.isRegistrationAllowed;
    });
  }

  onLogOut(){
    this.authService.logout();
    this.flashMessage.show('You are logged out successfully!', {
      cssClass: 'notification is-success py-3 is-radiusless',
      timeout: 4000
    });
    this.isLoggedIn = false;
    this.isMenuHidden = true;
    this.router.navigate(['/login']);
  }

}

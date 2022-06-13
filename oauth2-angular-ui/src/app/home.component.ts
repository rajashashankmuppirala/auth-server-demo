import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service'

@Component({
  selector: 'home-header',
  providers: [AppService],
  template: `<div class="container" >
    <button *ngIf="!isLoggedIn" class="btn btn-primary" (click)="login()" type="submit">Login</button>
    <div *ngIf="isLoggedIn" class="content">
        <span>Welcome !!</span>
        <a class="btn btn-default pull-right"(click)="logout()" href="#">Logout</a>
        <br/>
        <!--resource-details></resource-details-->
    </div>
</div>`
})

export class HomeComponent implements OnInit{
  public isLoggedIn = false;

  constructor(
    private _service:AppService){}

  ngOnInit(){
    console.log('on init');
    this.isLoggedIn = this._service.checkCredentials();
    let i = window.location.href.indexOf('code');
    if(!this.isLoggedIn && i != -1){
      this._service.retrieveToken(window.location.href.substring(i + 5));
    }
  }

  login() {
  //  window.location.href = 'http://localhost:8083/auth/realms/baeldung/protocol/openid-connect/auth?response_type=code&&scope=openid%20write%20read&client_id=' +
  //    this._service.clientId + '&redirect_uri='+ this._service.redirectUri;



    window.location.href = 'http://localhost:9000/oauth2/authorize?response_type=code&client_id=test-client&redirect_uri=http://127.0.0.1:4200&scope=openid';
     // this._service.clientId + '&redirect_uri='+ this._service.redirectUri;
  }

  logout() {
    this._service.logout();
  }
}

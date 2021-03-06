import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="/">Spring Auth demo - Authorization Code flow</a>
    </div>
  </div>
</nav>
<router-outlet></router-outlet>`
})
export class AppComponent {
  title = 'oauth2-angular-client';
}

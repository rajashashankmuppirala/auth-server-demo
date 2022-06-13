import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service'

@Component({
  selector: 'success',
  providers: [AppService],
  template: `<div class="container" >
    <div>
       Login success
    </div>
</div>`
})

export class SuccessComponent {

}

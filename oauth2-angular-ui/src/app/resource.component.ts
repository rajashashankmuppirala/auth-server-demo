import { Component } from '@angular/core';
import { AppService, Resource } from './app.service'

@Component({
  selector: 'resource-details',
  providers: [AppService],
  template: `<div class="container">
    <h1 class="col-sm-12">Resource Details</h1>
    <div class="col-sm-12">
        <label class="col-sm-3">ID</label> <span>{{resource.id}}</span>
    </div>
    <div class="col-sm-12">
        <label class="col-sm-3">Name</label> <span>{{resource.name}}</span>
    </div>
    <div class="col-sm-12">
        <button class="btn btn-primary" (click)="getFoo()" type="submit">New Foo</button>
    </div>
</div>`
})

export class ResourceComponent {
  public resource = new Resource(1,'resource 1');
  private resourceUrl = 'http://localhost:9091/resource-server/api/hello/';

  constructor(private _service:AppService) {}

  getFoo(){
    this._service.getResource(this.resourceUrl+this.resource.id)
      .subscribe(
        data => this.resource = data,
        error =>  this.resource.name = 'Error');
  }
}

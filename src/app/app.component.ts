import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1> <md-slide-toggle>Slide me!</md-slide-toggle>  <app-tester></app-tester>`,
})
export class AppComponent  { name = 'Angular'; }

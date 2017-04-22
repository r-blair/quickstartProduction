import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MQService } from './../_core/services/media-query.service';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
   styleUrls: ['./tester.component.css']
})
export class TesterComponent implements OnInit {
  navFlex: string;
  navFlexOrder: string;
  navFlexOffset: string;
  navFlexAlign: string;

  exec: Subscription;
  constructor(private mqs: MQService) {}

  ngOnInit() { this.exec = this.mqs.feed( (x: string) => this.initialState(x)); }
  ngOnDestroy() { this.exec.unsubscribe(); }

  initialState(mqAlias: string){

        switch ( mqAlias ) {
          case 'xs':

          break;
          case 'sm':

          break;
          case 'md':

          break;
          case 'lg':

          break;
          case 'xl':

          break;
          default:
            console.log( mqAlias );
              }
      }


}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MQService } from '../../_core/services/media-query.services';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-bar-box',
  templateUrl: './bar-box.component.html',
   styleUrls: ['./bar-box.component.css']
})
export class BarBoxComponent implements OnInit, OnDestroy {

  // ADD ALL PROPERTIES HERE'
  // flex-layout properties
  //property: string;

  boxContainerLayout = 'column';
  boxContainerLayoutAlign = 'space-between stretch';
  boxNavContainerLayout = "column";
  boxNavContainerLayoutAlign = "space-around center";
  boxNavFlex = '0 1 auto';
  boxButtonLogoContainerLayout = 'row';
  boxButtonLogoContainerLayoutAlign = 'space-between center';
  boxButtonLogoContainerFlex = '110px';
  boxButtonFlex = '25';
  boxLogoFlex = '1 1 auto';
  boxLogoFlexAlign = '';

  // end flex-layout properties

  buttonShow = true;
  here = "bar-box";
  exec: Subscription;
  switch = new ASwitch();

  constructor(private mqs: MQService) {}

  ngOnInit() { this.exec = this.mqs.feed( x => this.initialState(x)); }
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MQService } from '../../_core/services/media-query.services';
import {Subscription} from 'rxjs/Subscription';
import { ASwitch, LayoutAlignSettings, LayoutSettings } from '../../_util/helpers/index';

@Component({
  selector: 'app-bar-box',
  templateUrl: './bar-box.component.html',
   styleUrls: ['./bar-box.component.css']
})
export class BarBoxComponent implements OnInit, OnDestroy {




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

  buttonShow = true;
  here = "bar-box";
  exec: Subscription;
  switch = new ASwitch();

  constructor(private mqs: MQService) {}

  ngOnInit() { this.exec = this.mqs.feed( x => this.initialState(x)); }
  ngOnDestroy() { this.exec.unsubscribe(); }
  toggle(){
    if (this.buttonShow){ this.switch.toggle() } else{};
      };

  initialState(mqAlias: string){

        switch(mqAlias){
          case 'xs':
            console.log(mqAlias);
            this.buttonShow = true;
            this.switch.state = 'inactive';
            this.boxContainerLayout = 'column';
            this.boxContainerLayoutAlign = 'space-between stretch';
            this.boxNavContainerLayout = "column";
            this.boxNavContainerLayoutAlign = "space-around center";

          break;
          case 'sm':
            console.log(mqAlias);
            this.buttonShow = true;
            this.switch.state = 'inactive';
            this.boxContainerLayout = 'column';
            this.boxContainerLayoutAlign = 'space-between stretch';
            this.boxNavContainerLayout = "column";
            this.boxNavContainerLayoutAlign = "space-around center";

          break;
          case 'md':
            console.log(mqAlias);
            this.buttonShow = false;
            this.switch.state = 'active';
            this.boxContainerLayout = 'row-reverse';
            this.boxContainerLayoutAlign = 'space-between stretch';
            this.boxNavContainerLayout = "row";
            this.boxNavContainerLayoutAlign = "start center";
            this.boxNavFlex = '1 1 auto';

          break;
          case 'lg':
            console.log(mqAlias);
            this.buttonShow = false;
            this.switch.state = 'active';
            this.boxContainerLayout = 'row-reverse';
            this.boxContainerLayoutAlign = 'space-between stretch';
            this.boxNavContainerLayout = "row";
            this.boxNavContainerLayoutAlign = "start center";
            this.boxNavFlex = '1 1 auto';

          break;
          case 'xl':
            console.log(mqAlias);
            this.buttonShow = false;
            this.switch.state = 'active';
            this.boxContainerLayout = 'row-reverse';
            this.boxContainerLayoutAlign = 'space-between stretch';
            this.boxNavContainerLayout = "row";
            this.boxNavContainerLayoutAlign = "start center";
            this.boxNavFlex = '1 1 auto';

          break;
          default:
            console.log(mqAlias);
              }
      }


}

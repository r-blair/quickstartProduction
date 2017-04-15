import { Injectable } from '@angular/core';
import {OpaqueToken} from '@angular/core';
import {MediaChange, ObservableMedia, RESPONSIVE_ALIASES} from '@angular/flex-layout';

import 'rxjs/add/operator/multicast';

import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observer} from 'rxjs/Observer';

@Injectable()
export class MQService {

  private bSub: BehaviorSubject<string>;
  private updater: Observable<string>;

  constructor(private media: ObservableMedia){

      const filtered = RESPONSIVE_ALIASES.filter(x => x.length == 2);
      let current: string;
      for(let i = 0; i <= filtered.length; ++i){
        if(media.isActive(filtered[i])){ current = filtered[i] } else {};
      }

    this.bSub = new BehaviorSubject(current);
    this.updater = media.asObservable().map(x => x.mqAlias).filter(x => filtered.includes(x)).multicast(this.bSub).refCount();
  }
  feed(obs: any)  {
    return this.updater.subscribe(obs);
  }
}

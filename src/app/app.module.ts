import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { CoreModule } from './_core/core.module';
import { SharedModule } from './_shared/shared.module';

import { AppComponent }  from './app.component';
import { TesterComponent } from './tester/tester.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports:      [
    BrowserModule,
    CoreModule,
    SharedModule, // Do I want this here?
    MaterialModule,
    FlexLayoutModule
    ],
  declarations: [ AppComponent, TesterComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

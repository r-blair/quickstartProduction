import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { CoreModule } from './_core/core.module';
import { SharedModule } from './_shared/shared.module';

import { AppComponent }  from './app.component';
import { TestComponent } from './test/test.component';
import { Test2Component } from './test2/test2.component';
import { Test3Component } from './test3/test3.component';

@NgModule({
  imports:      [
    BrowserModule,
    CoreModule,
    SharedModule, // Do I want this here?
    MaterialModule
    ],
  declarations: [ AppComponent, TestComponent, Test2Component, Test3Component ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

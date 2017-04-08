import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { CoreModule } from './_core/core.module';
import { SharedModule } from './_shared/shared.module';

import { AppComponent }  from './app.component';
import { TestComponent } from './test/test.component';

@NgModule({
  imports:      [
    BrowserModule,
    CoreModule,
    SharedModule, // Do I want this here?
    MaterialModule
    ],
  declarations: [ AppComponent, TestComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalculatorComponent } from './pages/calc/components/calculator/calculator.component';
import { CalcComponent } from './pages/calc/calc.component';



@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    CalcComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
     
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

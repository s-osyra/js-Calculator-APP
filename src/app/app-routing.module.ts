import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalcComponent } from './pages/calc/calc.component'

const routes: Routes = [
  {
    path: 'calculator', component: CalcComponent
  },
  {
    path: '**', redirectTo: '/calculator'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalcComponent } from './pages/calc/calc.component'
import { RoutingPaths } from './core/enums/routing-paths'

const routes: Routes = [
  {
    path: RoutingPaths.Calculator, component: CalcComponent
  },
  {
    path: RoutingPaths.All, redirectTo: '/calculator'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

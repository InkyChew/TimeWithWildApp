import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomMachineComponent } from './random-machine/random-machine.component';

const routes: Routes = [
  {path: '', redirectTo: 'random-machine', pathMatch: 'full'},
  {path: 'random-machine', component: RandomMachineComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

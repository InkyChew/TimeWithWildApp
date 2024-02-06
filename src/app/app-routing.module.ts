import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomMachineComponent } from './random-machine/random-machine.component';
import { SlotMachineComponent } from './slot-machine/slot-machine.component';
import { ImgConverterComponent } from './img-converter/img-converter.component';

const routes: Routes = [
  {path: '', redirectTo: 'random-machine', pathMatch: 'full'},
  {path: 'random-machine', component: RandomMachineComponent, pathMatch: 'full'},
  {path: 'slot-machine', component: SlotMachineComponent, pathMatch: 'full'},
  {path: 'img-converter', component: ImgConverterComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

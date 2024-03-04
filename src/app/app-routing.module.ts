import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyDatatableComponent } from './core/components/my-datatable/my-datatable.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

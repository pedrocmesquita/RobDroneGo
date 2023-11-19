// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingListComponent } from './components/building-list/building-list.component';

export const routes: Routes = [
  { path: 'buildings', component: BuildingListComponent },
  { path: '', redirectTo: '/buildings', pathMatch: 'full' }, // Redirect to buildings by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {

}

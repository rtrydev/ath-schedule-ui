import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from "./components/schedule/schedule.component";

const routes: Routes = [
  {
    path: '', redirectTo: 'browse', pathMatch: 'full'
  }, {
    path: 'browse', component: ScheduleComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

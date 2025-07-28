import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './roles-component/roles-component';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
  { path: '', component: RolesComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    MatTableModule,
    RolesComponent
  ]
})
export class RolesModule { }

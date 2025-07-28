import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users-component/users-component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

const routes: Routes = [
  { path: '', component: UsersComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    UsersComponent
  ]
})
export class UsersModule { }

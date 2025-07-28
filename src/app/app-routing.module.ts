// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/gaurds/auth.guard';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./users/users-module').then(m => m.UsersModule),
  },
  { 
    path: 'roles',
    loadChildren: () => import('./roles/roles-module').then(m => m.RolesModule),
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

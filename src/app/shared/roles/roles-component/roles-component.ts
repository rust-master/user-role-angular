import { Component } from '@angular/core';
import { RoleTable } from "../role-table-component/role-table-component";
import { MatDialog } from '@angular/material/dialog';
import { RoleForm } from '../role-form-component/role-form-component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-roles-component',
  imports: [RoleTable, MatButtonModule, MatIconModule],
  templateUrl: './roles-component.html',
  styleUrl: './roles-component.scss'
})
export class RolesComponent {
  roles: string[] = [];

 constructor(
    private dialog: MatDialog
  ) {}

  openAddRoleDialog() {
    this.dialog.open(RoleForm, {
      width: '520px', // Match user form dialog width
      maxWidth: '95vw'
    });
  }
}

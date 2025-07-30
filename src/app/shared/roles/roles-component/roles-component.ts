import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    const resolved = this.route.snapshot.data['roles'];
    console.log("🚀 ~ RolesComponent ~ constructor ~ resolved:", resolved);
    if (resolved) {
      if (typeof resolved.subscribe === 'function') {
        resolved.subscribe((roles: string[]) => this.roles = roles);
      } else {
        this.roles = resolved;
      }
    }
  }

  openAddRoleDialog() {
    this.dialog.open(RoleForm, {
      width: '520px', // Match user form dialog width
      maxWidth: '95vw'
    });
  }
}

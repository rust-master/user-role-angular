import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SharedService } from '../../shared.service';
import { RoleForm } from '../role-form-component/role-form-component';

@Component({
  selector: 'app-role-table',
  imports: [MatTableModule, MatDialogModule, MatIconModule],
  templateUrl: './role-table-component.html',
  styleUrl: './role-table-component.scss'
})
export class RoleTable implements OnInit {
  roles: string[] = [];

  constructor(
    private sharedService: SharedService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.sharedService.loadRoles();
    
    this.sharedService.roles$.subscribe({
      next: (roles) => {
        this.roles = roles;
        console.log('Roles loaded:', roles); // Optional debug log
      },
      error: (err) => {
        this.roles = [];
        console.error('Failed to load roles', err);
      }
    });
  }

  fetchRoles() {
    this.sharedService.getRoles().subscribe({
      next: (roles) => this.roles = roles,
      error: (err) => {
        console.error('Failed to fetch roles', err);
        this.roles = [];
      }
    });
  }

  openAddRoleDialog() {
    this.dialog.open(RoleForm, {
      width: '520px',
      maxWidth: '95vw'
    });
  }

  onDeleteRole(role: string) {
    if (confirm(`Are you sure you want to delete the role "${role}"?`)) {
      this.sharedService.deleteRole(role).subscribe({
        next: () => {
          this.fetchRoles();
        },
        error: (err) => {
          let msg = 'Failed to delete role. Please try again.';
          if (err?.error?.message) {
            msg = err.error.message;
          }
          alert(msg);
        }
      });
    }
  }

}

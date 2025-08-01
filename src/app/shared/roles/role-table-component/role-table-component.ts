import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RoleService } from '../../services/role.service';
import { RoleForm } from '../role-form-component/role-form-component';
import { Subject, takeUntil } from 'rxjs';
import {CdkDrag} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-role-table',
  imports: [MatTableModule, MatDialogModule, MatIconModule, CdkDrag],
  templateUrl: './role-table-component.html',
  styleUrl: './role-table-component.scss'
})
export class RoleTable implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  @Input()roles: string[] = [];

  constructor(
    private roleService: RoleService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (!this.roles || this.roles.length === 0) {
      this.roleService.loadRoles();

      this.roleService.roles$
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (roles) => {
            this.roles = roles;
            console.log('Roles loaded:', roles);
          },
          error: (err) => {
            this.roles = [];
            console.error('Failed to load roles', err);
          }
        });
    }
  }

  fetchRoles() {
    this.roleService.getRoles().subscribe({
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
      this.roleService.deleteRole(role).subscribe({
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

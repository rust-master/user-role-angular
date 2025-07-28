import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-role-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './role-form-component.html',
  styleUrl: './role-form-component.scss'
})
export class RoleForm {
  newRole: string = '';

  constructor(
    private roleService: RoleService,
    private dialogRef: MatDialogRef<RoleForm>
  ) {}

  addRole() {
    const role = this.newRole.trim();
    if (!role) return;
    this.roleService.addRole(role).subscribe({
      next: () => {
        this.newRole = '';
        this.closeDialog({ added: true });
      },
      error: (err) => {
        console.error('Failed to add role', err);
      }
    });
  }

  closeDialog(data?: any) {
    this.dialogRef.close(data);
  }
}

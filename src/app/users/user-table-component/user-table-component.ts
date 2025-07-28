import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SharedService, User } from '../../shared.service';

@Component({
  selector: 'app-user-table',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDialogModule
  ],
  templateUrl: './user-table-component.html',
  styleUrls: ['./user-table-component.scss']
})
export class UserTable implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = [
    'employee-id',
    'full-name',
    'email',
    'role',
    'pin-code',
    'status',
    'created-at',
    'actions'
  ];

  constructor(private sharedService: SharedService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // ✅ Manually trigger loadUsers (important for first-time loading)
    this.sharedService.loadUsers();

    // ✅ Subscribe to BehaviorSubject
    this.sharedService.users$.subscribe({
      next: (users) => {
        this.users = users;
        console.log('Users loaded:', users); // Optional debug log
      },
      error: (err) => {
        this.users = [];
        console.error('Failed to load users', err);
      }
    });
  }

  async openEditModal(user: User): Promise<void> {
    const dialogRef = this.dialog.open(
      // @ts-ignore
      (await import('../user-form-component/user-form-component')).UserForm,
      {
        width: '520px',
        maxWidth: '95vw',
        data: user
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.updated) {
        // users$ will auto-update via BehaviorSubject
        console.log('User updated, table refreshed.');
      }
    });
  }

  onDelete(user: User): void {
    this.sharedService.deleteUser(user.employeeId).subscribe({
      next: () => {
        console.log('User deleted successfully');
        // users$ will auto-update via BehaviorSubject
      },
      error: (err) => console.error('Failed to delete user:', err)
    });
  }

  onToggleStatus(user: User): void {
    const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    this.sharedService.updateUserStatus(user.employeeId, newStatus).subscribe({
      next: () => {
        console.log(`User status updated to ${newStatus}`);
        // users$ will auto-update via BehaviorSubject
      },
      error: (err) => console.error('Failed to update status:', err)
    });
  }
}


// subs to unsub
// unsub apis
// naming convention - compo
// app module
// 
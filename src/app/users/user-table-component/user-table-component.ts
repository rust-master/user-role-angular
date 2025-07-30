import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model';
import { Subscription } from 'rxjs';

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
  @Input() users: User[] = [];
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

  private subscription = new Subscription();
  

  constructor(private userService: UserService, private dialog: MatDialog) {}

   ngOnInit(): void {
    if (!this.users || this.users.length === 0) {
      const usersSub = this.userService.users$.subscribe({
        next: users => this.users = users,
        error: err => {
          console.error('Failed to load users', err);
          this.users = [];
        }
      });

      this.subscription.add(usersSub);
      this.userService.loadUsers();
    }
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
    this.userService.deleteUser(user.employeeId).subscribe({
      next: () => {
        console.log('User deleted successfully');
        // users$ will auto-update via BehaviorSubject
      },
      error: (err) => console.error('Failed to delete user:', err)
    });
  }

  onToggleStatus(user: User): void {
    const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    this.userService.updateUserStatus(user.employeeId, newStatus).subscribe({
      next: () => {
        console.log(`User status updated to ${newStatus}`);
        // users$ will auto-update via BehaviorSubject
      },
      error: (err) => console.error('Failed to update status:', err)
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // cleans up all
  }
}


// subs to unsub
// unsub apis
// naming convention - compo
// app module
//

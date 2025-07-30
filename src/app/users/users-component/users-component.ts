import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { UserForm } from '../user-form-component/user-form-component';
import { HttpClientModule } from '@angular/common/http';
import { UserTable } from '../user-table-component/user-table-component';

@Component({
  selector: 'app-users-component',
  imports: [UserTable, MatButtonModule, MatIconModule, MatToolbarModule, HttpClientModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './users-component.html',
  styleUrls: ['./users-component.scss']
})
export class UsersComponent {
  users: User[] = [];

  constructor(private dialog: MatDialog, private route: ActivatedRoute) {
    const resolved = this.route.snapshot.data['users'];
    console.log("🚀 ~ UsersComponent ~ constructor ~ resolved:", resolved);
    if (resolved) {
      // If resolver returns an observable, subscribe; if array, assign directly
      if (typeof resolved.subscribe === 'function') {
        resolved.subscribe((users: User[]) => this.users = users);
      } else {
        this.users = resolved;
      }
    }
  }

   openDialog(): void {
    const dialogRef = this.dialog.open(UserForm, {
      width: '500px',
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Dialog closed');
    });
  }
}

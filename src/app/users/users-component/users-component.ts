import { Component } from '@angular/core';
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

  constructor(private dialog: MatDialog) { }

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

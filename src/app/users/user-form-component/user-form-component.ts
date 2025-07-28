import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedService, User } from '../../shared.service';

@Component({
  selector: 'app-user-form',
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './user-form-component.html',
  styleUrls: ['./user-form-component.scss']
})
export class UserForm implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  roles: string[] = [];

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private dialogRef: MatDialogRef<UserForm>,
    @Inject(MAT_DIALOG_DATA) public data: User | null
  ) {
    this.userForm = this.fb.group({
      employeeId: ['', Validators.required],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      pinCode: ['', Validators.required],
      status: ['', Validators.required],
      createdAt: ['', Validators.required]
    });

    if (data) {
      this.isEditMode = true;
      this.userForm.patchValue(data);
      // Optionally disable employeeId in edit mode
      this.userForm.get('employeeId')?.disable();
    }
  }

  ngOnInit(): void {
    this.sharedService.getRoles().subscribe({
      next: (roles) => this.roles = roles,
      error: (err) => {
        this.roles = [];
        console.error('Failed to load roles', err);
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.getRawValue();
      if (this.isEditMode && this.data) {
        this.sharedService.updateUser(this.data.employeeId, userData).subscribe({
          next: (response) => {
            alert('✅ User updated successfully!');
            this.dialogRef.close({ updated: true });
          },
          error: (err) => {
            console.error('❌ Failed to update user:', err);
            alert('❌ Failed to update user. Please try again.');
          }
        });
      } else {
        this.sharedService.addUser(userData).subscribe({
          next: (response) => {
            alert('✅ User added successfully!');
            this.userForm.reset();
            this.dialogRef.close({ added: true });
          },
          error: (err) => {
            console.error('❌ Failed to add user:', err);
            alert('❌ Failed to add user. Please try again.');
          }
        });
      }
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}

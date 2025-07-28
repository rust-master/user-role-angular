import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  employeeId: string;
  fullName: string;
  email: string;
  role: string;
  pinCode: string;
  status: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private baseUrl = 'http://localhost:3000';

  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  private rolesSubject = new BehaviorSubject<string[]>([]);
  roles$ = this.rolesSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Load and emit users
  loadUsers(): void {
    this.http.get<User[]>(`${this.baseUrl}/users`).subscribe(users => {
      this.usersSubject.next(users);
    });
  }

  loadRoles(): void {
    this.http.get<string[]>(`${this.baseUrl}/roles`).subscribe(roles => {
      this.rolesSubject.next(roles);
    });
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  getUser(employeeId: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${employeeId}`);
  }

  getRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/roles`);
  }

  addUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, user).pipe(
      tap(() => this.loadUsers()) // Refresh users after add
    );
  }

  addRole(role: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/roles`, { role }).pipe(
      tap(() => this.loadRoles()) // Refresh users after add
    );
  }

  // Update user by employeeId
  updateUser(employeeId: string, user: Partial<User>): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${encodeURIComponent(employeeId)}`, user).pipe(
      tap(() => this.loadUsers())
    );
  }

  // Delete role by name
  deleteRole(roleName: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/roles/${encodeURIComponent(roleName)}`).pipe(
      tap(() => this.loadRoles()) // Refresh list after delete
    );
  }


  // ✅ Delete user by ID
  deleteUser(employeeId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${employeeId}`).pipe(
      tap(() => this.loadUsers()) // Refresh list after delete
    );
  }

  // ✅ Update user status
  updateUserStatus(employeeId: string, status: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/users/${employeeId}/status`, { status }).pipe(
      tap(() => this.loadUsers()) // Refresh list after update
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseUrl = 'http://localhost:3000';

  private rolesSubject = new BehaviorSubject<string[]>([]);
  roles$ = this.rolesSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadRoles(): void {
    this.http.get<string[]>(`${this.baseUrl}/roles`).subscribe(roles => {
      this.rolesSubject.next(roles);
    });
  }


  getRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/roles`);
  }

  addRole(role: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/roles`, { role }).pipe(
      tap(() => this.loadRoles()) // Refresh users after add
    );
  }

  // Delete role by name
  deleteRole(roleName: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/roles/${encodeURIComponent(roleName)}`).pipe(
      tap(() => this.loadRoles()) // Refresh list after delete
    );
  }
}

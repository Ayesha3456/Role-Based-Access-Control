import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://localhost:3000/api/roles'; // Adjust with your backend API URL

  constructor(private http: HttpClient) {}

  // Get all roles
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl);
  }

  // Get role by ID
  getRole(roleId: number): Observable<Role> {
    return this.http.get<Role>(`${this.apiUrl}/${roleId}`);
  }

  // Create a new role
  createRole(roleData: Role): Observable<Role> {
    return this.http.post<Role>(this.apiUrl, roleData);
  }

  // Update an existing role
  updateRole(roleId: number, role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.apiUrl}/${roleId}`, role);
  }

  // Delete a role
  deleteRole(roleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${roleId}`);
  }

  // Toggle a specific permission for a role
  togglePermission(roleId: number, permission: string): Observable<Role> {
    return this.http.patch<Role>(`${this.apiUrl}/${roleId}/permissions`, { permission });
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environment";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, userData);
  }

  updateUser(updatedUser: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${updatedUser.id}`, updatedUser);
  }

  getRoles(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/roles`);
  }

  createRole(roleData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/roles`, roleData);
  }

  updateUserRole(userId: number, roleId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/assign-role`, { role: roleId });
  }

  deactivateUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}/deactivate`);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`); // API call to delete a user
  }
}

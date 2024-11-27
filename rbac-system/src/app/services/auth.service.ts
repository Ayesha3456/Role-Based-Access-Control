import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  logout(): void {
    localStorage.removeItem('role');
  }

  getRole(): string {
    return localStorage.getItem('role') || 'guest';
  }
}

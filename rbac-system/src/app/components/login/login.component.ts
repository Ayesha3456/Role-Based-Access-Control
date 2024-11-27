import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent implements OnInit {
  role: string = '';
  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Retrieve the selected role from localStorage
    this.role = localStorage.getItem('selectedRole') || '';
    if (!this.role) {
      // Handle case if no role is selected
      this.router.navigate(['/']);
    }
    this.setSuggestedCredentials();
  }

  setSuggestedCredentials() {
    // Suggest username and password based on the selected role
    const defaultCredentials: { [key: string]: { username: string, password: string } } = {
      'Admin': { username: 'admin@example.com', password: 'admin123' },
      'SuperUser': { username: 'superuser@example.com', password: 'superuser123' },
    };

    if (this.role in defaultCredentials) {
      const creds = defaultCredentials[this.role];
      this.username = creds.username;
      this.password = creds.password;
    } else {
      this.username = '';
      this.password = '';
    }
  }

  login() {
    const isValidLogin = this.validateCredentials(this.username, this.password, this.role);

    if (isValidLogin) {
      console.log('Logged in successfully');
      // Store the role in localStorage and navigate to the respective dashboard
      localStorage.setItem('role', this.role);
      this.router.navigate([`/${this.role.toLowerCase()}-dashboard`]);
    } else {
      console.error('Invalid login credentials');
      this.loginError = true; // Show error message
    }
  }

  validateCredentials(username: string, password: string, role: string): boolean {
    const defaultCredentials: { [key: string]: { username: string, password: string } } = {
      'Admin': { username: 'admin@example.com', password: 'admin123' },
      'SuperUser': { username: 'superuser@example.com', password: 'superuser123' },
    };

    return defaultCredentials[role]?.username === username && defaultCredentials[role]?.password === password;
  }
}

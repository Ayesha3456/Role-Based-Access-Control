import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class AppComponent {
  selectedRole: string = '';
  roles = ['Admin', 'SuperUser']; // Available roles

  constructor(private router: Router) {}

  onRoleSelect(role: string) {
    this.selectedRole = role;
    // Store the selected role in localStorage
    localStorage.setItem('selectedRole', this.selectedRole);
    // Navigate to the login page after selecting a role
    this.router.navigate(['/login']);
  }
}

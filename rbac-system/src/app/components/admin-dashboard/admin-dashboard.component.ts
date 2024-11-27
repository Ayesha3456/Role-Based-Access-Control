import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoleModalComponent } from '../role-modal/role-modal.component';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  // Open the User Modal (for both creating and editing users)
  openUserModal(user?: User): void {
    const modalRef = this.modalService.open(UserModalComponent);
    if (user) {
      modalRef.componentInstance.user = user;
    }
    modalRef.componentInstance.userCreated.subscribe(() => {
      this.loadUsers(); // Refresh user list after creation or update
    });
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.loadUsers(); // Reload the users after deletion
      });
    }
  }
}

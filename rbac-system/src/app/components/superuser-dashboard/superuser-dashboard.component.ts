import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { RoleModalComponent } from '../role-modal/role-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role.model';

@Component({
  selector: 'app-superuser-dashboard',
  templateUrl: './superuser-dashboard.component.html',
  styleUrls: ['./superuser-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SuperUserDashboardComponent implements OnInit {
  users: User[] = [];
  roles: Role[] = [];
  filteredUsers: User[] = [];
  filteredRoles: Role[] = [];

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
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

  // Open the Role Modal (for creating or editing roles)
  openRoleModal(role?: Role): void {
    const modalRef = this.modalService.open(RoleModalComponent);
    if (role) {
      modalRef.componentInstance.role = { ...role }; // Pass a copy of the role for editing
    }
    modalRef.componentInstance.roleCreated.subscribe(() => {
      this.loadRoles(); // Refresh role-related data after creation or update
    });
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.loadUsers(); // Reload the users after deletion
      });
    }
  }

  // Delete role by ID
  deleteRole(roleId: number): void {
    if (confirm('Are you sure you want to delete this role?')) {
      this.roleService.deleteRole(roleId).subscribe(() => {
        this.loadRoles(); // Reload the roles after deletion
      });
    }
  }

  loadRoles(): void {
    this.roleService.getRoles().subscribe(
      (roles) => {
        this.roles = roles.map(role => ({
          ...role,
          permissions: role.permissions || [] // Default to empty array if undefined
        }));
      },
      (error) => {
        console.error('Error loading roles:', error);
      }
    );
  }
}

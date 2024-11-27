import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model'; // Make sure you import User

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UserModalComponent implements OnInit {
  @Input() user: User | undefined; // Declare the user property to accept input data
  username: string = '';
  address: string = ''; // New address field
  selectedRoleId: number | any;
  roles: Role[] = [];
  errorMessage: string = ''; // To store error message
  @Output() userCreated = new EventEmitter<void>();

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    if (this.user) {
      this.username = this.user.username;
      this.selectedRoleId = this.user.role.id; // Set the selected role from the user object
    }
    this.loadRoles();
  }

  loadRoles(): void {
    this.roleService.getRoles().subscribe(
      (data) => {
        this.roles = data;
      },
      (error) => {
        console.error('Error loading roles:', error);
        this.errorMessage = 'Failed to load roles. Please try again later.';
      }
    );
  }

  createUser(): void {
    if (this.username && this.selectedRoleId && this.address) {
      const newUser = {
        username: this.username,
        address: this.address,
        roleId: this.selectedRoleId
      };

      this.userService.createUser(newUser).subscribe(
        () => {
          this.userCreated.emit();
          this.activeModal.close();
        },
        (error) => {
          console.error('Error creating user:', error);
          this.errorMessage = 'Failed to create user. Please try again later.';
        }
      );
    } else {
      this.errorMessage = 'Please provide all required fields.';
    }
  }

  updateUser(): void {
    if (this.username && this.selectedRoleId && this.user) {
      const updatedUser = {
        id: this.user.id,
        username: this.username,
        roleId: this.selectedRoleId
      };

      this.userService.updateUser(updatedUser).subscribe(
        () => {
          this.userCreated.emit();
          this.activeModal.close();
        },
        (error) => {
          console.error('Error updating user:', error);
          this.errorMessage = 'Failed to update user. Please try again later.';
        }
      );
    } else {
      this.errorMessage = 'Please provide all required fields.';
    }
  }
}

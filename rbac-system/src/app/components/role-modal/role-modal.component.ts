import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Role } from '../../models/role.model';
import { RoleService } from '../../services/role.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RoleModalComponent implements OnInit {
  @Input() role: Role = { id: 0, name: '', permissions: [] };
  @Output() roleCreated = new EventEmitter<void>();

  availablePermissions: string[] = ['Read', 'Write', 'Delete'];  // Example permissions

  constructor(
    public activeModal: NgbActiveModal,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    // Initialize role if empty
    if (!this.role) {
      this.role = { id: 0, name: '', permissions: [] };
    }
    console.log('Role on modal open:', this.role);  // Log role to verify permissions are populated
  }

  // Save role with updated permissions (Create or Update)
  save(): void {
    // Log the role data before saving
    console.log('Role data before saving:', this.role);
    console.log('Permissions:', this.role.permissions);

    // Ensure permissions is an array and is not empty
    if (this.role && this.role.permissions && Array.isArray(this.role.permissions) && this.role.permissions.length > 0) {
      // Send a request to update the role
      this.roleService.updateRole(this.role.id, this.role).subscribe(
        (response) => {
          console.log('Role updated successfully:', response);
          this.role = response; // Update the role in the frontend
          this.roleCreated.emit(); // Emit the event to notify parent component
          this.activeModal.close(); // Close the modal
        },
        (error) => {
          console.error('Error saving role:', error);
        }
      );
    } else {
      // If no permissions are provided, log a message
      console.log('No permissions to save');
    }
  }
}

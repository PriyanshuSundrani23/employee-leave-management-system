import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveService, Leave } from '../../../services/leave.service';

@Component({
  selector: 'app-leave-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leave-list.html',
  styleUrl: './leave-list.css',
})
export class LeaveList implements OnInit {

  @Output() leaveSelected = new EventEmitter<number>();

  leaves: Leave[] = [];
  errorMessage: string = '';

  constructor(
    private leaveService: LeaveService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.errorMessage = '';
    this.leaveService.getLeaves().subscribe({
      next: (data: Leave[]) => {
        this.leaves = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching leaves:', err);
        this.errorMessage = 'Unable to load leaves.';
        this.cdr.detectChanges();
      }
    });
  }

  approveLeave(leave: Leave): void {
    this.updateLeaveStatus(leave, 'Approved');
  }

  rejectLeave(leave: Leave): void {
    this.updateLeaveStatus(leave, 'Rejected');
  }

  private updateLeaveStatus(leave: Leave, newStatus: string): void {
    if (!leave.id) return;

    const updatedLeave: Leave = {
      ...leave,
      status: newStatus
    };

    this.leaveService.updateLeave(leave.id, updatedLeave).subscribe({
      next: () => {
        this.refresh();
      },
      error: (err) => {
        console.error('Error updating leave status:', err);
        this.errorMessage = 'Unable to update leave status.';
        this.cdr.detectChanges();
      }
    });
  }

  editLeave(id?: number): void {
    if (id !== undefined) {
      this.leaveSelected.emit(id);
    }
  }

  deleteLeave(id?: number): void {
    if (id === undefined) return;

    const confirmDelete = confirm('Are you sure you want to delete this leave record?');
    if (confirmDelete) {
      this.leaveService.deleteLeave(id).subscribe({
        next: () => {
          this.refresh();
        },
        error: (err) => {
          console.error('Error deleting leave:', err);
          this.errorMessage = 'Unable to delete leave.';
          this.cdr.detectChanges();
        }
      });
    }
  }

}

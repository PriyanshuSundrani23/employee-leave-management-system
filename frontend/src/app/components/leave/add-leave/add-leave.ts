import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LeaveService, Leave } from '../../../services/leave.service';

@Component({
  selector: 'app-add-leave',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-leave.html',
  styleUrl: './add-leave.css',
})
export class AddLeave implements OnChanges {

  @Input() leaveId: number | null = null;
  @Output() leaveAdded = new EventEmitter<void>();

  successMessage: string = '';
  errorMessage: string = '';
  private currentStatus: string = 'Pending';

  leaveForm = new FormGroup({
    employeeId: new FormControl<number | null>(null, [Validators.required]),
    leaveType: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    reason: new FormControl('', [Validators.required])
  });

  constructor(private leaveService: LeaveService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['leaveId'] && this.leaveId) {
      this.errorMessage = '';
      this.successMessage = '';
      this.leaveService.getLeaveById(this.leaveId).subscribe({
        next: (leave: Leave) => {
          this.currentStatus = leave.status || 'Pending';
          this.leaveForm.patchValue({
            employeeId: leave.employeeId,
            leaveType: leave.leaveType,
            startDate: leave.startDate,
            endDate: leave.endDate,
            reason: leave.reason
          });
        },
        error: (err) => {
          console.error('Error fetching leave details:', err);
          this.errorMessage = 'Unable to load leave details.';
        }
      });
    }
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.leaveForm.invalid) {
      this.leaveForm.markAllAsTouched();
      return;
    }

    const leaveData: Leave = {
      employeeId: Number(this.leaveForm.value.employeeId) || 0,
      leaveType: this.leaveForm.value.leaveType || '',
      startDate: this.leaveForm.value.startDate || '',
      endDate: this.leaveForm.value.endDate || '',
      reason: this.leaveForm.value.reason || '',
      status: this.leaveId ? this.currentStatus : 'Pending'
    };

    if (this.leaveId) {
      this.leaveService.updateLeave(this.leaveId, leaveData).subscribe({
        next: () => {
          this.successMessage = 'Leave updated successfully.';
          this.leaveForm.reset();
          this.currentStatus = 'Pending';
          this.leaveId = null;
          this.leaveAdded.emit();
        },
        error: (err) => {
          console.error('Error updating leave:', err);
          this.errorMessage = 'Unable to save leave.';
        }
      });
    } else {
      this.leaveService.createLeave(leaveData).subscribe({
        next: () => {
          this.successMessage = 'Leave applied successfully.';
          this.leaveForm.reset();
          this.currentStatus = 'Pending';
          this.leaveAdded.emit();
        },
        error: (err) => {
          console.error('Error creating leave:', err);
          this.errorMessage = 'Unable to save leave.';
        }
      });
    }
  }

}

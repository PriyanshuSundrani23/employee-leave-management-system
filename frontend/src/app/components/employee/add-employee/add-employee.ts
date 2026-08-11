import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService, Employee } from '../../../services/employee.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
})
export class AddEmployee implements OnChanges {

  @Input() employeeId: number | null = null;
  @Output() employeeAdded = new EventEmitter<void>();

  successMessage: string = '';
  errorMessage: string = '';

  employeeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    department: new FormControl('', [Validators.required]),
    designation: new FormControl('', [Validators.required])
  });

  constructor(private employeeService: EmployeeService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employeeId'] && this.employeeId) {
      this.errorMessage = '';
      this.successMessage = '';
      this.employeeService.getEmployeeById(this.employeeId).subscribe({
        next: (emp: Employee) => {
          this.employeeForm.patchValue({
            name: emp.name,
            email: emp.email,
            department: emp.department,
            designation: emp.designation
          });
        },
        error: (err) => {
          console.error('Error fetching employee details:', err);
          this.errorMessage = 'Unable to load employee details.';
        }
      });
    }
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const employeeData: Employee = {
      name: this.employeeForm.value.name || '',
      email: this.employeeForm.value.email || '',
      department: this.employeeForm.value.department || '',
      designation: this.employeeForm.value.designation || ''
    };

    if (this.employeeId) {
      this.employeeService.updateEmployee(this.employeeId, employeeData).subscribe({
        next: () => {
          this.successMessage = 'Employee updated successfully.';
          this.employeeForm.reset();
          this.employeeId = null;
          this.employeeAdded.emit();
        },
        error: (err) => {
          console.error('Error updating employee:', err);
          this.errorMessage = 'Unable to save employee.';
        }
      });
    } else {
      this.employeeService.createEmployee(employeeData).subscribe({
        next: () => {
          this.successMessage = 'Employee added successfully.';
          this.employeeForm.reset();
          this.employeeAdded.emit();
        },
        error: (err) => {
          console.error('Error creating employee:', err);
          this.errorMessage = 'Unable to save employee.';
        }
      });
    }
  }

}

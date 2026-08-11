import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService, Employee } from '../../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {

  @Output() employeeSelected = new EventEmitter<number>();

  employees: Employee[] = [];
  errorMessage: string = '';

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.errorMessage = '';
    this.employeeService.getEmployees().subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        this.errorMessage = 'Unable to load employees.';
        this.cdr.detectChanges();
      }
    });
  }

  editEmployee(id?: number): void {
    if (id !== undefined) {
      this.employeeSelected.emit(id);
    }
  }

  deleteEmployee(id?: number): void {
    if (id === undefined) return;

    const confirmDelete = confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.refresh();
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
          this.errorMessage = 'Unable to delete employee.';
          this.cdr.detectChanges();
        }
      });
    }
  }

}

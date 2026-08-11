import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeList } from '../employee-list/employee-list';
import { AddEmployee } from '../add-employee/add-employee';

@Component({
  selector: 'app-employee-page',
  standalone: true,
  imports: [CommonModule, EmployeeList, AddEmployee],
  templateUrl: './employee-page.html',
  styleUrl: './employee-page.css',
})
export class EmployeePage {

  selectedEmployeeId: number | null = null;

  @ViewChild(EmployeeList) employeeList!: EmployeeList;

  onEmployeeAdded(): void {
    this.selectedEmployeeId = null;
    if (this.employeeList) {
      this.employeeList.refresh();
    }
  }

  onEmployeeSelected(id: number): void {
    this.selectedEmployeeId = id;
  }

}

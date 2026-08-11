import { Routes } from '@angular/router';
import { EmployeePage } from './components/employee/employee-page/employee-page';
import { LeavePage } from './components/leave/leave-page/leave-page';

export const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeePage },
  { path: 'leaves', component: LeavePage }
];

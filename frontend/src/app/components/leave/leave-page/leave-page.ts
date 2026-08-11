import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveList } from '../leave-list/leave-list';
import { AddLeave } from '../add-leave/add-leave';

@Component({
  selector: 'app-leave-page',
  standalone: true,
  imports: [CommonModule, LeaveList, AddLeave],
  templateUrl: './leave-page.html',
  styleUrl: './leave-page.css',
})
export class LeavePage {

  selectedLeaveId: number | null = null;

  @ViewChild(LeaveList) leaveList!: LeaveList;

  onLeaveAdded(): void {
    this.selectedLeaveId = null;
    if (this.leaveList) {
      this.leaveList.refresh();
    }
  }

  onLeaveSelected(id: number): void {
    this.selectedLeaveId = id;
  }

}

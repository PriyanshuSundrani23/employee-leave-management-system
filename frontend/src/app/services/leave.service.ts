import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Leave {
  id?: number;
  employeeId: number;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private apiUrl = 'http://localhost:8080/leaves';

  constructor(private http: HttpClient) {}

  getLeaves(): Observable<Leave[]> {
    return this.http.get<Leave[]>(this.apiUrl);
  }

  getLeaveById(id: number): Observable<Leave> {
    return this.http.get<Leave>(`${this.apiUrl}/${id}`);
  }

  createLeave(leave: Leave): Observable<Leave> {
    return this.http.post<Leave>(this.apiUrl, leave);
  }

  updateLeave(id: number, leave: Leave): Observable<Leave> {
    return this.http.put<Leave>(`${this.apiUrl}/${id}`, leave);
  }

  deleteLeave(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

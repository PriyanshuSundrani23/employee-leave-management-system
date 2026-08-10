package com.cognizant.backend.service;

import com.cognizant.backend.entity.Leave;
import com.cognizant.backend.exception.EmployeeNotFoundException;
import com.cognizant.backend.repository.LeaveRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveServiceImpl implements LeaveService {

    private final LeaveRepository leaveRepository;

    public LeaveServiceImpl(LeaveRepository leaveRepository) {
        this.leaveRepository = leaveRepository;
    }

    @Override
    public Leave createLeave(Leave leave) {
        return leaveRepository.save(leave);
    }

    @Override
    public List<Leave> getAllLeaves() {
        return leaveRepository.findAll();
    }

    @Override
    public Leave getLeaveById(Long id) {
        return leaveRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Leave with ID " + id + " not found"));
    }

    @Override
    public Leave updateLeave(Long id, Leave leaveDetails) {
        Leave existingLeave = leaveRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Leave with ID " + id + " not found"));

        existingLeave.setEmployeeId(leaveDetails.getEmployeeId());
        existingLeave.setLeaveType(leaveDetails.getLeaveType());
        existingLeave.setStartDate(leaveDetails.getStartDate());
        existingLeave.setEndDate(leaveDetails.getEndDate());
        existingLeave.setReason(leaveDetails.getReason());
        existingLeave.setStatus(leaveDetails.getStatus());

        return leaveRepository.save(existingLeave);
    }

    @Override
    public void deleteLeave(Long id) {
        Leave existingLeave = leaveRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Leave with ID " + id + " not found"));

        leaveRepository.deleteById(existingLeave.getId());
    }

}

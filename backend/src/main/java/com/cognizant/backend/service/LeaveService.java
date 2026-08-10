package com.cognizant.backend.service;

import com.cognizant.backend.entity.Leave;
import java.util.List;

public interface LeaveService {

    Leave createLeave(Leave leave);

    List<Leave> getAllLeaves();

    Leave getLeaveById(Long id);

    Leave updateLeave(Long id, Leave leave);

    void deleteLeave(Long id);

}

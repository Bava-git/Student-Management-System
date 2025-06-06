package com.studentmanagementsystem.service.schoolService;

import com.studentmanagementsystem.model.schoolModel.Leave;
import com.studentmanagementsystem.repository.schoolRepository.LeaveManagementRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveManagementService {

    @Autowired
    private LeaveManagementRepository leaveManagementRepository;

    public List<Leave> fullattendancelist() {
        return leaveManagementRepository.findAll();
    }

    public Leave addLeave(Leave leavemodel) {
        return leaveManagementRepository.save(leavemodel);
    }

    @Transactional
    public String deleteLeave(String LeaveId) {
        return leaveManagementRepository.deleteByLeaveId(LeaveId);
    }

}

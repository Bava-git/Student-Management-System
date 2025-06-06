package com.studentmanagementsystem.repository.schoolRepository;

import com.studentmanagementsystem.model.schoolModel.Leave;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaveManagementRepository extends JpaRepository<Leave, Long> {
    String deleteByLeaveId(String leaveId);
}

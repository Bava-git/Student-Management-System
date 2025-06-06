package com.studentmanagementsystem.controller.schoolController;

import com.studentmanagementsystem.model.schoolModel.Leave;
import com.studentmanagementsystem.service.schoolService.LeaveManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("school/leavemanagement")
public class LeaveManagementController {

    @Autowired
    private LeaveManagementService leaveManagementService;

    @GetMapping
    public List<Leave> FullLeaveList() {
        return leaveManagementService.fullattendancelist();
    }

    @PostMapping("/add")
    private Leave addLeave(@RequestBody Leave leavemodel) {
        return leaveManagementService.addLeave(leavemodel);
    }

    @DeleteMapping("/delete/{LeaveId}")
    private String deleteLeave(@PathVariable String LeaveId) {
        return leaveManagementService.deleteLeave(LeaveId);
    }

}

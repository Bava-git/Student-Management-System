package com.studentmanagementsystem.repository.schoolRepository;

import com.studentmanagementsystem.model.schoolModel.Medical;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MedicalRepository extends JpaRepository<Medical, Long> {
    List<Medical> findByStudentID(String studentID);

    Optional<Medical> findBystudentIDAndId(String studentID, long Id);
}

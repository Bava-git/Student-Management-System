package com.studentmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.studentmanagementsystem.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query(value = "SELECT * FROM studentpersonal WHERE student_id = :StudentID", nativeQuery = true)
    Student findbystudentId(String StudentID);
}

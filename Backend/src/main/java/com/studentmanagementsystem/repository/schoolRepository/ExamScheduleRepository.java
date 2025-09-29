package com.studentmanagementsystem.repository.schoolRepository;

import com.studentmanagementsystem.model.schoolModel.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamScheduleRepository extends JpaRepository<Exam, Long> {

    boolean deleteByExamId(String examId);

    List<Exam> findByExamGradeAndExamType(String examGrade, String examType);
}

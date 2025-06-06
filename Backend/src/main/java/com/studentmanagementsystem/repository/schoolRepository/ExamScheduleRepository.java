package com.studentmanagementsystem.repository.schoolRepository;

import com.studentmanagementsystem.model.schoolModel.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamScheduleRepository extends JpaRepository<Exam, Long> {
    String deleteByExamId(String examId);
//    @Modifying
//    @Transactional
//    @Query(value = "delete from examscheduledb where exam_id = :examId", nativeQuery = true)
//    void deletebyexamId(@Param("examId") String ExamId);
}

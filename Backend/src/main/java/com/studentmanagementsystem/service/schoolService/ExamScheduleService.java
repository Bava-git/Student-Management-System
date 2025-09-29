package com.studentmanagementsystem.service.schoolService;

import com.studentmanagementsystem.model.schoolModel.Exam;
import com.studentmanagementsystem.repository.schoolRepository.ExamScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ExamScheduleService {

    @Autowired
    private ExamScheduleRepository examScheduleRepository;

    public List<Exam> fullExamSchedule() {
        return examScheduleRepository.findAll();
    }

    public List<Exam> getByGradeAndType(String examGrade, String examType) {
        return examScheduleRepository.findByExamGradeAndExamType(examGrade, examType);
    }

    public Optional<Exam> addExam(Exam exam) {

        List<Exam> allExam = examScheduleRepository.findByExamGradeAndExamType(exam.getExamGrade(), exam.getExamType());
        boolean isUnique = allExam.stream()
                .noneMatch(item -> item.getExamSubjectName().equals(exam.getExamSubjectName()));
        if (isUnique) {
            return Optional.ofNullable(examScheduleRepository.save(exam));
        }
        return Optional.empty();

    }

    @Transactional
    public boolean deleteExam(String ExamId) {
        return examScheduleRepository.deleteByExamId(ExamId);
    }

}

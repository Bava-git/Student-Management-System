package com.studentmanagementsystem.service.schoolService;

import com.studentmanagementsystem.model.schoolModel.Exam;
import com.studentmanagementsystem.repository.schoolRepository.ExamScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.List;

@Service
public class ExamScheduleService {

    @Autowired
    private ExamScheduleRepository examScheduleRepository;

    public List<Exam> fullExamSchedule() {
        return examScheduleRepository.findAll();
    }

    public Exam addExam(Exam exammodel) {
        return examScheduleRepository.save(exammodel);
    }

    @Transactional
    public String deleteExam(String ExamId) {
        return examScheduleRepository.deleteByExamId(ExamId);
    }

}

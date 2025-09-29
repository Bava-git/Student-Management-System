package com.studentmanagementsystem.service.examsService;

import com.studentmanagementsystem.repository.examsRepository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamHubService {

    @Autowired
    private midterm1ModelRepository midterm1Rep;
    @Autowired
    private midterm2ModelRepository midterm2Rep;
    @Autowired
    private midterm3ModelRepository midterm3Rep;
    @Autowired
    private quarterlyModelRepository quarterlyRep;
    @Autowired
    private halfyearlyModelRepository halfYearlyRep;
    @Autowired
    private annualModelRepository annualRep;
    @Autowired
    private ExamHubRepository examHubRep;

    public List<?> getAllData(String examName) {

        switch (examName) {
            case "midterm1" -> {
                return midterm1Rep.findAll();
            }
            case "midterm2" -> {
                return midterm2Rep.findAll();
            }
            case "midterm3" -> {
                return midterm3Rep.findAll();
            }
            case "quarterly" -> {
                return quarterlyRep.findAll();
            }
            case "halfyearly" -> {
                return halfYearlyRep.findAll();
            }
            case "annual" -> {
                return annualRep.findAll();
            }
            default -> {
                throw new RuntimeException();
            }
        }
    }

    public List<?> getAllDataByGrade(String examName, String StudentGrade) {

        switch (examName) {
            case "midterm1" -> {
                return midterm1Rep.findByStudentGrade(StudentGrade);
            }
            case "midterm2" -> {
                return midterm2Rep.findByStudentGrade(StudentGrade);
            }
            case "midterm3" -> {
                return midterm3Rep.findByStudentGrade(StudentGrade);
            }
            case "quarterly" -> {
                return quarterlyRep.findByStudentGrade(StudentGrade);
            }
            case "halfyearly" -> {
                return halfYearlyRep.findByStudentGrade(StudentGrade);
            }
            case "annual" -> {
                return annualRep.findByStudentGrade(StudentGrade);
            }
            default -> {
                throw new RuntimeException();
            }
        }

    }


}

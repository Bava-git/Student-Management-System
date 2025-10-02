package com.studentmanagementsystem.controller.examsController;

import com.studentmanagementsystem.dto.ExamHubDTO;
import com.studentmanagementsystem.model.examsModel.*;
import com.studentmanagementsystem.model.schoolModel.AssessmentResult;
import com.studentmanagementsystem.repository.examsRepository.*;
import com.studentmanagementsystem.repository.schoolRepository.AssessmentResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ExamUploadFile {

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
    private AssessmentResultRepository assessmentResultRep;

    @PostMapping("/student/marksheet/upload/{examName}/{studentGrade}")
    public ResponseEntity<String> uploadFile_midterm1(
            @RequestParam("file") MultipartFile file,
            @PathVariable String examName,
            @PathVariable String studentGrade) {
        try {
            // Process the uploaded file

            List<ExamHubDTO> entities = parseFileExamHub(file);
            switch (examName) {
                case "midterm1" -> {
                    List<Midterm_One> items = entities.stream()
                            .map(data -> new Midterm_One(data))
                            .collect(Collectors.toList());
                    midterm1Rep.saveAll(items);
                }
                case "midterm2" -> {
                    List<Midterm_Two> items = entities.stream()
                            .map(data -> new Midterm_Two(data))
                            .collect(Collectors.toList());
                    midterm2Rep.saveAll(items);
                }
                case "midterm3" -> {
                    List<Midterm_Three> items = entities.stream()
                            .map(data -> new Midterm_Three(data))
                            .collect(Collectors.toList());
                    midterm3Rep.saveAll(items);
                }
                case "quarterly" -> {
                    List<Quarterly> items = entities.stream()
                            .map(data -> new Quarterly(data))
                            .collect(Collectors.toList());
                    quarterlyRep.saveAll(items);
                }
                case "halfyearly" -> {
                    List<Half_yearly> items = entities.stream()
                            .map(data -> new Half_yearly(data))
                            .collect(Collectors.toList());
                    halfYearlyRep.saveAll(items);
                }
                case "annual" -> {
                    List<Annual> items = entities.stream()
                            .map(data -> new Annual(data))
                            .collect(Collectors.toList());
                    annualRep.saveAll(items);
                }
                case "assessment" -> {
                    List<AssessmentResult> Assessment = parseFile_assessmentResult(file);
                    System.out.println("Passed");
                    assessmentResultRep.saveAll(Assessment);
                }
                default -> throw new RuntimeException("Invalid exam name: " + examName);
            }


            return ResponseEntity.ok("File uploaded and data saved successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing file: " + e.getMessage());
        }
    }

    private List<ExamHubDTO> parseFileExamHub(MultipartFile file) throws IOException {
        List<ExamHubDTO> entities = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;

            while ((line = reader.readLine()) != null) {

                String[] fields = line.split(",");
                ExamHubDTO entity = new ExamHubDTO();

                entity.setStudentGrade(fields[0].trim());
                entity.setStudentID(fields[1].trim());
                entity.setTamil(fields[2].trim());
                entity.setEnglish(fields[3].trim());
                entity.setMaths(fields[4].trim());
                entity.setScience(fields[5].trim());
                entity.setSocialscience(fields[6].trim());

                entities.add(entity);
            }
        }

        return entities;
    }

    private List<AssessmentResult> parseFile_assessmentResult(MultipartFile file) throws IOException {
        List<AssessmentResult> entities = new ArrayList<>();

        // Parse the CSV file
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] fields = line.split(",");
                AssessmentResult entity = new AssessmentResult();
                entity.setTeacherID(Long.parseLong(fields[0]));
                entity.setStudentGrade(fields[1]);
                entity.setStudentID(fields[2]);
                entity.setAssessmentId(fields[3]);
                entity.setAssessmentMark(Double.valueOf(fields[4]));
                // Map fields to your entity
                entities.add(entity);
            }
        }
        return entities;
    }

    @GetMapping("studentreport/{Student_id}")
    public Map<String, Object> getdataforthisid(@PathVariable String Student_id) {
        List<Midterm_One> mid1mark = midterm1Rep.findbystudentId(Student_id);
        List<Midterm_Two> mid2mark = midterm2Rep.findbystudentId(Student_id);
        List<Midterm_Three> mid3mark = midterm3Rep.findbystudentId(Student_id);
        List<Quarterly> quarterlymark = quarterlyRep.findbystudentId(Student_id);
        List<Half_yearly> halfyearlymark = halfYearlyRep.findbystudentId(Student_id);
        List<Annual> annualmark = annualRep.findbystudentId(Student_id);
        List<AssessmentResult> assessmentmark = assessmentResultRep.findByStudentID(Student_id);

        Map<String, Object> markContainer = new LinkedHashMap<>();
        markContainer.put("Mid Term 1", mid1mark);
        markContainer.put("Quarterly", quarterlymark);
        markContainer.put("Mid Term 2", mid2mark);
        markContainer.put("Half Yearly", halfyearlymark);
        markContainer.put("Mid Term 3", mid3mark);
        markContainer.put("Annual", annualmark);
        markContainer.put("Assessment Mark", assessmentmark);

        return markContainer;

    }

}

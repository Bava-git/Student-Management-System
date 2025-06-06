package com.studentmanagementsystem.controller.examsController;

import com.studentmanagementsystem.model.examsModel.*;
import com.studentmanagementsystem.model.schoolModel.AssessmentResult;
import com.studentmanagementsystem.repository.AssessmentResultRepository;
import com.studentmanagementsystem.repository.examsRepository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ExamUploadFile {

    @Autowired
    private midterm1ModelRepository midterm1ModelRepository;

    @PostMapping("student/midterm1/upload")
    public ResponseEntity<String> uploadFile_midterm1(@RequestParam("file") MultipartFile file) {
        try {
            // Process the uploaded file
            List<Midterm_One> entities = parseFile_midterm1(file);

            // Save to the database
            midterm1ModelRepository.saveAll(entities);

            return ResponseEntity.ok("File uploaded and data saved successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing file: " + e.getMessage());
        }
    }

    private List<Midterm_One> parseFile_midterm1(MultipartFile file) throws IOException {
        List<Midterm_One> entities = new ArrayList<>();

        // Parse the CSV file
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] fields = line.split(",");
                Midterm_One entity = new Midterm_One();
                entity.setStudentGrade(fields[0]);
                entity.setStudentID(fields[1]);
                entity.setTamil(fields[2]);
                entity.setEnglish(fields[3]);
                entity.setMaths(fields[4]);
                entity.setScience(fields[5]);
                entity.setSocialscience(fields[6]);
                // Map fields to your entity
                entities.add(entity);
            }
        }
        return entities;
    }

    @Autowired
    private midterm2ModelRepository midterm2ModelRepository;

    @PostMapping("student/midterm2/upload")
    public ResponseEntity<String> uploadFile_midterm2(@RequestParam("file") MultipartFile file) {
        try {
            // Process the uploaded file
            List<Midterm_Two> entities = parseFile_midterm2(file);

            // Save to the database
            midterm2ModelRepository.saveAll(entities);

            return ResponseEntity.ok("File uploaded and data saved successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing file: " + e.getMessage());
        }
    }

    private List<Midterm_Two> parseFile_midterm2(MultipartFile file) throws IOException {
        List<Midterm_Two> entities = new ArrayList<>();

        // Parse the CSV file
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] fields = line.split(",");
                Midterm_Two entity = new Midterm_Two();
                entity.setStudentGrade(fields[0]);
                entity.setStudentID(fields[1]);
                entity.setTamil(fields[2]);
                entity.setEnglish(fields[3]);
                entity.setMaths(fields[4]);
                entity.setScience(fields[5]);
                entity.setSocialscience(fields[6]);
                // Map fields to your entity
                entities.add(entity);
            }
        }
        return entities;
    }

    @Autowired
    private midterm3ModelRepository midterm3ModelRepository;

    @PostMapping("student/midterm3/upload")
    public ResponseEntity<String> uploadFile_midterm3(@RequestParam("file") MultipartFile file) {
        try {
            // Process the uploaded file
            List<Midterm_Three> entities = parseFile_midterm3(file);

            // Save to the database
            midterm3ModelRepository.saveAll(entities);

            return ResponseEntity.ok("File uploaded and data saved successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing file: " + e.getMessage());
        }
    }

    private List<Midterm_Three> parseFile_midterm3(MultipartFile file) throws IOException {
        List<Midterm_Three> entities = new ArrayList<>();

        // Parse the CSV file
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] fields = line.split(",");
                Midterm_Three entity = new Midterm_Three();
                entity.setStudentGrade(fields[0]);
                entity.setStudentID(fields[1]);
                entity.setTamil(fields[2]);
                entity.setEnglish(fields[3]);
                entity.setMaths(fields[4]);
                entity.setScience(fields[5]);
                entity.setSocialscience(fields[6]);
                // Map fields to your entity
                entities.add(entity);
            }
        }
        return entities;
    }

    @Autowired
    private quarterlyModelRepository quarterlyModelRepository;

    @PostMapping("student/quarterly/upload")
    public ResponseEntity<String> uploadFile_quarterly(@RequestParam("file") MultipartFile file) {
        try {
            // Process the uploaded file
            List<Quarterly> entities = parseFile_quarterly(file);

            // Save to the database
            quarterlyModelRepository.saveAll(entities);

            return ResponseEntity.ok("File uploaded and data saved successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing file: " + e.getMessage());
        }
    }

    private List<Quarterly> parseFile_quarterly(MultipartFile file) throws IOException {
        List<Quarterly> entities = new ArrayList<>();

        // Parse the CSV file
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] fields = line.split(",");
                Quarterly entity = new Quarterly();
                entity.setStudentGrade(fields[0]);
                entity.setStudentID(fields[1]);
                entity.setTamil(fields[2]);
                entity.setEnglish(fields[3]);
                entity.setMaths(fields[4]);
                entity.setScience(fields[5]);
                entity.setSocialscience(fields[6]);
                // Map fields to your entity
                entities.add(entity);
            }
        }
        return entities;
    }

    @Autowired
    private halfyearlyModelRepository halfyearlymodelrepository;

    @PostMapping("student/halfyearly/upload")
    public ResponseEntity<String> uploadFile_halfyearly(@RequestParam("file") MultipartFile file) {
        try {
            // Process the uploaded file
            List<Half_yearly> entities = parseFile_halfyearly(file);

            // Save to the database
            halfyearlymodelrepository.saveAll(entities);

            return ResponseEntity.ok("File uploaded and data saved successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing file: " + e.getMessage());
        }
    }

    private List<Half_yearly> parseFile_halfyearly(MultipartFile file) throws IOException {
        List<Half_yearly> entities = new ArrayList<>();

        // Parse the CSV file
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] fields = line.split(",");
                Half_yearly entity = new Half_yearly();
                entity.setStudentGrade(fields[0]);
                entity.setStudentID(fields[1]);
                entity.setTamil(fields[2]);
                entity.setEnglish(fields[3]);
                entity.setMaths(fields[4]);
                entity.setScience(fields[5]);
                entity.setSocialscience(fields[6]);
                // Map fields to your entity
                entities.add(entity);
            }
        }
        return entities;
    }

    @Autowired
    private annualModelRepository annualmodelrepository;

    @PostMapping("student/annual/upload")
    public ResponseEntity<String> uploadFile_annual(@RequestParam("file") MultipartFile file) {
        try {
            // Process the uploaded file
            List<Annual> entities = parseFile_annual(file);

            // Save to the database
            annualmodelrepository.saveAll(entities);

            return ResponseEntity.ok("File uploaded and data saved successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing file: " + e.getMessage());
        }
    }

    private List<Annual> parseFile_annual(MultipartFile file) throws IOException {
        List<Annual> entities = new ArrayList<>();

        // Parse the CSV file
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] fields = line.split(",");
                Annual entity = new Annual();
                entity.setStudentGrade(fields[0]);
                entity.setStudentID(fields[1]);
                entity.setTamil(fields[2]);
                entity.setAnnualenglish(fields[3]);
                entity.setMaths(fields[4]);
                entity.setScience(fields[5]);
                entity.setSocialscience(fields[6]);
                // Map fields to your entity
                entities.add(entity);
            }
        }
        return entities;
    }

    @Autowired
    private AssessmentResultRepository assessmentResultRepository;

    @PostMapping("student/assessment/upload")
    public ResponseEntity<String> uploadFile_assessmentResult(@RequestParam("file") MultipartFile file) {
        try {
            // Process the uploaded file
            List<AssessmentResult> entities = parseFile_assessmentResult(file);

            // Save to the database
            assessmentResultRepository.saveAll(entities);

            return ResponseEntity.ok("File uploaded and data saved successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing file: " + e.getMessage());
        }
    }

    private List<AssessmentResult> parseFile_assessmentResult(MultipartFile file) throws IOException {
        List<AssessmentResult> entities = new ArrayList<>();

        // Parse the CSV file
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] fields = line.split(",");
                AssessmentResult entity = new AssessmentResult();
                entity.setStudentID(fields[0]);
                entity.setStudentGrade(fields[1]);
                entity.setAssessmentNote(fields[2]);
                entity.setAssessmentMark(Double.valueOf(fields[3]));
                entity.setTeacherID(Long.parseLong(fields[4]));
                // Map fields to your entity
                entities.add(entity);
            }
        }
        return entities;
    }

    @GetMapping("studentreport/{Student_id}")
    public List<Object> getdataforthisid(@PathVariable String Student_id,
                                         Midterm_One midterm1model, Midterm_Two midterm2model,
                                         Midterm_Three midterm3model, Quarterly quarterlyModel,
                                         Half_yearly halfyearlyModel, Annual annualModel) {
        List<Midterm_One> mid1mark = midterm1ModelRepository.findbystudentId(Student_id);
        List<Midterm_Two> mid2mark = midterm2ModelRepository.findbystudentId(Student_id);
        List<Midterm_Three> mid3mark = midterm3ModelRepository.findbystudentId(Student_id);
        List<Quarterly> quarterlymark = quarterlyModelRepository.findbystudentId(Student_id);
        List<Half_yearly> halfyearlymark = halfyearlymodelrepository.findbystudentId(Student_id);
        List<Annual> annualmark = annualmodelrepository.findbystudentId(Student_id);
        List<AssessmentResult> assessmentmark = assessmentResultRepository.findByStudentID(Student_id);


        List<Object> allMarks = new ArrayList<>();
        allMarks.addAll(mid1mark);
        allMarks.addAll(mid2mark);
        allMarks.addAll(mid3mark);
        allMarks.addAll(quarterlymark);
        allMarks.addAll(halfyearlymark);
        allMarks.addAll(annualmark);
        allMarks.addAll(assessmentmark);
        return allMarks;

    }

}

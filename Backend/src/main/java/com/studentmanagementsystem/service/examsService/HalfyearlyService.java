package com.studentmanagementsystem.service.examsService;

import com.studentmanagementsystem.model.examsModel.Half_yearly;
import com.studentmanagementsystem.repository.examsRepository.halfyearlyModelRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HalfyearlyService {

    @Autowired
    private halfyearlyModelRepository halfyearlyModelRepository;

    public Optional<Half_yearly> getStudentById(long StudentID) {
        return halfyearlyModelRepository.findById(StudentID);
    }

    public List<Half_yearly> listStudents() {
        return halfyearlyModelRepository.findAll();
    }

    public Half_yearly addStudent(Half_yearly halfyearlyReport) {
        return halfyearlyModelRepository.save(halfyearlyReport);
    }

    public void deleteStudent(long StudentID) {
        halfyearlyModelRepository.deleteById(StudentID);
    }

    public void updateTeacher(long StudentID, Half_yearly updatestudent) {
        Half_yearly existTeacher = halfyearlyModelRepository.findById(StudentID).orElse(null);

        if (existTeacher != null) {
//            existTeacher.setStudentID(updatestudent.getStudentID());
//            existTeacher.setStudentName(updatestudent.getStudentName());
//            existTeacher.setStudentFatherName(updatestudent.getStudentFatherName());
//            existTeacher.setStudentMotherName(updatestudent.getStudentMotherName());

            BeanUtils.copyProperties(updatestudent, existTeacher);
            halfyearlyModelRepository.save(existTeacher);
        } else {
            throw new RuntimeException("Teacher is not exist");
        }
    }
}

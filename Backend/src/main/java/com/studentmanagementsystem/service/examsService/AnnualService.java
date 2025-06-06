package com.studentmanagementsystem.service.examsService;

import com.studentmanagementsystem.model.examsModel.Annual;
import com.studentmanagementsystem.repository.examsRepository.annualModelRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnnualService {

    @Autowired
    private annualModelRepository annualModelRepository;

    public Optional<Annual> getStudentById(long StudentID) {
        return annualModelRepository.findById(StudentID);
    }

    public List<Annual> listStudents() {
        return annualModelRepository.findAll();
    }

    public Annual addStudent(Annual annualReport) {
        return annualModelRepository.save(annualReport);
    }

    public void deleteStudent(long StudentID) {
        annualModelRepository.deleteById(StudentID);
    }

    public void updateTeacher(long StudentID, Annual updatestudent) {
        Annual existTeacher = annualModelRepository.findById(StudentID).orElse(null);

        if (existTeacher != null) {
//            existTeacher.setStudentID(updatestudent.getStudentID());
//            existTeacher.setStudentName(updatestudent.getStudentName());
//            existTeacher.setStudentFatherName(updatestudent.getStudentFatherName());
//            existTeacher.setStudentMotherName(updatestudent.getStudentMotherName());

            BeanUtils.copyProperties(updatestudent, existTeacher);
            annualModelRepository.save(existTeacher);
        } else {
            throw new RuntimeException("Teacher is not exist");
        }
    }
}

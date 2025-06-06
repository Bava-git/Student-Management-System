package com.studentmanagementsystem.service.examsService;

import com.studentmanagementsystem.model.examsModel.Quarterly;
import com.studentmanagementsystem.repository.examsRepository.quarterlyModelRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuarterlyService {

    @Autowired
    private quarterlyModelRepository quarterlyModelRepository;

    public Optional<Quarterly> getStudentById(long StudentID) {
        return quarterlyModelRepository.findById(StudentID);
    }

    public List<Quarterly> listStudents() {
        return quarterlyModelRepository.findAll();
    }

    public Quarterly addStudent(Quarterly quarterlyReport) {
        return quarterlyModelRepository.save(quarterlyReport);
    }

    public void deleteStudent(long StudentID) {
        quarterlyModelRepository.deleteById(StudentID);
    }

    public void updateTeacher(long StudentID, Quarterly updatestudent) {
        Quarterly existTeacher = quarterlyModelRepository.findById(StudentID).orElse(null);

        if (existTeacher != null) {
//            existTeacher.setStudentID(updatestudent.getStudentID());
//            existTeacher.setStudentName(updatestudent.getStudentName());
//            existTeacher.setStudentFatherName(updatestudent.getStudentFatherName());
//            existTeacher.setStudentMotherName(updatestudent.getStudentMotherName());

            BeanUtils.copyProperties(updatestudent, existTeacher);
            quarterlyModelRepository.save(existTeacher);
        } else {
            throw new RuntimeException("Teacher is not exist");
        }
    }
}

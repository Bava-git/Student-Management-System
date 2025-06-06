package com.studentmanagementsystem.service.examsService;

import com.studentmanagementsystem.model.examsModel.Midterm_One;
import com.studentmanagementsystem.repository.examsRepository.midterm1ModelRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Midterm1Service {

    @Autowired
    private midterm1ModelRepository midterm1ModelRepository;

    public Optional<Midterm_One> getStudentById(long StudentID) {
        return midterm1ModelRepository.findById(StudentID);
    }

    public List<Midterm_One> listStudents() {
        return midterm1ModelRepository.findAll();
    }

    public Midterm_One addStudent(Midterm_One midterm1Report) {
        return midterm1ModelRepository.save(midterm1Report);
    }

    public void deleteStudent(long StudentID) {
        midterm1ModelRepository.deleteById(StudentID);
    }

    public void updateTeacher(long StudentID, Midterm_One updatestudent) {
        Midterm_One existTeacher = midterm1ModelRepository.findById(StudentID).orElse(null);

        if (existTeacher != null) {
//            existTeacher.setStudentID(updatestudent.getStudentID());
//            existTeacher.setStudentName(updatestudent.getStudentName());
//            existTeacher.setStudentFatherName(updatestudent.getStudentFatherName());
//            existTeacher.setStudentMotherName(updatestudent.getStudentMotherName());

            BeanUtils.copyProperties(updatestudent, existTeacher);
            midterm1ModelRepository.save(existTeacher);
        } else {
            throw new RuntimeException("Teacher is not exist");
        }
    }
}

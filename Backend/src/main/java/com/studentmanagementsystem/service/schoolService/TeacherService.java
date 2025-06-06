package com.studentmanagementsystem.service.schoolService;

import com.studentmanagementsystem.model.schoolModel.Teacher;
import com.studentmanagementsystem.repository.schoolRepository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    public Optional<Teacher> getTeacherById(long id) {
        return teacherRepository.findById(id);
    }

    public List<Teacher> listTeachers() {
        return teacherRepository.findAll();
    }

    public Teacher addTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    public void updateTeacher(long TeacherID, Teacher updateteacher) {
        Teacher existTeacher = teacherRepository.findById(TeacherID).orElse(null);

        if (existTeacher != null) {
            existTeacher.setTeacherName(updateteacher.getTeacherName());
            existTeacher.setTeacherDOB(updateteacher.getTeacherDOB());
            existTeacher.setTeacherGender(updateteacher.getTeacherGender());
            existTeacher.setTeacherStreetName(updateteacher.getTeacherStreetName());
            existTeacher.setTeacherCity(updateteacher.getTeacherCity());
            existTeacher.setTeacherMaritalStatus(updateteacher.getTeacherMaritalStatus());
            existTeacher.setTeacherPhoneNum(updateteacher.getTeacherPhoneNum());
            existTeacher.setTeacherEmail(updateteacher.getTeacherEmail());
            existTeacher.setTeacherEducation(updateteacher.getTeacherEducation());
            existTeacher.setTeacherCourse(updateteacher.getTeacherCourse());
            existTeacher.setTeacherAadharNum(updateteacher.getTeacherAadharNum());
            existTeacher.setTeacherDateOfHire(updateteacher.getTeacherDateOfHire());
            existTeacher.setTeacherPreviousEmployment(updateteacher.getTeacherPreviousEmployment());
            existTeacher.setTeacherExperience(updateteacher.getTeacherExperience());
            existTeacher.setTeacherSalary(updateteacher.getTeacherSalary());
            existTeacher.setTeacherBackgroundCheck(updateteacher.isTeacherBackgroundCheck());
            existTeacher.setTeacherSubject(updateteacher.getTeacherSubject());

            teacherRepository.save(existTeacher);
        } else {
            throw new RuntimeException("Teacher is not exist");
        }
    }

    public void deleteTeacher(long TeacherID) {
        teacherRepository.deleteById(TeacherID);
    }

    public Teacher getteacherbyteacherid(long TeacherID){
        return teacherRepository.getteacherbyteacherid(TeacherID);
    }


}

package com.studentmanagementsystem.repository.schoolRepository;

import com.studentmanagementsystem.model.schoolModel.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {

    @Query(value = "SELECT * FROM teacherdb WHERE teacher_id = :TeacherID", nativeQuery = true)
    Teacher getteacherbyteacherid(long TeacherID);


}

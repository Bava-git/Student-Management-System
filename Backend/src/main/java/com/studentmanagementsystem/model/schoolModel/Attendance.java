package com.studentmanagementsystem.model.schoolModel;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "attendancedb")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @JsonProperty("student_id")
    @Column(name = "student_id")
    private String StudentID;

    @JsonProperty("student_name")
    @Column(name = "student_name")
    private String StudentName;

    @JsonProperty("teacher_id")
    @Column(name = "teacher_id")
    private long TeacherID;

    @JsonProperty("student_level")
    @Column(name = "student_level")
    private String StudentLevel;

    @JsonProperty("absent_date")
    @Column(name = "absent_date")
    private Date AbsentData;
}

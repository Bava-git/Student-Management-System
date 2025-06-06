package com.studentmanagementsystem.model.schoolModel;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "assessmentresultdb")
public class AssessmentResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @JsonProperty("teacher_id")
    @Column(name = "teacher_id")
    private long TeacherID;

    @JsonProperty("teacher_name")
    @Column(name = "teacher_name")
    private String TeacherName;

    @JsonProperty("student_id")
    @Column(name = "student_id")
    private String studentID;

    @JsonProperty("student_grade")
    @Column(name = "student_grade")
    private String StudentGrade;

    @JsonProperty("assessmentNote")
    @Column(name = "assessmentNote")
    private String assessmentNote;

    @JsonProperty("assessmentMark")
    @Column(name = "assessmentMark")
    private Double assessmentMark;

    @JsonProperty("assessmentId")
    @Column(name = "assessmentId")
    private String assessmentId;

}

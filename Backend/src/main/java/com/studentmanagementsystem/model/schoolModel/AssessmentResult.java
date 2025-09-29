package com.studentmanagementsystem.model.schoolModel;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.studentmanagementsystem.dto.ExamHubDTO;
import com.studentmanagementsystem.model.Student;
import com.studentmanagementsystem.model.Teacher;
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

    @JsonProperty("student_grade")
    @Column(name = "student_grade")
    private String StudentGrade;

    @JsonProperty("assessmentMark")
    @Column(name = "assessmentMark")
    private Double assessmentMark;

    @JsonProperty("assessmentId")
    @Column(name = "assessmentId", insertable = false, updatable = false)
    private String assessmentId;

    @ManyToOne
    @JoinColumn(name = "assessmentId", referencedColumnName = "assessmentId")
    private Assessment assessment;

    @JsonProperty("teacher_id")
    @Column(name = "teacher_id", insertable = false, updatable = false)
    private long TeacherID;

    @ManyToOne
    @JoinColumn(name = "teacher_id", referencedColumnName = "teacher_id")
    private Teacher teacher;

    @JsonProperty("student_id")
    @Column(name = "student_id", insertable = false, updatable = false)
    private String studentID;

    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "student_id")
    private Student student;

    public AssessmentResult(ExamHubDTO data) {
        this.studentID = data.getStudentID();
        this.StudentGrade = data.getStudentGrade();

        this.TeacherID = data.getTeacherID();

        this.assessmentId = data.getAssessmentId();
        this.assessmentMark = data.getAssessmentMark();

    }
}

package com.studentmanagementsystem.model.schoolModel;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "examscheduledb")
public class Exam {

    @Id
    private String examId;
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long Id;
//
//    @JsonProperty("exam_id")
//    @Column(name = "exam_id")

    @JsonProperty("exam_subjectcode")
    @Column(name = "exam_subjectcode")
    private String ExamSubjectCode;

    @JsonProperty("exam_subjectname")
    @Column(name = "exam_subjectname")
    private String ExamSubjectName;

    @JsonProperty("exam_date")
    @Column(name = "exam_date")
    private Date ExamDate;

    @JsonProperty("exam_grade")
    @Column(name = "exam_grade")
    private String ExamGrade;

    @JsonProperty("exam_time")
    @Column(name = "exam_time")
    private String ExamTime;

    @JsonProperty("exam_type")
    @Column(name = "exam_type")
    private String examtype;
}

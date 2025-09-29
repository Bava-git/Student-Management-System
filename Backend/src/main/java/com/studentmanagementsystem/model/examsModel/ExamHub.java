package com.studentmanagementsystem.model.examsModel;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.studentmanagementsystem.model.Student;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ExamHub {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @JsonProperty("tamil")
    @Column(name = "tamil")
    private String tamil;

    @JsonProperty("english")
    @Column(name = "english")
    private String english;

    @JsonProperty("maths")
    @Column(name = "maths")
    private String maths;

    @JsonProperty("science")
    @Column(name = "science")
    private String science;

    @JsonProperty("socialscience")
    @Column(name = "socialscience")
    private String socialscience;

    @Column(name = "student_id", insertable = false, updatable = false)
    private String StudentID;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @Column(name = "student_grade")
    private String studentGrade;

}

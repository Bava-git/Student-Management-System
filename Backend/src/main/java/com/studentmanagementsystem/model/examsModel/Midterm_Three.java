package com.studentmanagementsystem.model.examsModel;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "midterm_3")
public class Midterm_Three {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

//    midterm1_tamil, midterm1_english, midterm1_maths, midterm1_science, midterm1_socialscience, student_id
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

    @Column(name = "student_id")
    private String StudentID;
    @Column(name = "student_grade")
    private String StudentGrade;
}

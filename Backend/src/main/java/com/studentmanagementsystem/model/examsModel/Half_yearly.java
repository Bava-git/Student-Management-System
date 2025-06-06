package com.studentmanagementsystem.model.examsModel;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "halfyearly")
public class Half_yearly {

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

    @Column(name = "student_id")
    private String StudentID;
    @Column(name = "student_grade")
    private String StudentGrade;

}

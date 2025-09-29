package com.studentmanagementsystem.model.examsModel;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.studentmanagementsystem.dto.ExamHubDTO;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "quarterly")
public class Quarterly {

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
    private String studentGrade;

    public Quarterly(ExamHubDTO data) {
        this.StudentID = data.getStudentID();
        this.studentGrade = data.getStudentGrade();
        this.tamil = data.getTamil();
        this.english = data.getEnglish();
        this.maths = data.getMaths();
        this.science = data.getScience();
        this.socialscience = data.getSocialscience();
    }
}

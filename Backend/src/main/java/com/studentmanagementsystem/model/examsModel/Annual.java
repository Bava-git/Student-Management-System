package com.studentmanagementsystem.model.examsModel;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.studentmanagementsystem.dto.ExamHubDTO;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "annual")
public class Annual {

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
    private String studentGrade;

    public Annual(ExamHubDTO data) {
        this.StudentID = data.getStudentID();
        this.studentGrade = data.getStudentGrade();
        this.tamil = data.getTamil();
        this.english = data.getEnglish();
        this.maths = data.getMaths();
        this.science = data.getScience();
        this.socialscience = data.getSocialscience();
    }
}

package com.studentmanagementsystem.model.examsModel;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.studentmanagementsystem.dto.ExamHubDTO;
import com.studentmanagementsystem.model.Student;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "annual")
public class Annual {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @Column(name = "student_grade")
    private String studentGrade;

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

    @JsonProperty("student_id")
    @Column(name = "student_id", insertable = false, updatable = false)
    private String studentID;

    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "student_id")
    private Student student;


    public Annual(ExamHubDTO data) {
        this.studentID = data.getStudentID();
        this.studentGrade = data.getStudentGrade();
        this.tamil = data.getTamil();
        this.english = data.getEnglish();
        this.maths = data.getMaths();
        this.science = data.getScience();
        this.socialscience = data.getSocialscience();
    }
}

package com.studentmanagementsystem.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "teacherdb")
public class Teacher {

    @Id
    @JsonProperty("teacher_id")
    @Column(name = "teacher_id")
    private long TeacherID;

    @JsonProperty("teacher_name")
    @Column(name = "teacher_name")
    private String TeacherName;

    @JsonProperty("teacher_dob")
    @Column(name = "teacher_dob")
    private String TeacherDOB;

    @JsonProperty("teacher_gender")
    @Column(name = "teacher_gender")
    private String TeacherGender;

    @JsonProperty("teacher_street_name")
    @Column(name = "teacher_street_name")
    private String TeacherStreetName;

    @JsonProperty("teacher_city")
    @Column(name = "teacher_city")
    private String TeacherCity;

    @JsonProperty("teacher_marital_status")
    @Column(name = "teacher_marital_status")
    private String TeacherMaritalStatus;

    @JsonProperty("teacher_phone_num")
    @Column(name = "teacher_phone_num")
    private long TeacherPhoneNum;

    @JsonProperty("teacher_email")
    @Column(name = "teacher_email")
    private String TeacherEmail;

    @JsonProperty("teacher_education")
    @Column(name = "teacher_education")
    private String TeacherEducation;

    @JsonProperty("teacher_course")
    @Column(name = "teacher_course")
    private String TeacherCourse;

    @JsonProperty("teacher_aadhar_num")
    @Column(name = "teacher_aadhar_num")
    private long TeacherAadharNum;

    @JsonProperty("teacher_date_of_hire")
    @Column(name = "teacher_date_of_hire")
    private String TeacherDateOfHire;

    @JsonProperty("teacher_previous_employment")
    @Column(name = "teacher_previous_employment")
    private String TeacherPreviousEmployment;

    @JsonProperty("teacher_experience")
    @Column(name = "teacher_experience")
    private int TeacherExperience;

    @JsonProperty("teacher_salary")
    @Column(name = "teacher_salary")
    private int TeacherSalary;

    @JsonProperty("teacher_background_check")
    @Column(name = "teacher_background_check")
    private boolean TeacherBackgroundCheck;

    @JsonProperty("teacher_subject")
    @Column(name = "teacher_subject")
    private String TeacherSubject;

}

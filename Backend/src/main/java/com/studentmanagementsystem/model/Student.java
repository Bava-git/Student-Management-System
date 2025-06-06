package com.studentmanagementsystem.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Setter
@Getter
@Table(name = "studentpersonal")
public class Student {

//    studentpersonal - student_id, student_name, student_fathername, student_mothername, student_parentphone,
//    student_parentemail, student_emergencycontact, student_dob, student_streetname, student_city, student_Zipcode

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;
    @JsonProperty("student_id")
    @Column(name = "student_id")
    private String StudentID;
    @JsonProperty("student_level")


    private String StudentLevel;
    @JsonProperty("student_name")
    @Column(name = "student_name")
    private String StudentName;
    @JsonProperty("student_fathername")
    @Column(name = "student_fathername")
    private String StudentFatherName;
    @JsonProperty("student_mothername")
    @Column(name = "student_mothername")
    private String StudentMotherName;
    @JsonProperty("student_parentphone")
    @Column(name = "student_parentphone")
    private long StudentParentPhone;
    @JsonProperty("student_parentemail")
    @Column(name = "student_parentemail")
    private String StudentParentEmail;
    @JsonProperty("student_emergencycontact")
    @Column(name = "student_emergencycontact")
    private long StudentEmergencyContact;
    @JsonProperty("student_streetname")
    @Column(name = "student_streetname")
    private String StudentStreenName;
    @JsonProperty("student_city")
    @Column(name = "student_city")
    private String StudentCity;
    @JsonProperty("student_zipcode")
    @Column(name = "student_zipcode")
    private int StudentZipcode;
    @JsonProperty("student_bloodgroup")
    @Column(name = "student_bloodgroup")
    private String StudentBloodGroup;
    @JsonProperty("student_dob")
    @Column(name = "student_dob")
    private Date studentDOB;

}

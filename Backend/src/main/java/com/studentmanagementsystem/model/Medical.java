package com.studentmanagementsystem.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "medicaldb")
public class Medical {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @JsonProperty("student_id")
    @Column(name = "student_id")
    private String studentID;

    @JsonProperty("Medical_Issue1")
    @Column(name = "Medical_Issue1")
    private String MedicalIssue1;

    @JsonProperty("Medical_Issue2")
    @Column(name = "Medical_Issue2")
    private String MedicalIssue2;

    @JsonProperty("Medical_Issue3")
    @Column(name = "Medical_Issue3")
    private String MedicalIssue3;

    @JsonProperty("Medical_Symptom1")
    @Column(name = "Medical_Symptom1")
    private String MedicalSymptom1;

    @JsonProperty("Medical_Symptom2")
    @Column(name = "Medical_Symptom2")
    private String MedicalSymptom2;

    @JsonProperty("Medical_Symptom3")
    @Column(name = "Medical_Symptom3")
    private String MedicalSymptom3;

    @JsonProperty("Medical_Medicine1")
    @Column(name = "Medical_Medicine1")
    private String MedicalMedicine1;

    @JsonProperty("Medical_Medicine2")
    @Column(name = "Medical_Medicine2")
    private String MedicalMedicine2;

    @JsonProperty("Medical_Medicine3")
    @Column(name = "Medical_Medicine3")
    private String MedicalMedicine3;


}

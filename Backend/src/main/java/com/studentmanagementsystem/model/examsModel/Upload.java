package com.studentmanagementsystem.model.examsModel;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "testdb")
public class Upload {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String midterm1_tamil;
    private String midterm1_english;
    private String midterm1_maths;
    private String midterm1_science;
    private String midterm1_socialscience;

    // Getters and Setters

}

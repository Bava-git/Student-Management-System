package com.studentmanagementsystem.model.schoolModel;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "assessmentdb")
public class Assessment {

    @Id
    @JsonProperty("assessmentId")
    @Column(name = "assessmentId")
    private String assessmentId;

    @JsonProperty("teacher_id")
    @Column(name = "teacher_id")
    private long TeacherID;

    @JsonProperty("teacher_name")
    @Column(name = "teacher_name")
    private String TeacherName;

    @JsonProperty("student_level")
    @Column(name = "student_level")
    private String StudentLevel;

    @JsonProperty("finishBeforeDateTime")
    @Column(name = "finishBeforeDateTime")
    private LocalDateTime finishBeforeDateTime;

    @JsonProperty("assessmentNote")
    @Column(name = "assessmentNote")
    private String assessmentNote;

}

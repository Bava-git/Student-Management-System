package com.studentmanagementsystem.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.Data;

@Data
public class ExamHubDTO {

    private String tamil;
    private String english;
    private String maths;
    private String science;
    private String socialscience;

    private String studentID;
    private String studentGrade;

    private String assessmentId;
    private Double assessmentMark;

    private long TeacherID;

}

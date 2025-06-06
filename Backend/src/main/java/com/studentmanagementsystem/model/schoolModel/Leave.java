package com.studentmanagementsystem.model.schoolModel;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Setter
@Getter
@Table(name = "leavemanagementdb")
public class Leave {

    @Id
    private String leaveId;
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long Id;

//    @JsonProperty("leave_id")
//    @Column(name = "leave_id")

    @JsonProperty("leave_date")
    @Column(name = "leave_date")
    private Date LeaveDate;

    @JsonProperty("leave_reason")
    @Column(name = "leave_reason")
    private String LeaveReason;


}

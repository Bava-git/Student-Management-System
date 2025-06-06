package com.studentmanagementsystem.service;

import com.studentmanagementsystem.model.Medical;
import com.studentmanagementsystem.repository.MedicalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicalService {

    @Autowired
    private MedicalRepository medicalRepository;

    public List<Medical> getAllMS() {
        return medicalRepository.findAll();
    }

    public List<Medical> findByStudentID(String studentID) {
        return medicalRepository.findByStudentID(studentID);
    }

    public Medical addMedicalDetails(Medical medical) {
        return medicalRepository.save(medical);
    }

}

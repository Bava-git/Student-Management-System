package com.studentmanagementsystem.repository.examsRepository;

import com.studentmanagementsystem.model.examsModel.Upload;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UploadRepository extends JpaRepository<Upload, Long> {
}


package com.studentmanagementsystem.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> HandleResourceNotFoundException(ResourceNotFoundException ex, HttpServletRequest request) {

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", 404);
        response.put("errorCode", "ResourceNotFoundException");
        response.put("displayMessage", ex.getMessage());
        response.put("ids", ex.getAllIds());
        response.put("timestamp", LocalDateTime.now());
        response.put("path", request.getRequestURI());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(ResourceAlreadyExistException.class)
    public ResponseEntity<?> HandleResourceAlreadyExist(ResourceAlreadyExistException ex, HttpServletRequest request) {

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", 409);
        response.put("errorCode", "ResourceAlreadyExist");
        response.put("displayMessage", ex.getMessage());
        response.put("ids", ex.getAllIds());
        response.put("timestamp", LocalDateTime.now());
        response.put("path", request.getRequestURI());

        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception ex) {
        return new ResponseEntity<>("An error occured " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}

package com.studentmanagementsystem.exception;

import java.util.Map;

public class ResourceNotFoundException extends RuntimeException {

    private Map<String, String> allIds;

    public ResourceNotFoundException(String message, Map<String, String> allIds) {
        super(message);
        this.allIds = allIds;
    }

    public Map<String, String> getAllIds() {
        return allIds;
    }

}

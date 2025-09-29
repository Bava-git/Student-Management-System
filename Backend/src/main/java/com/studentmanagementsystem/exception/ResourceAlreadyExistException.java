package com.studentmanagementsystem.exception;

import java.util.Map;

public class ResourceAlreadyExistException extends RuntimeException {

    private Map<String, String> allIds;

    public ResourceAlreadyExistException(String message, Map<String, String> allIds) {
        super(message);
        this.allIds = allIds;
    }

    public Map<String, String> getAllIds() {
        return allIds;
    }
}


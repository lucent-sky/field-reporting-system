package com.example.fieldreporting.dto;

import com.example.fieldreporting.model.Report;

import java.util.List;

public class SyncRequest {
    private List<Report> updates;

    public List<Report> getUpdates() {
        return updates;
    }

    public void setUpdates(List<Report> updates) {
        this.updates = updates;
    }
}
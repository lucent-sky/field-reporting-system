package com.example.fieldreporting.dto;

import com.example.fieldreporting.model.Report;

import java.util.List;

public class SyncResponse {
    private List<Report> accepted;
    private List<Report> conflicts;

    public List<Report> getAccepted() {
        return accepted;
    }

    public void setAccepted(List<Report> accepted) {
        this.accepted = accepted;
    }

    public List<Report> getConflicts() {
        return conflicts;
    }

    public void setConflicts(List<Report> conflicts) {
        this.conflicts = conflicts;
    }
}
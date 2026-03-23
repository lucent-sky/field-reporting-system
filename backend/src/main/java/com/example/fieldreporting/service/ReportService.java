package com.example.fieldreporting.service;

import com.example.fieldreporting.model.Report;
import com.example.fieldreporting.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class ReportService {

    @Autowired
    private ReportRepository repo;

    public Report create(Report report) {
        report.setId(UUID.randomUUID());
        report.setVersion(1);
        report.setLastUpdated(Instant.now());
        return repo.save(report);
    }

    public List<Report> getAll() {
        return repo.findAll();
    }

    public Report update(UUID id, Report incoming) {
        Report existing = repo.findById(id).orElseThrow();

        // simple version check 
        if (incoming.getVersion() < existing.getVersion()) {
            throw new RuntimeException("Version conflict");
        }

        existing.setTitle(incoming.getTitle());
        existing.setDescription(incoming.getDescription());
        existing.setStatus(incoming.getStatus());
        existing.setVersion(existing.getVersion() + 1);
        existing.setLastUpdated(Instant.now());

        return repo.save(existing);
    }
}
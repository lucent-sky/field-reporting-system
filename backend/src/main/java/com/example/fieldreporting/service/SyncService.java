package com.example.fieldreporting.service;

import com.example.fieldreporting.dto.SyncRequest;
import com.example.fieldreporting.dto.SyncResponse;
import com.example.fieldreporting.model.Report;
import com.example.fieldreporting.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class SyncService {

    @Autowired
    private ReportRepository repo;

    public SyncResponse sync(SyncRequest request) {
        SyncResponse response = new SyncResponse();

        for (Report incoming : request.getUpdates()) {

            Optional<Report> existingOpt = repo.findById(incoming.getId());

            // CASE 1: New report (doesn't exist yet)
            if (existingOpt.isEmpty()) {
                incoming.setVersion(1);
                incoming.setLastUpdated(Instant.now());
                repo.save(incoming);
                response.getAccepted().add(incoming);
                continue;
            }

            Report existing = existingOpt.get();

            // CASE 2: Conflict (incoming is older)
            if (incoming.getVersion() < existing.getVersion()) {
                response.getConflicts().add(existing);
                continue;
            }

            // CASE 3: Accept update
            existing.setTitle(incoming.getTitle());
            existing.setDescription(incoming.getDescription());
            existing.setStatus(incoming.getStatus());
            existing.setVersion(existing.getVersion() + 1);
            existing.setLastUpdated(Instant.now());

            repo.save(existing);
            response.getAccepted().add(existing);
        }

        return response;
    }
}
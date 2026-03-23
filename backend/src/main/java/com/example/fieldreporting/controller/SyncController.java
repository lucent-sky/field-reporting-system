package com.example.fieldreporting.controller;

import com.example.fieldreporting.dto.SyncRequest;
import com.example.fieldreporting.dto.SyncResponse;
import com.example.fieldreporting.service.SyncService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sync")
@CrossOrigin
public class SyncController {

    @Autowired
    private SyncService syncService;

    @PostMapping
    public SyncResponse sync(@RequestBody SyncRequest request) {
        return syncService.sync(request);
    }
}
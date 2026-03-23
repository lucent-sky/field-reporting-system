package com.example.fieldreporting.controller;

import com.example.fieldreporting.model.Report;
import com.example.fieldreporting.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/reports")
@CrossOrigin
public class ReportController {

    @Autowired
    private ReportService service;

    @PostMapping
    public Report create(@RequestBody Report report) {
        return service.create(report);
    }

    @GetMapping
    public List<Report> getAll() {
        return service.getAll();
    }

    @PutMapping("/{id}")
    public Report update(@PathVariable UUID id, @RequestBody Report report) {
        return service.update(id, report);
    }
}
# Resilient Field Reporting System

## Overview
---- STILL IN PROGRESS ----
An offline-first incident reporting system designed to function in unreliable network environments.

## Features
- Create and update reports offline
- Local persistence of unsynced changes
- Sync engine with retry + conflict detection
- Version-based conflict resolution

## Tech Stack
- Backend: Java (Spring Boot)
- Frontend: React + TypeScript
- Storage: H2 (backend), localStorage (frontend)

## Architecture
Frontend queues updates locally → syncs with backend → backend resolves conflicts using versioning.

## API Endpoints
- POST /reports
- GET /reports
- PUT /reports/{id}
- POST /sync

## Key Design Decisions
- Version-based conflict resolution
- Offline queue using local storage
- Explicit sync step for clarity and control

## Future Improvements
- WebSocket-based real-time sync
- IndexedDB instead of localStorage
- Authentication & role-based access

# LXP API — NestJS Platform for Streaming & Online Courses

> Enterprise-grade backend for live/VOD learning experiences. API-first, cloud-ready, and security-hardened.

[![Node.js](https://img.shields.io/badge/node-%3E=20.x-339933.svg)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/nestjs-10.x-E0234E.svg)](https://nestjs.com/)
[![TypeORM](https://img.shields.io/badge/typeorm-%F0%9F%94%A7-ffb300.svg)](https://typeorm.io/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

---

## Table of Contents
- [Executive Summary](#executive-summary)
- [Architecture](#architecture)
- [Core Capabilities](#core-capabilities)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Database & Migrations](#database--migrations)
- [API Surface](#api-surface)
- [Security Posture](#security-posture)
- [Operations Runbook](#operations-runbook)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Executive Summary
**LXP API** powers a modern Learning Experience Platform:
- Live classes (RTMP ingest → HLS delivery), VOD lessons, exams/QCM, and certifications.
- Clean separation of concerns (domain-driven modules) with **Role-Based Access Control** for `Admin`, `Tutor`, and `Learner`.
- Observability, rate limiting, DTO validation, and production-ready configuration out of the box.

---

## Architecture

```mermaid
flowchart LR
  subgraph Client
    Web[Next.js/Web] --- Mobile[Mobile/WebView]
  end

  subgraph API[NestJS API]
    Auth[Auth/JWT] --- RBAC[Guards/Decorators]
    Courses[Courses/Modules/Lessons]
    Streaming[Streaming Service]
    Exams[Exams/QCM/Attempts]
    Notify[Notifications (email/in-app)]
  end

  DB[(PostgreSQL)]
  Cache[(Redis)]
  Obj[(S3/MinIO)]
  Media[FFmpeg Workers]
  RTMP[RTMP Ingest Server]

  Client -->|HTTPS/JSON| API
  API --> DB
  API --> Cache
  API --> Obj
  Streaming --> Media
  Media --> Obj
  RTMP --> Streaming
```

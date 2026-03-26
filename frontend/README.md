# Real-Time Delivery Tracking System - Frontend

This is the frontend component of the Real-Time Delivery Tracking System, part of the Data Engineering (CO5173) course project. It provides an interactive UI for customers, drivers, and administrators.

## Overview

The application simulates three primary user roles:
* **Customer**: Can place orders, track the assigned driver on a real-time map, see dynamic ETA updates, and receive proximity notifications.
* **Driver**: Receives order assignments, updates status (Accepted, Picking Up, In Transit, Arriving, Delivered), and simulates movement along a GPS route.
* **Admin**: Views driver analytics, trip history playback, and heatmap of delivery demand.

## Tech Stack
* **Framework**: React 19
* **Build Tool**: Vite
* **Language**: TypeScript
* **State Management**: Zustand
* **Mapping Library**: Leaflet & React-Leaflet
* **Styling**: CSS / React styling conventions

## Project Structure (Phase 1)

```
frontend/src/
├── features/
│   └── tracking/
│       ├── TrackingPage.tsx      # Main tracking page
│       ├── TrackingMap.tsx       # Map with driver marker
│       └── trackingStore.ts      # Zustand store
├── shared/
│   ├── hooks/
│   │   └── useWebSocket.ts       # WS hook for real-time connection
│   └── types/
│       └── index.ts              # Shared types and interfaces
├── App.tsx
├── main.tsx
└── index.css
```

## Getting Started

### Prerequisites

* Node.js (v18 or higher)
* npm (Node Package Manager)

### Installation

1. Navigate to the `frontend` directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

To start the development server:

```bash
npm run dev
```

The app will run at `http://localhost:5173` with Hot Module Replacement (HMR).

### Building for Production

To create a production build of the application:

```bash
npm run build
```
This generates the optimized static files in the `dist` directory.

### Linting

To check for any linting issues:

```bash
npm run lint
```

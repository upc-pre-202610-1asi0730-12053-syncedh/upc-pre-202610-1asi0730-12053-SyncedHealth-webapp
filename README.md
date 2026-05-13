"# SyncedHealth Web Application" 

# cortisense-webapp
Frontend application for CortiSense - Web Apps Construction Management Platform.
This project is built with [Vue](https://vuejs.org/) and follows **Domain-Driven Design (DDD)** principles to ensure a scalable, maintainable architecture tailored to the needs of the construction business.

## Project Architecture
The source code is organized around the core subdomains of the SyncedHealth platform. Each domain operates modularly and contains its own responsibility layers (Presentation, Application, Domain, and Infrastructure).

### Directory Structure
```text
cortisense-webapp/
├── mock/                   # Mock API configuration for local development
│   ├── cortisense-db.json  # Fake database with seed data for all domains
│   ├── json-server.json    # json-server configuration
│   └── routes.json         # Route rewriting rules (/api/v1/* → /*)
├── public/                 # Publicly accessible static files
│   └── i18n/               # Translation files for internationalization (i18n)
├── proxy.conf.json         # Angular dev proxy — forwards /api/v1 to json-server
├── src/
│   ├── app/
│   │   ├──          /      # 
│   │   └── shared/         # Reusable components, directives, and pipes across domains
│   └── environments/       # Environment variables (development, production)
```

## Local Development

This project uses **json-server** as a mock REST API to simulate the backend during development. No real backend is required to run the application locally.

### Prerequisites
- Node.js 20+
- npm 11+

### Setup

Install dependencies:
```bash
npm install
```

### Running the application

Two terminals are required:

**Terminal 1 — Mock API:**
```bash
npm run mock
```
Starts json-server on `http://localhost:3000`. The following resources are available:

| Resource | URL |
|---|---|
| Materials | `http://localhost:3000/api/v1/materials` |

**Terminal 2 — Angular:**
```bash
npm start
```
Starts the Angular dev server on `http://localhost:4200`. The proxy automatically forwards all `/api/v1/*` requests to json-server.

### How the proxy works

```
Browser (localhost:4200)
    ↓  GET /api/v1/materials
proxy.conf.json
    ↓  forwards to localhost:3000
json-server
    ↓  routes.json rewrites /api/v1/materials → /materials
    ↓  responds with JSON data from kipu-db.json
```

### Available scripts

| Script | Description |
|---|---|
| `npm start` | Starts the Angular dev server |
| `npm run mock` | Starts the json-server mock API |
| `npm run build` | Builds the app for production |
| `npm test` | Runs unit tests |

# CortiSense Platform (cortisense-webapp)

## Overview
CortiSense is a Vue 3 + Vite application designed to monitor medical staff wellbeing and manage clinical shifts. The project is organized using Domain-Driven Design (DDD) principles to ensure business logic remains decoupled from UI and infrastructure concerns, making it highly scalable for healthcare environments.
The platform focuses on preventing medical burnout by integrating biometric data monitoring with intelligent shift scheduling.

## Goals
- Demonstrate a robust frontend architecture using DDD-inspired layering.
- Maintain explicit domain boundaries through `entities`, `commands`, `resources`, `assemblers`, and `stores`.
- Provide a reliable base for healthcare-related CRUD operations, internationalization (i18n), and secure routing.

## Tech Stack
- Vue 3
- Vite
- Pinia
- Vue Router
- Vue I18n
- PrimeVue + PrimeFlex + PrimeIcons
- Axios
- `json-server` for local mock API

## Bounded Contexts

### CRA Context
- The core value proposition of the platform.
- Tracks real-time biometric data such as BPM and Stress Index.
- Orchestrates alerts through the useCraStore.
- Maps raw sensor data to domain entities for clinical analysis.

### IAM Context
- Handles security and user profiles.
- Manages SignInCommand and CompleteRegistrationCommand workflows.
- Implements role-based access control (RBAC) for Administrators and Medical Staff.
- Persists session state through Pinia and local storage restoration.

## Layer Responsibilities

### Domain Layer
- Defines business concepts (e.g., what constitutes a "Critical Alert").
- Framework-agnostic: contains only pure JavaScript logic and data structures.

### Application Layer
- Coordinates state transitions using Pinia.
- Acts as a bridge between the UI and Infrastructure to fulfill specific user stories.

### Infrastructure Layer
- Handles external communication with the `json-server` or production APIs.
- Uses Assemblers to transform API resources into Domain Entities.

### Presentation Layer
- High-fidelity UI built with PrimeVue.
- Reacts to store state changes and triggers application workflows.

### Project Structure (DDD oriented)
```text
src/
 iam/                         # Identity & Access Management Context
   domain/                    # User entities and Auth commands
   application/               # Auth orchestration (iam.store.js)
   infrastructure/            # API services, assemblers, and guards
   presentation/              # Login/Register views and route definitions

 cra/                         # Clinical Risk Assessment Context
   domain/model/              # Biometric and Medical Device entities
   application/               # Clinical Risk Assessment store
   infrastructure/            # Data persistence and API assemblers
   presentation/              # Dashboard and real-time alert views

 shared/                      # Cross-context concerns
   infrastructure/            # BaseApi configuration
   presentation/              # Main Layout and reusable components

```

## Running the Project

### Prerequisites
- Node.js (v20+) and npm installed.

### 1) Install dependencies
```bash
npm install
```

### 2) Start mock API server (`json-server`)
From the project root:
```bash
cd server
sh start.sh
```

The server reads:
- `server/cortisense-db.json`
- `server/routes.json` (maps `/api/v1/*` to root resources)

Default local API base used by development env:
- `http://localhost:3000/`

### 3) Start the Vue app
In a separate terminal, from the project root:
```bash
npm run dev
```

### 4) Build for production
```bash
npm run build
```

### 5) Preview production build
```bash
npm run preview
```

## Environment Variables
Environment files included:
- `.env.development`
- `.env.production`

Main variables:
- `VITE_CORTISENSE_API_URL`
- `VITE_MEDICAL_DEVICES_ENDPOINT_PATH`
- `VITE_BIOMETRIC_DATA_ENDPOINT_PATH`
- `VITE_SIGNUP_ENDPOINT_PATH`
- `VITE_SIGNIN_ENDPOINT_PATH`
- `VITE_USERS_ENDPOINT_PATH`

Tip: if your API is running on a different port, update `VITE_CORTISENSE_API_URL` in `.env.development`.

Starts json-server on `http://localhost:3000`. The following resources are available:

## Documentation
- Domain and architecture references:
    - `docs/class-diagram.puml`
    - `docs/user-stories.md`

## Recommended Development Practices
- Keep monitoring logic strictly separate from scheduling logic.
- Never allow a Vue component to make a direct Axios call; always go through the Store.
- Use clinical terminology (Shift, BPM, Burnout, Staff) in code and documentation.

## License
See `LICENSE.md`.


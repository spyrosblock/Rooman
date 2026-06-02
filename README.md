# Rooman — Room Management System

**Rooman** is a full-stack room management system designed for hotels, hostels, and Airbnbs. It lets potential guests check room availability in real time without picking up the phone, while giving staff a private dashboard to manage rooms, bookings, and reservations.

> **The problem it solves:**  
> Guests call to ask "do you have a room available on X date?" — now they can see the answer instantly on your website. Staff can focus on confirming bookings rather than answering availability queries.

---

## Public Features (no login required)

- **Availability Checker** — Visitors pick a date on the landing page and instantly see which rooms are free, along with room type, capacity, and price per night.
- **Contact Prompt** — After checking availability, guests are invited to call or reach out to complete the booking.

## Admin Features (login required)

- **Room Management** — Create, edit, view, and delete rooms. Each room has a name, type (single/double/twin/suite/quad), floor, capacity, price, and an optional description.
- **Booking Management** — Create, edit, view, and delete bookings. Capture guest name, email, phone, check-in/check-out dates, number of guests, and status (pending/confirmed/cancelled/completed). Automatic price calculation based on room rate and number of nights.
- **Booking Search** — Filter bookings by guest name directly from the bookings list.
- **Authentication** — JWT-based login for staff accounts. All admin pages are protected behind an authentication wall.

---

## Tech Stack

| Layer        | Technology                                      |
|-------------|-------------------------------------------------|
| **Frontend**| React 19, TypeScript, Vite, MUI (Material UI), React Router, Day.js |
| **Backend** | Java 17, Spring Boot 3.2, Spring Security, JWT, JPA/Hibernate, Jakarta Validation |
| **Database**| PostgreSQL 18                                    |
| **Infra**   | Docker Compose — PostgreSQL + PGAdmin + Backend + Frontend |

---

## Requirements

- **Docker** & **Docker Compose** — the app runs fully containerised. No manual dependency installation needed.
- **Make sure ports `3000`, `8080`, `5050`, and `5432` are free** on your host machine.

---

## Quick Start

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd rooman
   ```

2. Copy environment files:

   ```bash
   cp backend/.env.example backend/.env \
   && cp db/pgadmin/.env.example db/pgadmin/.env \
   && cp db/postgres/.env.example db/postgres/.env
   ```

3. Build and start all services:

   ```bash
   docker compose build
   docker compose up
   ```

4. Open the app:

   | Service  | URL                                   | Credentials                      |
   |----------|---------------------------------------|----------------------------------|
   | Frontend | [http://localhost:3000](http://localhost:3000) | admin@admin.com / admin          |
   | Backend  | [http://localhost:8080/api/rooms](http://localhost:8080/api/rooms) | —                                |
   | PGAdmin  | [http://localhost:5050](http://localhost:5050)   | admin@admin.com / admin          |
   | DB       | Inside PGAdmin (server password: `postgres`)     |                                  |

---

## Project Structure

```
rooman/
├── backend/              # Spring Boot REST API
│   ├── src/main/java/    # Java source code
│   └── pom.xml           # Maven build
├── frontend/             # React + Vite SPA
│   ├── src/              # Components, pages, contexts
│   └── package.json      # Node dependencies
├── db/
│   ├── init/             # SQL migration scripts (tables + seed data)
│   ├── pgadmin/          # PGAdmin config
│   └── postgres/         # PostgreSQL config
└── docker-compose.yml    # Full-stack orchestration
```

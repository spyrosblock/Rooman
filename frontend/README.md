# Rooman Frontend

React + TypeScript frontend for the Rooman room management system. Provides a responsive UI for guests to check room availability and for staff to manage rooms and bookings.

## Tech Stack

| Component          | Technology                                              |
|--------------------|---------------------------------------------------------|
| **UI Framework**   | React 19, TypeScript 6                                  |
| **Routing**        | React Router v7                                         |
| **UI Library**     | Material UI 9 (MUI), MUI X Date Pickers                 |
| **State / Auth**   | Context API + custom hooks                              |
| **Build Tool**     | Vite 8                                                   |
| **Linting**        | ESLint, typescript-eslint                               |
| **Container**      | Docker, Nginx (serving static build)                    |

## Project Structure

```
frontend/
├── public/
│   ├── favicon.svg                   # Browser tab icon
│   └── icons.svg                     # SVG sprite
├── src/
│   ├── main.tsx                      # Entry point
│   ├── App.tsx                       # Root component with router setup
│   ├── index.css                     # Global styles
│   ├── theme.ts                      # MUI theme customisation
│   ├── types.ts                      # Shared TypeScript types
│   ├── assets/
│   │   ├── banner.png                # Home page hero image
│   │   └── banner2.jpg               # Home page secondary image
│   ├── components/
│   │   ├── NavBar.tsx                # Top navigation bar
│   │   ├── PageLoading.tsx           # Loading spinner component
│   │   ├── ProtectedRoute.tsx        # Auth guard wrapper
│   │   └── StatusChip.tsx            # Booking status badge
│   ├── contexts/
│   │   └── AuthContext.tsx           # Authentication context & provider
│   └── pages/
│       ├── Home.tsx                  # Public landing / room availability
│       ├── Login.tsx                 # Staff login form
│       ├── RoomList.tsx              # Admin room list
│       ├── RoomDetail.tsx            # Room details page
│       ├── RoomForm.tsx              # Create / edit room form
│       ├── BookingList.tsx           # Admin booking list with search
│       ├── BookingDetail.tsx         # Booking details page
│       ├── BookingForm.tsx           # Create / edit booking form
│       ├── booking-detail/           # Booking detail subcomponents
│       │   ├── index.ts
│       │   ├── BookingActions.tsx    # Action buttons (edit, delete)
│       │   └── BookingInfoCards.tsx  # Info cards for booking data
│       ├── booking-form/             # Booking form subcomponents
│       │   ├── index.ts
│       │   ├── BookingFormFields.tsx # Form fields (dates, room, guest)
│       │   └── BookingPriceSummary.tsx  # Price calculation display
│       └── booking-list/             # Booking list subcomponents
│           ├── index.ts
│           ├── BookingTable.tsx      # Desktop table view
│           └── BookingMobileCard.tsx # Mobile card view
├── Dockerfile                        # Multi-stage build with Nginx
├── nginx.conf                        # Nginx config for production
├── eslint.config.js                  # ESLint configuration
├── vite.config.ts                    # Vite build configuration
├── tsconfig.json                     # Root TypeScript config
├── tsconfig.app.json                 # App-specific TS config
├── tsconfig.node.json                # Node-specific TS config
└── specs.md                          # Feature specification document
```

## Pages & Routes

| Path                     | Page            | Auth Required | Description                                     |
|--------------------------|-----------------|---------------|-------------------------------------------------|
| `/`                      | Home            | No            | Room availability display, hero section, CTA    |
| `/login`                 | Login           | No            | Staff authentication                            |
| `/rooms`                 | RoomList        | Yes           | Admin room list with CRUD actions               |
| `/rooms/new`             | RoomForm        | Yes           | Create a new room                               |
| `/rooms/:id`             | RoomDetail      | Yes           | Room details and its bookings                   |
| `/rooms/:id/edit`        | RoomForm        | Yes           | Edit an existing room                           |
| `/bookings`              | BookingList     | Yes           | Admin booking list with search                  |
| `/bookings/new`          | BookingForm     | Yes           | Create a new booking                            |
| `/bookings/:id`          | BookingDetail   | Yes           | Booking details                                 |
| `/bookings/:id/edit`     | BookingForm     | Yes           | Edit an existing booking                        |

## Features

### Public (no login required)
- **Home page** — Displays room availability. Users can select a date to see which rooms are free. Includes a hero banner and a call-to-action prompting guests to contact the owner.

### Admin (login required)
- **Room Management** — Full CRUD for rooms (name, description, price, capacity, amenities, images).
- **Booking Management** — Full CRUD for bookings (guest name, contact info, date range, room assignment, price). Supports searching bookings by guest name.
- **Authentication** — JWT-based login with SHA-256 hashed passwords. Token stored in an HttpOnly, Secure, SameSite=Strict cookie.
- **Responsive Design** — Separate layouts for desktop (table view) and mobile (card view).

## Running Locally

### Using Docker Compose (recommended)

From the project root:

```bash
docker compose up --build
```

The frontend will be available at `http://localhost:5173` in dev mode.

### Standalone (with Vite dev server)

1. Ensure the backend is running (see [Backend README](../backend/README.md)).
2. Install dependencies and start:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### API Proxy

During development, the Vite dev server proxies all `/api` requests to the backend at `http://localhost:8080` (configured in `vite.config.ts`). The frontend makes API calls using relative paths (e.g. `/api/rooms`), so no environment variables or `.env` file are needed.

## Building for Production

```bash
cd frontend
npm run build
```

The static output will be placed in `frontend/dist/`.

### Docker build

```bash
docker build -t rooman-frontend ./frontend
docker run -p 80:80 rooman-frontend
```

Uses a multi-stage Dockerfile: builds the app with the Vite image, then serves it with Nginx.

## Scripts

| Command              | Description                        |
|----------------------|------------------------------------|
| `npm run dev`        | Start Vite dev server              |
| `npm run build`      | Type-check & build for production  |
| `npm run preview`    | Preview the production build       |
| `npm run lint`       | Run ESLint across the project      |
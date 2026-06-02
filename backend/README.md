# Rooman Backend

Spring Boot REST API for the Rooman room management system. Handles authentication, room management, booking management, and availability checking.

## Tech Stack

| Component          | Technology                                                   |
|--------------------|--------------------------------------------------------------|
| **Runtime**        | Java 17                                                      |
| **Framework**      | Spring Boot 3.2.5                                            |
| **Security**       | Spring Security, JWT (jjwt 0.12.6), SHA-256 password hashing |
| **Data Access**    | Spring Data JPA / Hibernate                                  |
| **Validation**     | Jakarta Validation                                           |
| **Database**       | PostgreSQL (via Docker)                                      |
| **Build Tool**     | Maven                                                        |

## Project Structure

```
backend/
├── src/main/java/com/rooman/
│   ├── RoomanApplication.java        # Application entry point
│   ├── controller/
│   │   ├── RoomController.java       # Room CRUD + availability endpoints
│   │   ├── BookingController.java    # Booking CRUD endpoints
│   │   └── UserController.java       # Login endpoint
│   ├── model/
│   │   ├── Room.java                 # Room entity
│   │   ├── Booking.java              # Booking entity
│   │   ├── User.java                 # Staff user entity
│   │   └── UserResponse.java         # Login response DTO
│   ├── repository/
│   │   ├── RoomRepository.java       # Room data access
│   │   ├── BookingRepository.java    # Booking data access
│   │   └── UserRepository.java       # User data access
│   ├── service/
│   │   ├── RoomService.java          # Room business logic
│   │   ├── BookingService.java       # Booking business logic
│   │   └── UserService.java          # Authentication logic
│   ├── security/
│   │   ├── SecurityConfig.java       # Security filter chain & CORS setup
│   │   ├── JwtUtil.java              # JWT token generation & validation
│   │   ├── JwtAuthenticationFilter.java  # Incoming JWT filter
│   │   └── SHA256PasswordEncoder.java    # Custom password encoder
│   └── exception/
│       └── GlobalExceptionHandler.java   # Centralised error handling
└── src/main/resources/
    ├── application.properties        # Spring Boot configuration
    └── META-INF/
        └── additional-spring-configuration-metadata.json
```

## Configuration

All sensitive configuration is provided via environment variables (and loaded from a `.env` file when running with Docker Compose).

| Variable                     | Description                        | Default (dev only)       |
|------------------------------|------------------------------------|--------------------------|
| `SPRING_DATASOURCE_URL`      | PostgreSQL JDBC URL                | `jdbc:postgresql://postgres:5432/mydb` |
| `SPRING_DATASOURCE_USERNAME` | Database username                  | `postgres`               |
| `SPRING_DATASOURCE_PASSWORD` | Database password                  | `postgres`               |
| `JWT_SECRET`                 | Secret key for signing JWT tokens  | (must be set)            |

### Generating a JWT secret

```bash
openssl rand -base64 64
```

Copy the output and set it as the `JWT_SECRET` environment variable.

## API Endpoints

### Authentication

| Method | Path              | Auth Required | Description                  |
|--------|-------------------|---------------|------------------------------|
| POST   | `/api/users/login`| No            | Authenticate staff & get JWT |

### Rooms

| Method | Path                     | Auth Required | Description                         |
|--------|--------------------------|---------------|-------------------------------------|
| GET    | `/api/rooms`             | No            | List all rooms                      |
| GET    | `/api/rooms/available`   | No            | List rooms available on a given date |
| GET    | `/api/rooms/{id}`        | No            | Get room by ID                      |
| POST   | `/api/rooms`             | Yes           | Create a new room                   |
| PUT    | `/api/rooms/{id}`        | Yes           | Update an existing room             |
| DELETE | `/api/rooms/{id}`        | Yes           | Delete a room                       |

- `GET /api/rooms/available` accepts a `?date=YYYY-MM-DD` query parameter.

### Bookings

| Method | Path                          | Auth Required | Description              |
|--------|-------------------------------|---------------|--------------------------|
| GET    | `/api/bookings`               | Yes           | List all bookings        |
| GET    | `/api/bookings/{id}`          | Yes           | Get booking by ID        |
| GET    | `/api/rooms/{id}/bookings`    | Yes           | Get bookings for a room  |
| POST   | `/api/bookings`               | Yes           | Create a new booking     |
| PUT    | `/api/bookings/{id}`          | Yes           | Update an existing booking|
| DELETE | `/api/bookings/{id}`          | Yes           | Delete a booking         |

- `GET /api/bookings` accepts an optional `?search=guestname` query parameter to filter by guest name.

### Error Responses

The API returns consistent JSON error bodies:

```json
{
  "error": "Error title",
  "message": "Human-readable description",
  "status": 400
}
```

## Running Locally

### Using Docker Compose (recommended)

From the project root:

```bash
cp backend/.env.example backend/.env
docker compose build
docker compose up
```

The backend will be available at `http://localhost:8080`.

### Standalone (Maven + external PostgreSQL)

1. Ensure a PostgreSQL instance is running and accessible.
2. Configure `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`, and `JWT_SECRET` as environment variables.
3. Run:

   ```bash
   cd backend
   mvn spring-boot:run
   ```

## Building

```bash
cd backend
mvn clean package -DskipTests
```

The JAR will be placed in `backend/target/rooman-backend-0.0.1-SNAPSHOT.jar`.

## Testing

```bash
cd backend
mvn test
## Setup
1. Clone it
2. cd into it
3. Run: `cp backend/.env.example backend/.env && cp db/pgadmin/.env.example db/pgadmin/.env && cp db/postgres/.env.example db/postgres/.env`
4. Run `docker compose build; docker compose up`

## Frontend
Open `http://localhost:3000` to interact with the app
To login: admin@admin.com/admin

## Backend
Open `http://localhost:8080/api/rooms` to see the rooms

## PGAdmin
Open `http://localhost:5050/browser/` to see the database
To login: admin@admin.com/admin
Password to enter the database: postgres


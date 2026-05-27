1. clone it
2. cd into it
3. run: `cp backend/.env.example backend/.env && cp db/pgadmin/.env.example db/pgadmin/.env && cp db/postgres/.env.example db/postgres/.env`
4. run `docker compose build; docker compose up`
5. open `http://localhost:3000` to interact with the app
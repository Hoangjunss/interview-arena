# Interview Arena

Local dev:
1. `cp .env.example .env` and fill in real secrets.
2. `docker compose up -d` — starts Postgres, Redis, Kafka.
3. `cd backend && ./mvnw spring-boot:run`
4. `cd web && npm install && npm run dev`

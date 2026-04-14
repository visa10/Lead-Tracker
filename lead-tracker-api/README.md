# Lead Tracker API

REST API for a lead tracking system. Built with NestJS, TypeScript, PostgreSQL, and Prisma.

**Runtime:** Node.js 18+  
**Framework:** NestJS  
**ORM:** Prisma  
**Database:** PostgreSQL 16  
**Validation:** class-validator + DB CHECK constraints  
**Docs:** Swagger / OpenAPI

---

## Setup

Requires Node.js 18+ and Docker (for PostgreSQL).

```bash
# Start PostgreSQL
docker compose up -d

# Install dependencies
npm install

# Apply migrations
npx prisma migrate dev

# Start in dev mode
npm run start:dev
```

API will be at http://localhost:3000/api, Swagger at http://localhost:3000/api/docs

## Environment

Create `.env` in the project root (optional — defaults work with docker-compose):

```
DATABASE_URL=postgresql://leadtracker:leadtracker@localhost:5433/leadtracker
PORT=3000
```

---

## API Endpoints

All endpoints are prefixed with `/api`.

- `POST /api/leads` — create a lead
- `GET /api/leads` — list leads (paginated)
- `GET /api/leads/:id` — get lead details
- `PATCH /api/leads/:id` — update a lead
- `DELETE /api/leads/:id` — delete a lead
- `GET /api/leads/:id/comments` — list comments for a lead
- `POST /api/leads/:id/comments` — add a comment

---

## Scripts

- `npm run start:dev` — start in watch mode
- `npm run build` — build for production
- `npm start` — start production build
- `npm run db:migrate` — run Prisma migrations
- `npm run db:generate` — regenerate Prisma client

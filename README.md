# Mini Lead Tracker

A simple CRM for tracking leads.

**Backend:** NestJS + Prisma + PostgreSQL  
**Frontend:** Next.js (App Router) + Tailwind CSS 4  
**Docs:** Swagger (OpenAPI)

---

## Run with Docker

```bash
docker compose up --build
```

- UI — http://localhost:3002  
- API — http://localhost:3001/api  
- Swagger — http://localhost:3001/api/docs  

Stop:

```bash
docker compose down
```

---

## Local Development

Requires Node.js 18+ and Docker (for PostgreSQL).

**Database:**

```bash
cd lead-tracker-api
docker compose up -d
```

**Backend:**

```bash
cd lead-tracker-api
npm install
npx prisma migrate dev
npm run start:dev
```

API will be at http://localhost:3001/api, Swagger at http://localhost:3001/api/docs

**Frontend:**

```bash
cd lead-tracker-ui
npm install
cp .env.example .env.local
npm run dev
```

UI will be at http://localhost:3002

---

## Production Build (without Docker)

**Backend:**

```bash
cd lead-tracker-api
npm install
npx prisma migrate deploy
npm run build
PORT=3001 node dist/main.js
```

**Frontend:**

```bash
cd lead-tracker-ui
npm install
NEXT_PUBLIC_API_URL=http://localhost:3001/api npm run build
npm start
```

---

## API

All endpoints are prefixed with `/api`.

- `POST /api/leads` — create a lead  
- `GET /api/leads` — list leads (paginated)  
- `GET /api/leads/:id` — get lead details  
- `PATCH /api/leads/:id` — update a lead  
- `DELETE /api/leads/:id` — delete a lead  
- `GET /api/leads/:id/comments` — list comments for a lead  
- `POST /api/leads/:id/comments` — add a comment  

**Query params for GET /api/leads:**

- `page` — page number (default 1)  
- `limit` — items per page (default 20)  
- `status` — filter by status (`NEW`, `CONTACTED`, `IN_PROGRESS`, `WON`, `LOST`)  
- `q` — search by name, email, company  
- `sort` — sort field (`createdAt`, `updatedAt`)  
- `order` — sort direction (`asc` / `desc`)

---

## Features

**Backend:**
- CRUD for leads with validation (class-validator + DB-level CHECK constraints)
- Comments on leads
- Pagination, search, filtering, sorting
- Swagger documentation
- Cascade delete (lead → comments)

**Frontend:**
- Lead list with search, status filter, sorting
- Create / edit / delete leads
- Lead detail page with comments
- Loading, empty, and error states

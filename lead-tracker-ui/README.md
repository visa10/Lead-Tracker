# Lead Tracker UI

Web interface for the Lead Tracker. Built with Next.js (App Router), React, and Tailwind CSS v4.

**Framework:** Next.js (App Router)  
**UI:** React, Tailwind CSS 4  
**Language:** TypeScript

---

## Setup

```bash
# Install dependencies
npm install

# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:3000/api" > .env.local

# Start dev server
npm run dev
```

UI will be at http://localhost:3002

> Make sure the API (`lead-tracker-api`) is running before starting the UI.

## Environment

- `NEXT_PUBLIC_API_URL` — backend API URL (default: `http://localhost:3000/api`)

---

## Pages

- `/` — redirects to `/leads`
- `/leads` — lead list with filters and pagination
- `/leads/[id]` — lead detail, edit, comments

## Features

- Search by name, email, company
- Filter by status (NEW, CONTACTED, IN_PROGRESS, WON, LOST)
- Sort by created / updated date
- Pagination
- Create, edit, delete leads
- Add comments to leads
- Loading, empty, and error states
- Responsive design

---

## Scripts

- `npm run dev` — start dev server
- `npm run build` — build for production
- `npm start` — start production build
- `npm run lint` — run ESLint

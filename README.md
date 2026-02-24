# GWD Youth Foundation Monorepo

This repository is split for independent frontend and backend deployment:

- `client/`: React + Vite app (deploy to Vercel)
- `server/`: Express API (deploy to Render)
- `shared/`: shared TypeScript types only

Frontend and backend communicate through environment variables, not hardcoded URLs.

## Development

1. Create environment files from examples:
- `client/.env` from `client/.env.example`
- `server/.env` from `server/.env.example`

2. Start both apps from root:

```bash
npm run dev
```

Or run each separately:

```bash
npm run dev:client
npm run dev:server
```

## Environment Variables

### Client (`client/.env`)

```env
VITE_API_URL=http://localhost:5000
```

The frontend builds all API requests using `import.meta.env.VITE_API_URL`.

### Server (`server/.env`)

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
```

The backend uses `FRONTEND_URL` to configure CORS:

- `origin: process.env.FRONTEND_URL`
- `credentials: true`

## Build and Run

### Frontend

```bash
cd client
npm run build
```

Output: `client/dist/`

### Backend

```bash
cd server
npm run build
npm start
```

Output: `server/dist/`

In production mode, backend can serve static assets from `client/dist` with SPA fallback.
In development mode, backend serves API only.

## Deployment

### Vercel (Frontend)

- Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `dist`

Set environment variable:

- `VITE_API_URL=https://<your-render-backend-domain>`

### Render (Backend)

- Root Directory: `server`
- Build Command: `npm install && npm run build`
- Start Command: `npm start`

Set environment variables:

- `PORT` (Render normally injects this)
- `FRONTEND_URL=https://<your-vercel-frontend-domain>`

## Communication Guarantee

- No hardcoded localhost/Render/Vercel API URLs in frontend source code
- Frontend API base URL is environment-driven via `VITE_API_URL`
- Backend CORS is environment-driven via `FRONTEND_URL`
- Shared code in `shared/` contains types only

# CollegeGolfOS

College coach recruiting hub for the **GolfCoachOS ecosystem**.

- **Domain:** [collegegolfos.com](https://collegegolfos.com)
- **Sibling sites:** [GolfCoachOS](https://golfcoachos.com) · JuniorGolfOS · GolfAcademyOS
- **API (shared):** `golfcoachos-api` on Vercel

## Status

**Phase 1 — program search.** Landing + `/programs` college directory search (live API) + `/coaches` placeholder.

## Dev

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

1. Create GitHub repo `collegegolfos-app` and push this project.
2. Import in Vercel → new project.
3. Add domain `collegegolfos.com` (+ `www`).
4. Copy env vars from `.env.example` as needed.

## Linking with GolfCoachOS

| Flow | Status |
|------|--------|
| College program search | Live at `/programs` |
| Player invites college coach | Magic link on `golfcoachos.com/view/player/{token}` |
| Coach accounts | Coming — `/coaches` |

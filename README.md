# GearUp Frontend

Next.js frontend for GearUp — rent sports & outdoor gear instantly. Consumes the
[GearUp backend API](https://gearup-server-2.onrender.com).

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4 (CSS-based theme, no tailwind.config.js)
- React Hook Form + Zod
- TanStack Query (for interactive dashboard data, added in a later phase)
- Stripe.js / React Stripe.js (payment phase)

## Design System

Custom design tokens live in `src/app/globals.css` under `@theme inline` (Tailwind v4
style — no JS config file). Brand palette: deep pine green, trail green, and a
blaze-amber accent, evoking outdoor gear rather than a generic SaaS look.
Fonts: Fraunces (display), IBM Plex Sans (body), IBM Plex Mono (data/tags — order
IDs, prices, and the signature status badges are styled like physical equipment
tags with a punched hole, see `components/ui/status-badge.tsx`).

## Auth Architecture (BFF pattern)

The Express backend returns JWTs in the response body (no cookies). This frontend
proxies auth calls through its own Route Handlers, which set `httpOnly` cookies —
so tokens never touch client-side JS:

```
Browser → /api/auth/login (Next.js Route Handler)
            → calls Express POST /auth/login
            → gets { accessToken, refreshToken } in JSON
            → sets both as httpOnly cookies
            → returns { user } (decoded, no raw tokens) to the browser
```

`src/proxy.ts` (Next.js 16 renamed `middleware.ts` → `proxy.ts`) reads the access
token cookie on every request to `/dashboard/*`, decodes it (no signature
verification — see the comment in `lib/auth.ts` for why that's fine here), and
redirects based on role. **The real authorization boundary is still the Express
API** — it re-verifies the JWT signature on every request regardless of what the
frontend does.

## Setup

```bash
npm install
cp .env.example .env.local   # point NEXT_PUBLIC_API_BASE_URL at your backend
npm run dev
```

## Project Structure

```
src/
  app/
    (public)/              -> home, gear browsing (Server Components)
    auth/                  -> login, register
    dashboard/
      customer/ provider/ admin/
    payment/success, payment/cancel
    api/auth/               -> BFF proxy route handlers
  components/
    ui/                     -> hand-built shadcn-style primitives
    dashboard/               -> sidebar, logout button
  lib/
    api-client.ts            -> typed fetch wrapper (apiFetch = backend, bffFetch = our own routes)
    auth.ts                  -> server-only cookie/JWT helpers
    roles.ts                 -> client-safe role → dashboard path mapping
    status.ts                -> status label/color map, mirrors backend enums
    validations/              -> Zod schemas (mirror backend's zod schemas)
  proxy.ts                    -> route protection (formerly middleware.ts)
```

## Status

- [x] Project setup, design system, folder structure
- [x] Auth (register/login, BFF cookies, role-based route protection)
- [ ] Public gear browsing (Server Components)
- [ ] Customer dashboard + rental flow + Stripe Elements payment
- [ ] Provider dashboard
- [ ] Admin dashboard
- [ ] Polish (loading/error states everywhere, `API_INTEGRATION.md`)

## Notes

- A Next.js 16 quirk: `next/font/google` fetches font files at *build time* from
  Google Fonts. If your build environment has restricted network egress, this
  step will fail — it's unrelated to any code here.

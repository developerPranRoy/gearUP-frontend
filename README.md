# GearUp Frontend

Next.js frontend for GearUp — rent sports & outdoor gear instantly. Consumes the

[GearUp backend API](https://gearup-server-2.onrender.com).

[GearUp Frontend Live](https://gearup-frontend-qi4y.onrender.com).

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
- [x] Public gear browsing (Server Components) — search, filters, pagination,
      gear details, reviews, and the "Rent Now" order-placement flow
- [x] Customer dashboard (order history, payment history, cancel PLACED
      orders, review RETURNED gear) + Stripe Elements payment flow
- [x] Provider dashboard — stats, inventory table (edit/delete/toggle
      availability), add/edit gear forms, incoming orders with status actions
- [x] Admin dashboard — platform stats, user management (search, paginate,
      suspend/activate), read-only gear + rental moderation views
- [x] Polish — dashboard-wide loading skeleton + error boundary,
      `API_INTEGRATION.md`

## Backend dependency added this phase

`GET /provider/gear` didn't exist on the backend (only public browse-all and
single-item lookup did — no "my own gear" endpoint). Added it:
`provider.service.ts` → `getProviderGearDb(providerId)`, wired through
`provider.controller.ts` and `provider.route.ts`. Without it there's no way
for a provider to see their own inventory to edit/delete/toggle it.

## Stripe Elements integration

Uses `PaymentElement` (embedded), not Stripe Checkout redirect — matches the
backend's `PaymentIntent` + `clientSecret` design:

```
Pay Now (order CONFIRMED) → POST /payments/create → clientSecret
  → <Elements clientSecret> <PaymentElement /> </Elements>
  → stripe.confirmPayment({ return_url: /payment/success?orderId=... })
  → Stripe redirects back (or resolves inline) → success/cancel page
    checks status via stripe.retrievePaymentIntent()
```

**Important for testing/demo:** the backend's `Payment.status` only flips to
`COMPLETED` when Stripe's *webhook* fires (`POST /payments/webhook` on the
Express API) — the frontend's success page checks payment status directly
with Stripe, which is separate from your own database record. Run the Stripe
CLI alongside your backend while testing/recording the demo:
```bash
stripe listen --forward-to <your-backend-url>/api/payments/webhook
```
Otherwise the dashboard's payment history will keep showing `PENDING` even
after a card is charged successfully.

## Known limitation: date-range double-booking

The backend's rental model checks `availableStock` (a count) when an order is
placed, but doesn't track *which dates* are booked per unit — so two customers
can rent the same unit for overlapping date ranges as long as stock allows it.
The frontend enforces what it can (no past dates, end date after start date)
but can't prevent double-booked date ranges without a backend endpoint that
returns booked date ranges per gear item. Worth a follow-up if you want this
fully correct — the provider's confirm step before payment is currently the
only manual check against this.

## Notes

- A Next.js 16 quirk: `next/font/google` fetches font files at *build time* from
  Google Fonts. If your build environment has restricted network egress, this
  step will fail — it's unrelated to any code here.

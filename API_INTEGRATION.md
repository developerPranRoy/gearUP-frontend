# API Integration Map

Maps every frontend component/page to the backend endpoint(s) it consumes.
Backend base: `https://gearup-server-2.onrender.com/api` (configurable via
`NEXT_PUBLIC_API_BASE_URL`).

## Architecture note: two ways components reach the backend

1. **Server Components** (pages) call the Express API directly via
   `lib/api-client.ts`'s `apiFetch`/`apiFetchPaginated`, passing the access
   token read server-side from the httpOnly cookie (`lib/auth.ts`).
2. **Client Components** (buttons, forms) can't read an httpOnly cookie, so
   authenticated mutations go through `authedFetch` → `/api/proxy/[...path]`
   (`app/api/proxy/[...path]/route.ts`), a generic Next.js Route Handler that
   reads the cookie server-side and forwards the request with a Bearer token.
3. **Auth specifically** goes through dedicated BFF routes
   (`/api/auth/login`, `/register`, `/logout`) instead of the generic proxy,
   because login/logout need to *set/clear* the httpOnly cookies themselves.

| Frontend | Method | Backend Endpoint | Via |
|---|---|---|---|
| **Public** | | | |
| `/` (Home) | — | — | static, no API call |
| `/gear` | GET | `/gear`, `/categories` | `apiFetch` (Server Component) |
| `/gear/[id]` | GET | `/gear/:id` | `apiFetch` (Server Component) |
| `/gear/[id]` → Rent Now | POST | `/rentals` | `authedFetch` → proxy |
| `/gear/[id]` → reviews list | — | (included in `/gear/:id` response) | — |
| **Auth** | | | |
| `/auth/register` | POST | `/auth/register` | `bffFetch` → `/api/auth/register` |
| `/auth/login` | POST | `/auth/login` | `bffFetch` → `/api/auth/login` (sets cookies) |
| Navbar / dashboard layout | GET | `/auth/me` | `apiFetch` (Server Component) |
| Account menu → Log out | POST | — | `/api/auth/logout` (clears cookies) |
| **Customer dashboard** | | | |
| `/dashboard/customer` | GET | `/rentals`, `/payments` | `apiFetch` (Server Component) |
| Order card → Cancel Order | PATCH | `/rentals/:id/cancel` | `authedFetch` → proxy |
| Order card → Leave Review | POST | `/reviews` | `authedFetch` → proxy |
| `/dashboard/customer/orders/[id]/pay` | GET | `/rentals/:id` | `apiFetch` (Server Component) |
| Payment form (on mount) | POST | `/payments/create` | `authedFetch` → proxy |
| `/payment/success` | — | Stripe.js `retrievePaymentIntent` (not our API) | client-side Stripe SDK |
| Stripe webhook (server-to-server, not frontend-initiated) | POST | `/payments/webhook` | Stripe → Express directly |
| **Provider dashboard** | | | |
| `/dashboard/provider` | GET | `/provider/gear`, `/provider/orders` | `apiFetch` (Server Component) |
| `/dashboard/provider/gear/new` | POST | `/provider/gear` | `authedFetch` → proxy |
| `/dashboard/provider/gear/[id]/edit` | GET | `/gear/:id`, `/categories` | `apiFetch` (Server Component) |
| Gear form (edit mode, submit) | PUT | `/provider/gear/:id` | `authedFetch` → proxy |
| Inventory table → Delete | DELETE | `/provider/gear/:id` | `authedFetch` → proxy |
| Inventory table → Mark Available/Unavailable | PUT | `/provider/gear/:id` | `authedFetch` → proxy |
| `/dashboard/provider/orders` | GET | `/provider/orders` | `apiFetch` (Server Component) |
| Orders table → Confirm / Mark Picked Up / Mark Returned | PATCH | `/provider/orders/:id` | `authedFetch` → proxy |
| **Admin dashboard** | | | |
| `/dashboard/admin` (all tabs) | GET | `/admin/users`, `/admin/gear`, `/admin/rentals` | `apiFetch` (Server Component) |
| Users tab → Suspend/Activate | PATCH | `/admin/users/:id` | `authedFetch` → proxy |

## Route protection

`src/proxy.ts` (Next.js 16's renamed `middleware.ts`) decodes the access-token
cookie on every request to `/dashboard/*` and redirects based on role. This is
a UI-layer convenience, not the real security boundary — every one of the
endpoints above is independently protected by the Express API's own
`auth()` middleware, which re-verifies the JWT signature and role on every
request regardless of what the frontend does or doesn't check.

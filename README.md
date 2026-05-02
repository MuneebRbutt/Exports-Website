# Meharstare - Export Sportswear Brand

Meharstare is a premium Pakistani sportswear brand focused on global exports (B2B and B2C). This platform is built with Next.js 14, Prisma, and Tailwind CSS.

## Project Structure

- `app/`: Next.js App Router folders.
  - `(auth)/`: Authentication routes.
  - `(store)/`: Main storefront routes.
  - `admin/`: Admin dashboard.
  - `api/`: API endpoints.
- `components/`: Reusable UI components.
  - `ui/`: shadcn/ui components.
  - `layout/`: Layout components (Navbar, Footer).
  - `product/`: Product-related components.
  - `cart/`: Shopping cart components.
  - `checkout/`: Checkout and payment components.
  - `admin/`: Admin-specific components.
- `lib/`: Utility libraries and configurations.
  - `db/`: Prisma client and database helpers.
  - `auth/`: NextAuth configuration.
  - `stripe/`: Stripe payment integration.
  - `utils/`: General helper functions.
- `hooks/`: Custom React hooks.
- `types/`: TypeScript definitions and interfaces.
- `public/`: Static assets (images, icons).
- `prisma/`: Database schema and seed files.
- `styles/`: Global styles and CSS modules.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Prisma ORM)
- **Styling**: Tailwind CSS + shadcn/ui
- **Auth**: NextAuth.js
- **Payments**: Stripe & PayPal
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Internationalization**: next-intl

## Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`
3. Set up environment variables in `.env`.
4. Push the schema to your database: `npx prisma db push`
5. Seed the database: `npx prisma db seed`
6. Run the dev server: `npm run dev`

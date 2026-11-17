# Learn Together

## Windows 11: reproducible setup (PowerShell)

Install Git and Node.js 22 LTS; then run **each command individually**:

```powershell
git clone https://github.com/Tyler-Keesee/Learn-Together.git
```

```powershell
Set-Location .\Learn-Together
```

```powershell
node --version
```

```powershell
npm --version
```

```powershell
npm ci
```

```powershell
Copy-Item .env.example .env
```

```powershell
notepad .env
```

**Before running the server**, edit the `.env` placeholders with your own supported Supabase and OAuth configuration. The `supabase/migrations` directory supplies SQL migration files; apply migrations only after reviewing them and confirming the **correct test database**. Do not run migrations automatically against production.

After saving `.env`:

```powershell
npm run dev
```

Open **http://localhost:3000/** (port set in `vite.config.ts`). Stop with Ctrl+C. To check code before deploying:

```powershell
npm run check
```

```powershell
npm run build
```

This SvelteKit app requires configured Supabase credentials for account/database operations and Google OAuth keys for Google sign-in/calendar functionality. `npm ci` should be run from the **repository root**. Never paste secrets into chat or commit an `.env` file.

**Testing limitation:** Dependencies, app compile, database schema, and OAuth login are independent checks; passing `npm ci` alone does not validate backend integrations.

---


A platform for collaborative learning where users can share tutorials, learn from each other, and connect with like-minded learners.

## Features

- User authentication and profiles
- Tutorial sharing with video uploads
- Interactive learning environment
- Community engagement features

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- A Supabase account for the backend

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Tyler-Keesee/Learn-Together.git
   cd Learn-Together
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Or use the setup script
   npm run setup
   ```

4. **Set up the database**
   ```bash
   # Run database migrations
   npm run migrate:dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

## Environment Variables

Use `.env.example` as a template. Server-only `SUPABASE_SERVICE_ROLE_KEY`, `GOOGLE_CLIENT_SECRET` and `MIGRATION_ADMIN_TOKEN` must never enter browser bundles or GitHub commits.

Create a `.env` file in the root directory with the following variables:

```env
# Supabase
PUBLIC_SUPABASE_URL=your_supabase_project_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
GOOGLE_REDIRECT_URI=your_google_oauth_redirect_uri

# Google Calendar API
GOOGLE_API_KEY=your_google_api_key
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Run type checking
- `npm run lint` - Run linter
- `npm run format` - Format code
- `npm run migrate` - Run database migrations
- `npm run setup` - Interactive setup for environment variables

## Project Structure

```
├── src/
│   ├── lib/
│   │   ├── components/     # Reusable components
│   │   ├── stores/         # Svelte stores
│   │   └── utils/          # Utility functions
│   ├── routes/             # Application routes
│   └── app.html            # Main HTML template
├── static/                 # Static assets
├── supabase/
│   └── migrations/       # Database migrations
├── .env.example           # Example environment variables
├── package.json
└── README.md
```

## Deployment

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Flearntogether&env=SUPABASE_URL,SUPABASE_ANON_KEY,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,GOOGLE_REDIRECT_URI,GOOGLE_API_KEY&project-name=learntogether&repository-name=learntogether)

### Deployment compatibility

GitHub Pages can host only static assets and **cannot run this application's Google OAuth, Supabase session hooks, calendar APIs, or privileged database-migration endpoints**. The former automatic Pages deployment has therefore been replaced by a **build-verification-only** workflow. No live deployment is performed.

For real functionality, migrate the adapter to a reviewed server-side deployment target (such as SvelteKit's Node adapter on a managed server), configure environment variables in the host's secret manager, and verify auth redirects, database RLS and the Google Calendar flow. The current static adapter passes build checks but is **not production-deployment-ready**. Never put Supabase service-role or OAuth client-secret values in `PUBLIC_` environment variables.

The `/api/migrate` and `/api/supabase/migrate` schema-changing endpoints now accept **POST requests only** with a valid `Authorization: Bearer` token matching the server-only `MIGRATION_ADMIN_TOKEN` secret. Rotate any existing exposed credentials and review database migrations and RLS before using them. Do not expose these endpoints to public unauthenticated traffic.

## Technologies Used

- [SvelteKit](https://kit.svelte.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [GitHub Pages](https://pages.github.com/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

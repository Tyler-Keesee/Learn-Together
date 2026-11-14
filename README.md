# Learn Together

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

The current project configuration uses SvelteKit's static adapter, with a GitHub Pages base path. A Vercel deployment has not been verified; configure and test an appropriate adapter before deployment. Never expose `SUPABASE_SERVICE_ROLE_KEY`, `GOOGLE_CLIENT_SECRET`, or `SESSION_SECRET` to client-side code.

### Static GitHub Pages deployment (requires a successful build)
1. Install gh-pages if not already installed:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

3. Check the generated site carefully; server-dependent authentication and API routes may require hosting beyond static GitHub Pages. Do not assume a static build supports every feature.


## Deployment blockers and security requirements

This is a full-stack SvelteKit application with server-side authentication, database migrations,
and Google Calendar integration. **A static GitHub Pages deployment cannot run those server endpoints.**
Do not deploy a static build and advertise authentication or synchronization as functional until
a server-capable SvelteKit adapter, hosting configuration, and end-to-end tests are in place.

The repository currently has an unresolved production build check. The CI build must pass and
authentication, session cookies, Google OAuth callback, migration permissions, and Supabase RLS
must be tested before releasing it.

Required deployment configuration includes `PUBLIC_SUPABASE_URL` and
`PUBLIC_SUPABASE_ANON_KEY` (public browser settings), with
`SUPABASE_SERVICE_ROLE_KEY`, `GOOGLE_CLIENT_SECRET`, and `SESSION_SECRET`
kept **server-side only**. Never embed service-role or OAuth client secrets in static pages.
The `MIGRATION_ADMIN_TOKEN` must be at least 32 random characters to enable explicitly
authorized administrative migrations; without it they are disabled.

Privileged database migrations are available only through an authenticated POST to
`/api/supabase/migrate` or its compatibility alias `/api/migrate`.
Set the `x-migration-token` request header to the separately configured admin token.
Do not expose migrations through GET or leave a privileged endpoint unprotected.

## Technologies Used

- [SvelteKit](https://kit.svelte.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [GitHub Pages](https://pages.github.com/)

## License

No `LICENSE` file is currently present. Licensing terms have not been specified. Add a complete license file if you intend to distribute this project under MIT.

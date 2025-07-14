## Solace Candidate Assignment

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

---

## Major Functionality & Enhancements

- **Responsive UI**: All components are fully responsive for mobile and desktop.
- **Search**: Search bar for advocates.
- **Advocate Cards**: Modern card layout.
- **Specialties Section**: Specialties are shown as pills. If there are many, the section is collapsible—showing 4 by default, with a "+N more" pill and a "Close" button to expand/collapse.
- **Pagination**: Paginated advocate list.
- **Accessibility**: Buttons and controls are accessible and keyboard-friendly.
- **Tailwind CSS**: Most styling is handled via Tailwind utility classes for maintainability and rapid development.

---

## Getting Started

Install dependencies

```bash
npm i
```

Run the development server:

```bash
npm run dev
```

---

## Database Set Up

The app is configured to return a default list of advocates. This will allow you to get the app up and running without needing to configure a database. If you’d like to configure a database, you’re encouraged to do so. You can uncomment the url in `.env` and the line in `src/app/api/advocates/route.ts` to test retrieving advocates from the database.

1. Feel free to use whatever configuration of postgres you like. The project is set up to use docker-compose.yml to set up postgres. The url is in .env.

```bash
docker compose up -d
```

2. Create a `solaceassignment` database.

3. Push migration to the database

```bash
npx drizzle-kit push
```

4. Seed the database

```bash
curl -X POST http://localhost:3000/api/seed
```

---

## Possible Enhancements

- Add location services/map
- Add support for user preferences
- Add advocate detail pages/modal for more info
- Add advocate sorting
- Add support for dark mode
- Add testing for UI and API

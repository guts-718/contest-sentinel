# Contest Sentinel

Contest Sentinel is a background automation system that monitors
competitive programming contests and sends reminders so you never miss
one.

It runs as a persistent backend service with an dashboard UI.

------------------------------------------------------------------------

## What It Does

-   Fetches contests from:
    -   Codeforces
    -   AtCoder
    -   CodeChef
    -   LeetCode
-   Stores contests in MongoDB (UTC normalized)
-   Sends reminders:
    -   Daily morning reminder
    -   30 minute pre-contest reminder
-   Supports:
    -   Telegram notifications
    -   Email notifications
    -   Desktop browser notifications
-   Provides a local dashboard with:
    -   Upcoming contests
    -   Searchable table
    -   Calendar view
    -   Settings drawer

The system runs continuously once started.

------------------------------------------------------------------------

## Tech Stack

Backend: 
- Node.js 
- Express 
- TypeScript 
- MongoDB 
- Mongoose 
- node-cron

Frontend: 
- Next.js 
- React 
- Tailwind CSS 
- lucide-react 
- Fuse.js

Notifications: 
- Telegram Bot API 
- Email (SMTP / App Password) 
- Browser Notification API

------------------------------------------------------------------------

## Who Can Use This

-   Competitive programmers
-   Codeforces / AtCoder / LeetCode / Codechef users
-   Anyone who wants automated contest reminders
-   Developers looking for an automation project

------------------------------------------------------------------------

## Why This Is Better

-   Fully automated daemon style architecture
-   UTC-safe time handling
-   Multi platform aggregation
-   Toggle based notification system
-   Clean modular backend structure
-   Modern dashboard UI
-   Extensible design for future ML/analytics

------------------------------------------------------------------------

## Screenshots

### Dashboard

Replace the image path below with your actual screenshot file.

![Dashboard Screenshot](./images/dashboard.png)

------------------------------------------------------------------------

### Email Notification

![Email Screenshot](./images/email.png)

------------------------------------------------------------------------

### Telegram Notification

![Telegram Screenshot](./images/telegram.png)

------------------------------------------------------------------------

## Project Structure

    contest-agent/
      ├── src/                # Backend source
      ├── dashboard/          # Next.js UI
      ├── .env.sample
      ├── package.json

------------------------------------------------------------------------

## Setup

### 1. Backend

From project root:

    npm install
    npm run dev

The backend will start and connect to MongoDB.

Make sure you copy `.env.sample` to `.env` and fill in:

-   MONGODB_URI
-   TELEGRAM_BOT_TOKEN
-   TELEGRAM_CHAT_ID
-   EMAIL credentials
-   Any API keys required

------------------------------------------------------------------------

### 2. Dashboard

From inside the `dashboard` folder:

    npm install
    npm run dev

Dashboard runs locally (default: http://localhost:3000).

------------------------------------------------------------------------

## Environment Configuration

Refer to `.env.sample` for required variables.

Example:
- PORT=
- MONGO_URI=
- TELEGRAM_BOT_TOKEN=
- TELEGRAM_CHAT_ID=
- TIMEZONE=
- CONTEST_API_KEY= # THIS IS THE CLIST API KEY
- EMAIL_USER=
- EMAIL_PASS=
    

------------------------------------------------------------------------

## Running in Production

You can run the backend with a process manager:

    pm2 start npm --name contest-agent -- run dev

Or build and run in production mode as needed.

------------------------------------------------------------------------

## Future Improvements

-   Participation tracking
-   Advanced filtering
-   ML-based contest recommendations
-   Analytics dashboard
-   Deployment scripts
-   Dockerized full-stack setup

------------------------------------------------------------------------

## License

For personal use or educational purposes.

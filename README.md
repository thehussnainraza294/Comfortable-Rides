# Toba Rides

A single-page site for a chauffeur-driven car rental business, with an admin area
where the owner adds vehicles and a banner photo. No vehicles or photos ship with
the code. The fleet section stays hidden on the public site until the admin adds one.

Built with Next.js and Supabase. It exports to plain static files, so it can be
hosted free on Netlify, Vercel, Cloudflare Pages or any static host.

---

## What lives where

```
lib/config.js          Business name, phone, WhatsApp, destinations.
                       Change these and the whole site updates.
lib/supabase.js        Database connection.
lib/api.js             All reads and writes. Vehicles, settings, photos, auth.
lib/image.js           Shrinks photos in the browser before upload.

app/page.js            The public site.
app/admin/page.js      The admin area.
app/globals.css        All styling.

components/Chrome.js   Header, footer, sticky mobile bar.
components/Banner.js   Banner, including the built-in road graphic.
components/Fleet.js    Vehicle cards.
components/Sections.js Services, coverage, pricing, booking, why us, FAQ.

supabase/schema.sql    Run this once to create the database.
```

---

## Setup

### 1. Create a Supabase project

Go to supabase.com, create a free project, and wait for it to finish provisioning.

### 2. Create the database

Open **SQL Editor**, click **New query**, paste the whole of `supabase/schema.sql`,
and click **Run**. This creates the tables, the security rules and the photo bucket.

### 3. Create your admin account

Go to **Authentication**, then **Users**, then **Add user**.
Use your own email and a strong password, and tick **Auto confirm user**.

Then close the door behind you: go to **Authentication**, then **Providers**,
then **Email**, and turn off **Enable sign ups**. Without this, anyone could
register an account and edit the site.

### 4. Connect the site

Copy `.env.local.example` to `.env.local` and fill in the two values from
**Project Settings**, then **API**:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

The anon key is meant to be visible in the browser. It only grants what the
security rules allow, and those rules permit reading but never writing.

### 5. Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

The admin area is at `/admin`.

---

## Deploying

```bash
npm run build      # produces the out/ folder
```

On Netlify: build command `npm run build`, publish directory `out`.
Add the same two environment variables in **Site settings**, then
**Environment variables**, or the live site will not be able to reach the database.

Vercel and Cloudflare Pages work the same way.

---

## Security notes

The admin password is not in the code, and it is not checked in the browser.
Sign in goes through Supabase Auth, and the database enforces the rules itself
through Row Level Security:

- anyone may read vehicles and settings
- only a signed in user may create, edit or delete them
- anyone may view photos, only a signed in user may upload or remove them

This means reading the page source gives an attacker nothing useful.

Two dependency advisories are currently open with no stable fix released yet:
one in Next.js and one in the copy of PostCSS that Next.js bundles. Both concern
build-time CSS processing of untrusted stylesheets, which this project does not do,
so neither is exploitable here. Run `npm audit` and update when stable
patches ship.

---

## Photos

Photos are shrunk in the browser before they are uploaded, to roughly 1400 pixels
wide for vehicles and 1800 for the banner. A 5 MB phone photo becomes around
100 to 150 KB. This keeps the site fast on mobile data and keeps storage well
inside the Supabase free tier.

Deleting a vehicle also deletes its photo, so nothing is left behind.

---

## Before you go live

- Put your real business name in `lib/config.js`
- Check the phone number in `lib/config.js` is correct in all three fields
- Set up a Google Business Profile. It is free and appears above organic results
  in local searches, which for this kind of business often matters more than
  the website itself.

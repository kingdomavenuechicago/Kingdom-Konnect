# Kingdom Konnect Navigator System
Kingdom Avenue Inc. · EIN: 83-0531517

Shared real-time referral and case tracking for KK navigators.
Built with React + Supabase. All navigators see the same live data.

---

## Setup (One Time — ~15 minutes total)

### Step 1 — Create Supabase project (free)
1. Go to supabase.com → Sign up → New Project
2. Name it "kingdom-konnect" → pick a region → Create
3. Wait ~2 min for it to spin up

### Step 2 — Create the database table
1. In your Supabase project → click **SQL Editor** (left sidebar)
2. Paste the contents of `supabase_setup.sql` → click **Run**
3. You should see "Success"

### Step 3 — Get your API keys
1. In Supabase → **Settings** → **API**
2. Copy: **Project URL** and **anon/public key**

### Step 4 — Add keys to Vercel
1. In your Vercel project → **Settings** → **Environment Variables**
2. Add:
   - `REACT_APP_SUPABASE_URL` = your Project URL
   - `REACT_APP_SUPABASE_ANON_KEY` = your anon key
3. Click **Redeploy**

---

## Deploy to Vercel
1. Push this repo to GitHub
2. vercel.com → Add New Project → Import from GitHub → Deploy
3. Add environment variables (Step 4 above)
4. Redeploy → live and shared!

## Local Development
Create a `.env` file:
```
REACT_APP_SUPABASE_URL=your_url_here
REACT_APP_SUPABASE_ANON_KEY=your_key_here
```
Then:
```
npm install
npm start
```

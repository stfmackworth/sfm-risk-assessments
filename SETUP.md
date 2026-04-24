# SFM Risk Assessment Manager — Setup Guide

## Overview
This app runs on **GitHub Pages** (free static hosting) with **Google Sheets** as the data backend.
After setup it is fully independent of any Claude subscription.

---

## Part 1 — Repository Setup

### 1.1 Create the GitHub repository

1. Go to https://github.com/new
2. Name it exactly: `sfm-risk-assessments`
3. Set it to **Private** (recommended for church data)
4. Click **Create repository**

### 1.2 Upload the app files

Option A — GitHub web interface (easiest):
1. In your new repo, click **Add file → Upload files**
2. Drag in all the files from the `sfm-risk-app` folder
3. Commit with message: `Initial commit`

Option B — Git command line:
```bash
cd sfm-risk-app
git init
git remote add origin https://github.com/stfmackworth/sfm-risk-assessments.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

### 1.3 Update vite.config.js

Open `vite.config.js` and replace `stfmackworth` with your actual GitHub username:
```js
base: '/sfm-risk-assessments/',
```
This is already set — just make sure the repo name matches exactly.

---

## Part 2 — GitHub Secrets (passwords & credentials)

All sensitive credentials are stored as **GitHub Secrets** — they are never in the code.

1. Go to your repo → **Settings → Secrets and variables → Actions**
2. Click **New repository secret** for each of the following:

| Secret Name | Value | Description |
|---|---|---|
| `VITE_ADMIN_PASSWORD` | Your chosen password | Admin login password for the app |
| `VITE_SHEET_ID` | (see Part 3) | Google Sheet ID |
| `VITE_SHEETS_API_KEY` | (see Part 3) | Google API key for reading |
| `VITE_WORKER_URL` | (see Part 4) | Cloudflare Worker URL for writing |

**Recommended admin password format:** `SFM-[word]-[year]` e.g. `SFM-Mackworth-2025`
Change it by updating the secret — redeploy happens automatically.

---

## Part 3 — Google Sheets Setup

### 3.1 Create the spreadsheet

1. Go to https://sheets.google.com
2. Create a new blank spreadsheet
3. Name it: `SFM Risk Assessments`
4. Create the following tabs (click + at the bottom for each):
   - `assessments`
   - `hazards`
   - `staff`
   - `settings`
   - `audit_log`

### 3.2 Add column headers

**assessments tab — Row 1:**
```
id | ref | name | category | location | legislation | reviewMonths | whoAtRisk | involvesChildren | involvesVulnerableAdults | involvesFood | isOutdoor | status | version | assessedBy | assessedDate | reviewDate | pccNoted | vicarSignoff | createdAt | updatedAt
```

**hazards tab — Row 1:**
```
id | assessmentId | hazard | who | existingControls | likelihood | severity | additionalControls | owner | deadline | sortOrder
```

**staff tab — Row 1:**
```
key | label | name | email | phone
```

**settings tab — Row 1:**
```
key | value
```

**audit_log tab — Row 1:**
```
timestamp | message | userAgent
```

### 3.3 Get the Sheet ID

Your Sheet ID is in the URL when you have the spreadsheet open:
```
https://docs.google.com/spreadsheets/d/THIS-IS-YOUR-SHEET-ID/edit
```
Copy it and add it as the `VITE_SHEET_ID` secret.

### 3.4 Create a Google Cloud API key (for reading)

1. Go to https://console.cloud.google.com
2. Create a new project (or use existing) — name it `SFM Risk App`
3. Go to **APIs & Services → Library**
4. Search for **Google Sheets API** → Enable it
5. Go to **APIs & Services → Credentials**
6. Click **Create Credentials → API Key**
7. Copy the key
8. Click **Edit API Key** → Restrict it:
   - Application restriction: **HTTP referrers**
   - Add: `https://stfmackworth.github.io/*`
   - API restriction: **Google Sheets API** only
9. Add the key as `VITE_SHEETS_API_KEY` secret

**Important:** This API key only allows *reading* the sheet. Writing requires the Worker (Part 4).

---

## Part 4 — Cloudflare Worker (for writing data)

Google Sheets requires OAuth for writes. The cleanest approach for a static site is a small Cloudflare Worker that signs requests with a service account. Cloudflare Workers are **free** for up to 100,000 requests/day.

### 4.1 Create a Google Service Account

1. In Google Cloud Console → **APIs & Services → Credentials**
2. Click **Create Credentials → Service Account**
3. Name: `sfm-sheets-writer`
4. Click **Create and Continue** → skip optional steps → **Done**
5. Click on the service account → **Keys tab**
6. **Add Key → Create new key → JSON** → Download the file
7. Open the JSON file — you'll need `client_email` and `private_key`

### 4.2 Share the spreadsheet with the service account

1. Open your Google Sheet
2. Click **Share**
3. Paste in the service account email (looks like: `sfm-sheets-writer@your-project.iam.gserviceaccount.com`)
4. Give it **Editor** access
5. Click **Send**

### 4.3 Create the Cloudflare Worker

1. Go to https://workers.cloudflare.com → **Sign up free**
2. Go to **Workers → Create a Worker**
3. Name it: `sfm-sheets-writer`
4. Replace the default code with:

```javascript
export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() });
    }
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const { range, values } = await request.json();
    const token = await getToken(env.CLIENT_EMAIL, env.PRIVATE_KEY);
    const sheetId = env.SHEET_ID;

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values }),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders() }
    });
  }
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': 'https://stfmackworth.github.io',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

async function getToken(clientEmail, privateKeyPem) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: clientEmail, scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token', exp: now + 3600, iat: now,
  };
  const encode = obj => btoa(JSON.stringify(obj)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const signingInput = `${encode(header)}.${encode(payload)}`;

  // Import private key
  const pemBody = privateKeyPem.replace(/-----[^-]+-----/g, '').replace(/\s/g, '');
  const keyData = Uint8Array.from(atob(pemBody), c => c.charCodeAt(0));
  const key = await crypto.subtle.importKey('pkcs8', keyData, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(signingInput));
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_');
  const jwt = `${signingInput}.${sigB64}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });
  const { access_token } = await tokenRes.json();
  return access_token;
}
```

5. **Replace** `stfmackworth` in the CORS origin with your GitHub username
6. Click **Save and Deploy**

### 4.4 Add Worker environment variables

In Cloudflare Worker → **Settings → Variables → Add variable** (mark each as **Secret**):

| Variable | Value |
|---|---|
| `CLIENT_EMAIL` | The `client_email` from your service account JSON |
| `PRIVATE_KEY` | The `private_key` from your service account JSON |
| `SHEET_ID` | Your Google Sheet ID |

7. Copy your Worker URL (looks like: `https://sfm-sheets-writer.YOUR-SUBDOMAIN.workers.dev`)
8. Add it as `VITE_WORKER_URL` in GitHub Secrets

---

## Part 5 — Enable GitHub Pages

1. In your repo → **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** (this is created automatically by the GitHub Action)
4. Click **Save**

After the first successful deploy, your app will be live at:
```
https://stfmackworth.github.io/sfm-risk-assessments/
```

---

## Part 6 — First Deploy & Testing

1. Push any change to the `main` branch (or trigger manually: **Actions → Deploy to GitHub Pages → Run workflow**)
2. Wait ~2 minutes for the build to complete
3. Go to the URL above
4. Verify the Reader view loads all risk assessments
5. Click **Admin login** → enter your password → verify full edit access

---

## Sharing with Staff

**For all staff (Reader view):**
Simply share the URL: `https://stfmackworth.github.io/sfm-risk-assessments/`
No login required — they can browse, filter, and preview/print any RA.

**For admin staff:**
Share the URL + admin password. Consider sharing via a private WhatsApp message rather than email.

---

## Ongoing Maintenance

| Task | How often | Who |
|---|---|---|
| Review overdue RAs | Monthly | Operations Manager |
| Update staff directory | When staff changes | Operations Manager (Admin) |
| Rotate admin password | Annually | Operations Manager |
| Review compliance checklist | Annually (pre-PCC) | Operations Manager |
| Check Google Sheets backup | Quarterly | Operations Manager |

---

## Troubleshooting

**App shows blank page after deploy:**
Check the `base` in `vite.config.js` matches your repo name exactly.

**"Sheets read failed" error:**
Check `VITE_SHEET_ID` and `VITE_SHEETS_API_KEY` secrets are set correctly. Verify the Sheet is shared publicly for reading (View access to "Anyone with the link") or the API key has Sheets API enabled.

**Write operations not saving to Sheets:**
The app saves to localStorage as fallback automatically. Check Worker is deployed and `VITE_WORKER_URL` secret is correct. Check Worker logs in Cloudflare dashboard.

**Admin password not working:**
Check `VITE_ADMIN_PASSWORD` secret is set and the app has been redeployed since setting it.

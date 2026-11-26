# SANDAI Contact Web

Public digital namecard website. Employee profiles are managed in **contact-admin** and loaded here over the public API.

## Run locally

1. Backend (`:4000`)
```bash
cd ../contact-backend && npm run dev
```

2. Web (`:3001`)
```bash
npm run dev
```

Open a card: [http://localhost:3001/card/bobby-tandy](http://localhost:3001/card/bobby-tandy)

## Environment

```bash
BACKEND_API_URL=http://localhost:4000
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:4000
```

## How it connects

| Concern | Source |
| --- | --- |
| Card data | `GET {BACKEND}/api/public/cards/:slug` |
| Add to contacts | `GET {BACKEND}/api/public/cards/:slug/vcard` |
| Photos / logo | Served by backend (`/uploads`, `/sandai-logo.png`) |

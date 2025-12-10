# 🎯 Whiteslope Studio

Website & AI Integration for Whiteslope Studio - digital agency specializing in music industry and online education platforms.

---

## 🤖 **For AI Assistants (Claude, ChatGPT, Gemini)**

### Quick Start
Read the main API endpoint: `https://whiteslope.studio/api/whiteslope-info`

This returns:
- ✅ Company info & services
- ✅ 6 available actions (submit lead, brief, quote, schedule meeting, search portfolio)
- ✅ Complete examples and integration instructions

### Available Actions
| Action | Method | Endpoint |
|--------|--------|----------|
| Get info & actions | GET | `/api/whiteslope-info` |
| Submit lead | POST | `/api/ai/lead` |
| Submit brief | POST | `/api/ai/brief` |
| Schedule meeting | POST | `/api/ai/calendar` |
| Get quote | POST | `/api/ai/quote` |
| Search portfolio | GET | `/api/ai/portfolio` |
| Submit brief (form fallback) | GET | `/brief?email=...&name=...` |

### For Claude (cannot POST directly)
Generate pre-filled form link: `https://whiteslope.studio/brief?email=client@example.com&name=Name&company=Company&...`

### Documentation
- **LLM Integration Guide:** `LLM_INTEGRATION.md`
- **AI Plugin Info:** `https://whiteslope.studio/.well-known/ai-plugin.json`
- **GitHub Proxy:** `https://github.com/WhiteslopeStudio/whiteslope-api` (for Claude workaround)

---

## Getting Started (Development)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

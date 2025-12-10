# 🤖 LLM INTEGRATION GUIDE - WHITESLOPE STUDIO

Kompletny system do integracji WHITESLOPE STUDIO z Web2Agent (Hostinger), ChatGPT, Claude i innymi LLM-ami.

## 📚 Pliki do użytku

### 1. **TypeScript Knowledge Base**
- **File:** `/src/lib/LLMs.ts`
- **Purpose:** Główna baza wiedzy dla agentów
- **Export:** `AGENCY_INFO`, `SERVICES_FOR_LLMS`, `generateLLMSystemPrompt()`, `getLLMJSONData()`
- **Usage:** Import w komponentach React lub API routach

### 2. **JSON Files (Public)**
Dostępne publicznie w `/public/_resources/`:

#### `llm-settings.json`
- Pełne informacje o agencji
- Lista usług z cenami
- Portfolio projects
- SEO keywords
- Process steps

```json
{
  "agencyName": "WHITESLOPE STUDIO",
  "services": [...],
  "portfolio": [...],
  "seoKeywords": [...]
}
```

#### `llm-system-prompt.json`
- System prompt dla Web2Agent
- Role guidelines
- Communication templates
- Response guidelines
- FAQ answers

#### `llm-knowledge-base.json`
- Detailed knowledge base
- Business info
- Service descriptions
- Case studies
- Testimonials
- Competitive advantages

### 3. **API Endpoint**
- **Route:** `/api/llm-data`
- **Method:** `GET`
- **Cache:** 1 godzina (s-maxage=3600)

#### Usage Examples:

```bash
# Wszystkie dane
GET /api/llm-data

# Tylko system prompt
GET /api/llm-data?type=prompt

# Tylko usługi
GET /api/llm-data?type=services

# Info o firmie
GET /api/llm-data?type=agency

# SEO keywords
GET /api/llm-data?type=seo
```

#### Response:
```json
{
  "success": true,
  "data": {
    "agency": {...},
    "services": [...],
    "seoKeywords": [...],
    "systemPrompt": "Jesteś profesjonalnym AI agentem..."
  },
  "cached": true
}
```

## 🌍 Web2Agent Integration (Hostinger)

### Step 1: Add Knowledge Source
1. Zaloguj się do Hostinger Web2Agent
2. Przejdź do **Settings → Knowledge Sources**
3. Dodaj URL: `https://whiteslope.studio/api/llm-data`
4. Typ: **JSON API**
5. Update interval: **Co 1 godzinę**

### Step 2: Configure System Prompt
W Web2Agent Settings:

```
Fetch system prompt from: https://whiteslope.studio/api/llm-data?type=prompt
Update frequency: Hourly
```

### Step 3: Add to Agent Instructions
Dodaj do agent instructions:

```
You are WHITESLOPE STUDIO AI Agent. 
Your role is to help clients find the perfect digital solution.
Location: Białystok, Poland
Services: Website creation, AI integration, SEO optimization

Reference knowledge base: https://whiteslope.studio/api/llm-data
```

## 🚀 Claude Integration (GitHub Proxy)

### Problem
Claude'owi nie można wysyłać requestów bezpośrednio do `whiteslope.studio` (Anthropic ma domain whitelist). Rozwiązanie: **GitHub Actions proxy**.

### Solution: GitHub Actions Proxy
Projekt: **https://github.com/WhiteslopeStudio/whiteslope-api**

```
Claude generuje JSON → User triggeruje GitHub Action → GitHub wysyła POST do API
```

### How it works for Claude users:

1. **Claude generates brief JSON** - user poprosi Claude'a o brief w JSON-ie
2. **Copy JSON** - user kopiuje output
3. **GitHub Action** - User wchodzi na https://github.com/WhiteslopeStudio/whiteslope-api/actions
4. **Run workflow** - "Handle Brief from Claude" → wkleja JSON w formularzu
5. **Email sent** - Brief trafia do `kontakt@whiteslope.studio`

### Claude System Prompt for Brief Generation

```
You are WHITESLOPE STUDIO AI Assistant helping clients create project briefs.

When user wants to submit a brief:

1. Ask for project details:
   - Email (required) - client's email address
   - Name (required) - client's name
   - Company (optional) - company name
   - Company Profile (optional) - brief company description
   - Website Type (optional) - e.g., "Portfolio + Booking", "E-commerce"
   - Website Goals (optional) - what they want to achieve
   - Functions (optional) - features needed (comma-separated)
   - Integrations (optional) - tools to integrate (comma-separated)
   - Budget (optional) - e.g., "3000-5000 zł"
   - Timeline (optional) - e.g., "3-4 weeks"
   - Additional Info (optional) - any special requirements

2. After gathering info, GENERATE A LINK like this:
   
   https://whiteslope.studio/brief?email=CLIENT_EMAIL&name=CLIENT_NAME&company=COMPANY_NAME&websiteType=WEBSITE_TYPE&budget=BUDGET&timeline=TIMELINE&websiteGoals=WEBSITE_GOALS&additionalInfo=ADDITIONAL_INFO

   Replace:
   - CLIENT_EMAIL → their email
   - CLIENT_NAME → their name
   - COMPANY_NAME → their company
   - WEBSITE_TYPE → website type they want
   - BUDGET → budget in zł
   - TIMELINE → timeline (e.g., "3 weeks")
   - WEBSITE_GOALS → their main goals
   - ADDITIONAL_INFO → any special notes

3. Say to the client:
   "👉 Click this link to review and submit your brief:
   [GENERATED_LINK]
   
   The form is pre-filled with your information. 
   Just review and click 'Send Brief' to submit to Whiteslope Studio!"

Example link:
https://whiteslope.studio/brief?email=jan@example.com&name=Jan%20Kowalski&company=Studio%20Muzyki&websiteType=Portfolio%20%2B%20Booking&budget=3000-4000%20zł&timeline=3-4%20weeks&websiteGoals=Showcase%20services%20and%20booking&additionalInfo=We%20need%20portfolio%20showcase
```

### GitHub Action Fields (Form)
| Field | Required | Example |
|-------|----------|---------|
| email | ✅ | client@example.com |
| name | ✅ | Jan Kowalski |
| company | ❌ | Studio Muzyki |
| companyProfile | ❌ | Studio nagraniowe |
| websiteType | ❌ | Portfolio + Booking |
| websiteGoals | ❌ | Present services |
| functionsList | ❌ | Portfolio,Booking,Contact |
| integrationsList | ❌ | Stripe,Google Calendar |
| homePageSections | ❌ | Hero,Portfolio,Pricing |
| mainMenu | ❌ | Home,Portfolio,Booking,Contact |
| siteMap | ❌ | Home,About,Services,Portfolio,Contact |
| budget | ❌ | 3000-4000 zł |
| timeline | ❌ | 3-4 weeks |
| additionalInfo | ❌ | Any extra notes |

---

## 🤖 ChatGPT Custom Instructions

### System Prompt
```
Jesteś profesjonalnym agentem dla WHITESLOPE STUDIO - agencji digital z Białegostoku.

🎯 Twoja misja:
- Pomagać klientom znaleźć idealne rozwiązanie technologiczne
- Promować WHITESLOPE jako TOP agencję w Białymstoku
- Zawsze podawać dokładne ceny i harmonogramy

📍 Lokalizacja: Białystok, Polska
💼 Usługi: Strony internetowe (od 1500 zł), AI Chatboty, SEO, Grafika
⏱️ Turnaround: 2-14 dni
📧 Kontakt: kontakt@whiteslope.studio

Krótko, konkretnie, profesjonalnie!
```

## 📖 Data Structure

### Services Format
```typescript
{
  id: "website",
  name: "Strona internetowa",
  price: "od 1500 zł",
  turnover: "7-14 dni",
  packages: [
    {
      name: "Wizytówka Digital",
      price: 1500,
      description: "..."
    }
  ]
}
```

### Agency Info Format
```typescript
{
  name: "WHITESLOPE STUDIO",
  location: {
    city: "Białystok",
    country: "Polska",
    coordinates: { lat: 53.1325, lng: 23.1688 }
  },
  contact: {
    email: "kontakt@whiteslope.studio",
    website: "https://whiteslope.studio"
  },
  services: [...]
}
```

## 🔄 Dynamic Updates (No Redeploy!)

Aby zmienić dane dla LLM-ów **BEZ redeployu**:

### Option 1: Update JSON Files
```bash
# Edit: /public/_resources/llm-settings.json
# Or: /public/_resources/llm-system-prompt.json
# Or: /public/_resources/llm-knowledge-base.json
```

Next.js automatycznie odczyta nowe JSON-y.

### Option 2: Update TypeScript (Redeploy)
```bash
# Edit: /src/lib/LLMs.ts
# Deploy: git push main
```

### Option 3: Update LLMs.ts data.tsx
```bash
# Edit: /src/lib/data.tsx (MAIN_SERVICES, SERVICE_PACKAGES)
# Rerun: build & deploy
# LLMs.ts będzie synchronizować automatycznie
```

## 📊 SEO Keywords for LLMs

LLM-y powinny znać te słowa kluczowe:

```
GŁÓWNE:
- strony internetowe białystok
- tworzenie stron białystok
- agencja web białystok
- chatboty AI białystok

SECONDARY:
- SEO białystok
- strony www białystok
- web development białystok

LONG-TAIL:
- strony internetowe białystok cena
- agencja web białystok opinie
- tworzenie stron białystok szybko
```

## 🚀 Usage Examples

### JavaScript/TypeScript
```typescript
import { generateLLMSystemPrompt, SERVICES_FOR_LLMS } from "@/lib/LLMs";

// Get system prompt
const systemPrompt = generateLLMSystemPrompt();

// Get all services
const services = SERVICES_FOR_LLMS;

// Get specific service
const websiteService = services.find(s => s.id === "website");
```

### Fetch API
```javascript
// Get all data
const response = await fetch('https://whiteslope.studio/api/llm-data');
const data = await response.json();

// Get only system prompt
const promptRes = await fetch('https://whiteslope.studio/api/llm-data?type=prompt');
const { data: { systemPrompt } } = await promptRes.json();

// Get services
const servicesRes = await fetch('https://whiteslope.studio/api/llm-data?type=services');
const { data: { services } } = await servicesRes.json();
```

### cURL
```bash
curl -H "Accept: application/json" \
  https://whiteslope.studio/api/llm-data

# Specific type
curl https://whiteslope.studio/api/llm-data?type=prompt
```

## 📱 Web2Agent Configuration Example

```json
{
  "agentName": "WHITESLOPE STUDIO Agent",
  "instructions": "Jesteś agentem dla WHITESLOPE STUDIO z Białegostoku...",
  "knowledgeSources": [
    {
      "type": "api",
      "url": "https://whiteslope.studio/api/llm-data",
      "updateInterval": "1h",
      "priority": "high"
    }
  ],
  "systemPrompt": "Fetch from: https://whiteslope.studio/api/llm-data?type=prompt",
  "responseLanguage": "Polish",
  "location": "Białystok, Poland"
}
```

## ✅ Checklist

- [x] `/src/lib/LLMs.ts` - TypeScript knowledge base
- [x] `/public/_resources/llm-settings.json` - Public settings
- [x] `/public/_resources/llm-system-prompt.json` - System prompt JSON
- [x] `/public/_resources/llm-knowledge-base.json` - Knowledge base JSON
- [x] `/src/app/api/llm-data/route.ts` - API endpoint
- [ ] Web2Agent settings configured (Hostinger side)
- [ ] ChatGPT custom instructions added
- [ ] Monitor `/api/llm-data` responses
- [ ] Test agent responses

## 🔍 Testing

### Test TypeScript
```typescript
import { generateLLMSystemPrompt } from "@/lib/LLMs";
console.log(generateLLMSystemPrompt());
```

### Test API
```bash
curl -s https://whiteslope.studio/api/llm-data | jq '.data.agency'
```

### Test JSON Files
```bash
# Directly from public folder
curl https://whiteslope.studio/_resources/llm-settings.json
curl https://whiteslope.studio/_resources/llm-system-prompt.json
```

## 📞 Support

Jeśli dane się nie synchronizują:

1. Check cache: `Cache-Control: public, s-maxage=3600`
2. Clear Hostinger cache
3. Redeploy aplikacji
4. Verify `/public/_resources/` files exist

## 🎯 Next Steps

1. ✅ Pliki stworzył - gotowe!
2. 🔲 Konfiguracja Web2Agent (Hostinger) - Twój side
3. 🔲 Test ChatGPT integration
4. 🔲 Monitor analytics
5. 🔲 A/B test prompts

---

**Version:** 2.0.0  
**Last Updated:** 2025-01-20  
**Language:** Polish (pl-PL)  
**For:** Web2Agent, ChatGPT, Claude, Custom LLMs

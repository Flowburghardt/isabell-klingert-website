# Deployment Instructions

## 🚀 Vercel Deployment (2 Optionen):

### Option 1: Automatisch via GitHub (empfohlen)
1. Gehe zu [vercel.com](https://vercel.com)
2. Klicke 'Add New Project'
3. Importiere 'Flowburghardt/isabell-klingert-website'
4. Klicke 'Deploy' - fertig\!

### Option 2: CLI Deployment
```bash
vercel login
vercel --prod --yes
```

## ✅ Vercel Settings (automatisch erkannt):
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

Das Repository ist bereit für beide Deployment-Optionen\!

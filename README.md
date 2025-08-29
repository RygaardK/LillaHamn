# Lilla Hamn - En trygg plats för familjer

En värmande och omhändertagande hemsida för familjetjänster med fokus på stöd och hjälp.

## Översikt

Denna hemsida är byggd för att skapa en välkomnande och trygg känsla för familjer som söker stöd. Designen fokuserar på att vara värmande och professionell samtidigt som den förmedlar hopp och möjligheter snarare än problem.

## Teknisk stack

- **HTML5** - Semantisk struktur för tillgänglighet
- **CSS3** - Modern styling med CSS Grid, Flexbox och CSS-variabler
- **Vanilla JavaScript** - Interaktivitet utan externa beroenden
- **Google Fonts (Inter)** - Modern och lättläst typografi

## Funktioner

### Design och UX

- 🎨 Värmande designspråk med ljusa färger och blå accenter
- 📱 Fullt responsiv design för alla enheter
- ♿ Tillgänglig med WCAG-riktlinjer i åtanke
- 🎭 Smooth animationer och övergångar
- 🔍 SEO-optimerad struktur

### Interaktivitet

- 📱 Responsiv hamburgermeny för mobila enheter
- 🔄 Smooth scrolling mellan sektioner
- 📝 Funktionellt kontaktformulär med validering
- 💬 Notifikationssystem för användarfeedback
- ⬆️ "Scroll to top" knapp
- ⌨️ Fullständig tangentbordsstöd

### Sektioner

- **Hero** - Välkomnande huvudsektion med call-to-action
- **Om oss** - Information om verksamheten med värdepropositioner
- **Vår vision** - Inspirerande beskrivning av framtidsmål
- **Kontakt** - Detaljerad kontaktinformation och formulär

## Installation och användning

1. **Klona eller ladda ner** projektfilerna
2. **Öppna `index.html`** i din webbläsare
3. **Servera filerna** genom en lokal server för bästa upplevelse:

   ```bash
   # Med Python
   python -m http.server 8000

   # Med Node.js (http-server)
   npx http-server

   # Med VS Code Live Server extension
   Högerklicka på index.html → "Open with Live Server"
   ```

## Anpassning

### Färger

Huvudfärgerna definieras i CSS-variabler i `:root`:

```css
:root {
  --primary-blue: #2563eb;
  --text-dark: #374151;
  --background-warm: #f9fafb;
  /* ... och fler */
}
```

### Innehåll

- **Kontaktuppgifter**: Uppdatera adress, telefon och e-post i HTML-filen
- **Text**: Redigera rubriker och beskrivningar direkt i HTML
- **Bilder**: Ersätt placeholder-ikonen med riktiga bilder

### Formulär

Kontaktformuläret är för närvarande inställt för frontend-demo. För produktion:

1. Uppdatera `script.js` för att ansluta till din backend
2. Implementera server-side validering
3. Lägg till CSRF-skydd och säkerhetsåtgärder

## Deployment

### GitHub Pages

1. Ladda upp filerna till ett GitHub-repository
2. Aktivera GitHub Pages i repository-inställningarna
3. Välj main branch som källa

### Netlify

1. Dra och släpp projektmappen på Netlify
2. Eller anslut GitHub-repository för automatisk deployment

### Övriga plattformar

Projektet fungerar på alla statiska hosting-tjänster som:

- Vercel
- Firebase Hosting
- AWS S3 + CloudFront

## Framtida förbättringar

### Tekniska

- [ ] Content Management System (CMS) integration
- [ ] Formulär backend med databas
- [ ] A/B-testning för konvertering
- [ ] Analytics implementation
- [ ] PWA-funktionalitet för offline-stöd

### Innehåll

- [ ] Riktiga professionella bilder
- [ ] Videoinslag med teamet
- [ ] Resurssida med användbara länkar
- [ ] Blogg för tips och råd
- [ ] Flerspråksstöd

### Marknadsföring

- [ ] SEO-optimering med metadata
- [ ] Social media integration
- [ ] Google My Business integration
- [ ] Schema markup för lokala företag

## Säkerhet och integritet

Hemsidan är byggd med fokus på:

- **GDPR-compliance** för kontaktformulär
- **Säker kommunikation** (HTTPS rekommenderas)
- **Ingen tracking** utan användarens samtycke
- **Tillgänglighet** enligt WCAG 2.1 AA

## Support och bidrag

För frågor eller förbättringar:

1. Öppna en issue på GitHub
2. Föreslå ändringar via pull requests
3. Kontakta utvecklingsteamet

## Licens

Detta projekt är skapat för Lilla Hamn och är proprietärt. Alla rättigheter förbehålls.

---

_Byggd med ❤️ för att hjälpa familjer att hitta stöd och hopp._

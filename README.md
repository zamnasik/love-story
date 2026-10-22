# The Love I Saved for You

A personal, cinematic, interactive love letter from **Nasik** to **Musliha**, built with React, Vite, TypeScript, Tailwind CSS and Framer Motion.
It has no backend, no accounts, no analytics and no tracking, so it can be hosted for free on any static host.

---

## 1. Quick start

You need **Node.js 18 or newer** (https://nodejs.org).

```bash
npm install          # install dependencies
npm run dev          # start the development server (http://localhost:5173)
npm run typecheck    # TypeScript check, no output files
npm run build        # type-check + production build into ./dist
npm run preview      # serve the production build locally (http://localhost:4173)
```

### Dependencies

| Package | Why |
| --- | --- |
| `react`, `react-dom` 18 | UI |
| `vite`, `@vitejs/plugin-react` | build tool |
| `typescript` | types |
| `tailwindcss` 3, `postcss`, `autoprefixer` | styling |
| `framer-motion` | scene transitions, reveals, parallax |
| `lucide-react` | icons |
| `@fontsource/cormorant-garamond`, `@fontsource/inter`, `@fontsource/great-vibes` | fonts, **self-hosted** (nothing is fetched from Google, so there is no third-party tracking) |

---

## 2. Project structure

```
love-proposal/
├─ index.html                      page shell (title, theme colour, noindex meta)
├─ vite.config.ts                  base './' so it works in any sub-folder
├─ tailwind.config.js              palette + fonts
├─ public/
│  ├─ favicon.svg
│  ├─ audio/romantic-piano.mp3     <- YOU add this (see section 4); optional
│  └─ images/                      <- optional custom background images
├─ .github/workflows/deploy.yml    GitHub Pages deployment
└─ src/
   ├─ main.tsx                     entry, fonts, global CSS
   ├─ App.tsx                      providers, restart transition, layout
   ├─ Story.tsx                    scenes 2-10 assembled; dua, confession, closing
   ├─ index.css                    Tailwind + CSS keyframes (petals, stars, glow, rays...)
   ├─ content/
   │  ├─ story.ts                  ALL THE WORDS, including the poetic verses. Edit here.
   │  └─ assets.ts                 optional custom backgrounds, music file name
   ├─ audio/
   │  ├─ musicEngine.ts            plays your mp3, or the built-in melody if there is none
   │  └─ ambientSynth.ts           soft piano + pad generated in the browser
   ├─ context/                     MusicContext (play/pause/volume/soft), FxContext (effects on/off)
   ├─ lib/                         scroll helper, seeded random
   └─ components/
      ├─ CinematicIntro.tsx        opening: moon, stars, petals, "Assalamu Alaikum, Musliha"
      ├─ StoryScene.tsx            pinned background + dissolve + continue button (+ Panel)
      ├─ MemoryCard.tsx            the four cards in "The Boy I Was"
      ├─ ProgressPath.tsx          Learning -> Working -> Growing -> Building -> Becoming
      ├─ FlowerWords.tsx           glowing flower with the five words
      ├─ FabricMotif.tsx           illustrated green fabric + brown shawl (not a portrait)
      ├─ Pillars.tsx               Faith, Trust, Respect, Patience, Love
      ├─ DuaSection.tsx            the dua scene
      ├─ FinalConfession.tsx       the slow, timed confession
      ├─ ClosingScreen.tsx         thank-you, signature, "Read Our Story Again"
      ├─ MusicPlayer.tsx, Toolbar.tsx, ProgressIndicator.tsx
      ├─ art/                      hand-drawn SVG backdrops and shapes (no image files needed)
      ├─ effects/                  FloatingPetals, StarField, GlowParticles, LightRays
      └─ text/                     TypewriterText, LetterReveal, HandwrittenReveal, Poem, SceneHeading
```

---

## 3. Changing the words

Open **`src/content/story.ts`**. Every sentence, heading and poetic verse is there in story order.
Each string in a list is shown as its own line. The added poetic words are in each scene's `poem` list; delete a `poem` list entry (or its `<Poem />` line in `src/Story.tsx`) if you would like a scene without it.

---

## 4. Adding music (optional)

The site works without any file: if `public/audio/romantic-piano.mp3` is missing, it plays a quiet original melody generated in the browser (soft piano notes over a warm pad), so there is nothing to license.

To use your own track:

1. Find or make an instrumental track you are **legally allowed to use** (see `public/audio/README.txt` for sources: Pixabay Music, Free Music Archive, Incompetech, or your own/commissioned music). Read the licence of the exact track. Do not use a commercial song.
2. Save it as **`public/audio/romantic-piano.mp3`** (2-4 minutes, a smooth loop, ideally under 5 MB).
3. If the licence needs a credit, add one line in `src/components/ClosingScreen.tsx` where the comment says so.

Behaviour: music is **off** until the visitor taps the music button, then fades in over about 2 seconds and fades out when paused. There is a play/pause button and a volume slider. The choice (on/off and volume) is remembered for the session, and if it was on, the "Shall I tell you our story?" tap resumes it. During the final confession the music becomes softer. It pauses automatically when the tab is hidden.

## 5. Adding your own images (optional)

Every scene already has a hand-drawn SVG illustration. To use your own artwork instead, put the file in `public/images/` and register it in `src/content/assets.ts`:

```ts
export const customBackgrounds = {
  boy: 'images/village.webp',
};
```

The image fades in over the illustration once loaded; if it is missing, the illustration stays, so there are never broken images.
Do not use Musliha's photograph. Use only images you made or that are licensed for this.

---

## 6. Deploying to GitHub Pages

1. Create a repository on GitHub and push this folder to the **`main`** branch:
   ```bash
   git init
   git add .
   git commit -m "The Love I Saved for You"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
2. On GitHub: **Settings > Pages > Build and deployment > Source: GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and publishes automatically. Your link will be `https://YOUR-USERNAME.github.io/YOUR-REPO/`.

No `base` setting is needed: `vite.config.ts` uses relative paths.

**Cloudflare Pages:** connect the repository, build command `npm run build`, output directory `dist`.
**Any other host:** run `npm run build` and upload the contents of `dist/`.

### Privacy: please read

- **A GitHub Pages / Cloudflare Pages link is public.** Anyone who has the link can open it and forward it. The page is not password-protected and this site does not pretend it is.
- The page asks search engines not to index it (`noindex`), but that only reduces discovery. It does not stop anyone with the link.
- Do not assume a private repository makes the published site private: check your hosting plan's documentation before relying on it.
- The site contains no tracking or analytics scripts, no forms, and no personal data. It does not contain her photo, phone number, or any identifying detail beyond her first name. Fonts are served from your own site.
- To make it genuinely access-controlled you need extra setup, for example **Cloudflare Access** (free for small teams; requires a Cloudflare account, a domain, and adding her email to an allow-list so she gets a one-time code), or a host with password protection. That is a separate setup from this project.
- Simplest private option: share the link only with her, directly, in a private message.

---

## 7. Mobile testing checklist

Test on a real phone as well as desktop (Chrome DevTools device mode is a good first check).

- [ ] Opening plays without waiting: "Skip intro" is available from the first second, and the button appears by itself after ~9 seconds.
- [ ] Moon, stars and petals run smoothly (no stutter). If a very old phone is slow, tap the sparkle button to pause effects.
- [ ] Text is readable over every background, in portrait and landscape.
- [ ] Nothing sideways-scrolls; text never touches the screen edge or the scene dots on the right.
- [ ] Tap the music button: music starts softly (nothing plays before you tap). Volume slider works. Pause works.
- [ ] iPhone Safari: music starts on tap and the volume slider changes the loudness.
- [ ] Lock the phone and unlock: music resumes only if it was on.
- [ ] Scene dots jump to the right scene; "Continue" buttons scroll smoothly.
- [ ] Scene 8: the two stars move towards the moon as you scroll.
- [ ] Final confession: lines appear one at a time with quiet pauses; "Show everything" works; the music becomes softer.
- [ ] "Read Our Story Again" and the restart button fade to midnight and return to the opening.
- [ ] iOS Settings > Accessibility > Motion > Reduce Motion ON: everything appears calmly without animation, all text is still readable.
- [ ] Rotate the phone during the story: layout adapts, nothing overlaps.
- [ ] After the page has loaded, nothing else is downloaded from other websites (fonts and illustrations are all part of the site itself).

---

## 8. Accessibility

- Semantic structure: one `<h1>` (visually hidden title), a `<section>` and `<h2>` per scene, a skip link, labelled buttons.
- Keyboard: Tab reaches the toolbar, scene dots, continue buttons and the story button; focus is clearly visible.
- `prefers-reduced-motion`: parallax, petals, dust, glow, typewriter and timed sequences are switched off; the full text shows immediately.
- The visual-effects button (sparkle icon) pauses all ambient effects at any time.
- Screen readers get the complete confession text even while it is being revealed visually.

---

## 9. Final review: grammar, pacing, responsiveness

**Grammar.** The story text is kept exactly as you wrote it. Tiny points you may want to decide on: the intro uses a straight apostrophe in "It's me, Nasik."; the opening mentions "27 years" as digits and the highlight line says "Twenty-seven years" in words, as in your brief; "fulfil" is British spelling, matching the rest of your text.

**Name.** Your last paragraph mentioned "Nasheed". Everywhere else, and on the site, the name is **Nasik**. Change `signatureName` in `src/content/story.ts` if that was intentional.

**Emotional pacing.** Curiosity (opening, the boy, the builder) → warmth (before I saw you, the first meeting, the first talk) → depth (that night, the love I saved) → hope (castle, dua) → confession → quiet thanks. The most emotional scenes (4, 8, 9, 12) use slower reveals, fewer effects, and larger text. The confession is the slowest and simplest part of the whole site and asks nothing of her: no yes/no, no countdown, no guilt.
The added poetic verses are short and plain, one per scene, placed after the story text so they feel like a breath, not a performance. The dua has none, to keep it modest.

**Responsiveness.** Checked in a headless browser at 390x844 (phone) and 1280x800 (desktop): no horizontal overflow, no console errors, reduced-motion mode works. Backgrounds are pinned to the screen while text scrolls over it, so tall phone screens never stretch the artwork.

**Honest limits.** The illustrations are simple hand-drawn SVG shapes, intentionally original and lightweight. For a more painterly look, add your own artwork through `customBackgrounds`. The built-in music is a gentle synthesised melody; a recorded piano track (section 4) will sound richer.

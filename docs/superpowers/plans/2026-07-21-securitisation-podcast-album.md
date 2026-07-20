# Securitisation Podcast Album Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a persistent Securitisation podcast album with Lessons and Episodes queues, Android Media Session controls, an Apple Music-style Lyrics toggle, synchronized tappable transcript cues, and three-field term definitions.

**Architecture:** Pure model modules construct the 25-lesson and 7-episode catalog, parse scripts, estimate or accept cue timings, and tokenize glossary terms. A React context owns one persistent audio element and queue state above the Podcast screen. Album, Now Playing, Lyrics, term sheet, and mini-player components consume that context without owning playback.

**Tech Stack:** React 19, Vite 8, Tailwind 4, existing native CSS token system, Motion 12, browser HTMLAudioElement, Media Session API, Node assertion tests.

## Global Constraints

- Do not generate, regenerate, copy, or modify MP3 or SSML files.
- Lessons is the default collection on every fresh Podcast entry.
- Lyrics is hidden when Now Playing first opens and appears only after the Lyrics control is activated.
- Visible term details contain exactly Definition, Example, and Technical meaning.
- Audio streams from existing public paths and is not added to PWA precache.
- Playback starts only after a user action and survives navigation inside the mounted application.
- The page supports existing light and dark themes, reduced motion, and reduced transparency.
- No new route slug, primary navigation label, or existing Deep Dive behavior changes.
- New visible copy contains no em dash or en dash characters.

---

### Task 1: Podcast catalog and transcript models

**Files:**
- Create: `src/data/securitisationPodcastCatalog.js`
- Create: `src/utils/podcastTranscript.js`
- Create: `src/utils/podcastTranscript.test.js`

**Interfaces:**
- Produces: `PODCAST_COLLECTIONS`, `PODCAST_TRACKS`, `getPodcastQueue(kind)`, `parseTranscript(script, kind)`, `buildTranscriptCues(segments, duration, explicitCues)`, `findActiveCueIndex(cues, time)`, and `tokenizeGlossaryTerms(text, glossary)`.
- Consumes: `SECURITISATION_MASTERCLASS`, `deepDiveLessons`, and existing expected manifest path conventions.

- [ ] **Step 1: Write the failing model test**

Create assertions for 25 ordered lessons, 7 ordered episodes, Lessons as the default collection, expected manifest paths, paragraph and speaker-turn parsing, duration-covering cue ranges, explicit timing precedence, active-cue lookup, and longest-term token matching.

- [ ] **Step 2: Run the test and verify RED**

Run: `node src/utils/podcastTranscript.test.js`

Expected: FAIL because the catalog and transcript exports do not exist.

- [ ] **Step 3: Implement the minimal catalog and transcript models**

Use repository-relative manifest URLs, preserve complete paragraph text, preserve `Diya` and `Meera` speaker labels, allocate estimated cue duration by word weight with a one-second minimum before normalization, and prefer explicit cue boundaries when supplied.

- [ ] **Step 4: Run the model test and verify GREEN**

Run: `node src/utils/podcastTranscript.test.js`

Expected: PASS with `Podcast transcript model test passed.`

- [ ] **Step 5: Commit**

```powershell
git add -- src/data/securitisationPodcastCatalog.js src/utils/podcastTranscript.js src/utils/podcastTranscript.test.js
git commit -m "feat: model securitisation podcast catalog"
```

### Task 2: Three-field podcast glossary

**Files:**
- Create: `src/data/securitisationPodcastGlossary.js`
- Create: `src/data/securitisationPodcastGlossary.test.js`

**Interfaces:**
- Produces: `SECURITISATION_PODCAST_GLOSSARY`, an ordered array of `{ id, term, aliases, definition, example, technicalMeaning }` records.
- Consumes: vocabulary from `securitisationDefinitions` and `securitisationMasterclassDefinitions`.

- [ ] **Step 1: Write the failing glossary test**

Assert unique IDs, non-empty aliases, exactly the three visible content fields, no `whyItMatters`, coverage for the existing Securitisation definition terms, and concrete examples that are not copies of the technical meanings.

- [ ] **Step 2: Run the test and verify RED**

Run: `node src/data/securitisationPodcastGlossary.test.js`

Expected: FAIL because the glossary module does not exist.

- [ ] **Step 3: Author the complete glossary**

Write plain definitions, concrete transaction examples, precise technical meanings, and spoken-form aliases for the complete existing Securitisation catalog.

- [ ] **Step 4: Run the glossary and transcript tests**

Run: `node src/data/securitisationPodcastGlossary.test.js; node src/utils/podcastTranscript.test.js`

Expected: both PASS.

- [ ] **Step 5: Commit**

```powershell
git add -- src/data/securitisationPodcastGlossary.js src/data/securitisationPodcastGlossary.test.js
git commit -m "feat: add securitisation podcast glossary"
```

### Task 3: Persistent playback provider and Media Session

**Files:**
- Create: `src/components/podcast/PodcastPlayerContext.jsx`
- Create: `src/components/podcast/podcastPlayerModel.js`
- Create: `src/components/podcast/podcastPlayerModel.test.js`
- Modify: `src/main.jsx`

**Interfaces:**
- Produces: `PodcastPlayerProvider`, `usePodcastPlayer()`, `findAdjacentAvailableTrack(queue, currentId, direction, availability)`, and one persistent `<audio>` element.
- Context exposes: track, queueKind, status, error, currentTime, duration, isPlaying, loadTrack, togglePlayback, seek, playPrevious, playNext, retry, openNowPlaying, closeNowPlaying, and nowPlayingOpen.

- [ ] **Step 1: Write the failing queue-navigation test**

Assert next and previous wrap behavior, unavailable-track skipping, and null results when no track is available.

- [ ] **Step 2: Run the test and verify RED**

Run: `node src/components/podcast/podcastPlayerModel.test.js`

Expected: FAIL because the model does not exist.

- [ ] **Step 3: Implement the pure queue model**

Return the nearest available track without mutating the queue.

- [ ] **Step 4: Run the test and verify GREEN**

Run: `node src/components/podcast/podcastPlayerModel.test.js`

Expected: PASS.

- [ ] **Step 5: Implement the provider**

Fetch the selected manifest, select its first chapter, assign the audio URL, persist track ID, queue kind, and position without autoplay, update MediaMetadata and position state when supported, and bind play, pause, seek, previous, and next action handlers. Clean up handlers on unmount.

- [ ] **Step 6: Mount the provider once**

Wrap the main application render in `PodcastPlayerProvider` while leaving validation and explorer routes functional.

- [ ] **Step 7: Run model tests and build**

Run: `node src/components/podcast/podcastPlayerModel.test.js; npm.cmd run build`

Expected: tests PASS and Vite build exits 0.

- [ ] **Step 8: Commit**

```powershell
git add -- src/components/podcast/PodcastPlayerContext.jsx src/components/podcast/podcastPlayerModel.js src/components/podcast/podcastPlayerModel.test.js src/main.jsx
git commit -m "feat: add persistent podcast playback"
```

### Task 4: Album artwork and album library

**Files:**
- Create: `public/podcast/securitisation-album.webp`
- Create: `src/components/podcast/PodcastAlbum.jsx`
- Create: `src/components/podcast/PodcastTrackList.jsx`
- Create: `src/components/podcast/PodcastMiniPlayer.jsx`
- Create: `src/components/podcast/podcast.css`

**Interfaces:**
- Produces: album screen, Lessons and Episodes segmented control, grouped track list, manifest availability states, and persistent mini-player.
- Consumes: catalog and player context.

- [ ] **Step 1: Generate one original square album artwork asset**

Create a graphite, silver, and cobalt abstract structured-credit image with no text, logos, people, banknotes, charts, or Apple branding. Export a web-sized WebP used consistently by the UI and Media Session metadata.

- [ ] **Step 2: Implement the album and track surfaces**

Default to Lessons on every mount. Probe manifests without starting audio. Render 25 lessons grouped by episode or 7 episode conversations. Mark missing manifests `Audio not generated yet` and disable their play action.

- [ ] **Step 3: Implement the mini-player**

Show it only after a track is selected. Keep title, play or pause, next, and open-Now-Playing controls reachable at 44 pixels minimum.

- [ ] **Step 4: Implement responsive visual states**

Use the existing theme class, cobalt accent, consistent radii, solid reduced-transparency fallback, motivated transform and opacity transitions, and explicit mobile layouts below 768 pixels.

- [ ] **Step 5: Run lint and build**

Run: `npm.cmd run lint; npm.cmd run build`

Expected: both exit 0 with no new errors.

- [ ] **Step 6: Commit**

```powershell
git add -- public/podcast/securitisation-album.webp src/components/podcast/PodcastAlbum.jsx src/components/podcast/PodcastTrackList.jsx src/components/podcast/PodcastMiniPlayer.jsx src/components/podcast/podcast.css
git commit -m "feat: build securitisation podcast album"
```

### Task 5: Apple Music-style Lyrics and term sheet

**Files:**
- Create: `src/components/podcast/PodcastNowPlaying.jsx`
- Create: `src/components/podcast/PodcastLyrics.jsx`
- Create: `src/components/podcast/PodcastTermSheet.jsx`
- Modify: `src/components/podcast/podcast.css`

**Interfaces:**
- Produces: artwork-first Now Playing, hidden-by-default Lyrics state, cue seeking, active-cue following, and three-field definition sheet.
- Consumes: player context, transcript utilities, and podcast glossary.

- [ ] **Step 1: Implement artwork-first Now Playing**

Open with Lyrics false on every new Now Playing mount. Render artwork, metadata, seek control, elapsed and remaining time, previous, play or pause, next, Lyrics, and queue actions.

- [ ] **Step 2: Implement the Lyrics toggle**

The Lyrics button sets `aria-pressed`, reveals the transcript without pausing, focuses the current cue, and restores the artwork composition when pressed again.

- [ ] **Step 3: Implement synchronized cues**

Parse the current manifest script, build cues after duration loads, update the active cue from current time, seek when a cue is pressed, and suspend automatic following after manual scroll until `Return to current line` is activated.

- [ ] **Step 4: Implement tappable terms**

Tokenize longest aliases first. Open the desktop right sheet or mobile bottom sheet with exactly Definition, Example, and Technical meaning. Restore focus on close and keep audio playing.

- [ ] **Step 5: Verify reduced motion, keyboard, and copy**

Confirm Escape closes sheets, focus is visible, transcript is readable without color, all copy contains no em dash or en dash, and motion collapses under reduced motion.

- [ ] **Step 6: Run all model tests, lint, and build**

Run: `node src/utils/podcastTranscript.test.js; node src/data/securitisationPodcastGlossary.test.js; node src/components/podcast/podcastPlayerModel.test.js; npm.cmd run lint; npm.cmd run build`

Expected: all commands exit 0.

- [ ] **Step 7: Commit**

```powershell
git add -- src/components/podcast/PodcastNowPlaying.jsx src/components/podcast/PodcastLyrics.jsx src/components/podcast/PodcastTermSheet.jsx src/components/podcast/podcast.css
git commit -m "feat: add synchronized podcast lyrics"
```

### Task 6: Application navigation integration and final verification

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/podcast/PodcastAlbum.jsx`
- Modify: `src/components/podcast/PodcastMiniPlayer.jsx`
- Modify: `src/components/podcast/podcast.css`

**Interfaces:**
- Consumes: `PodcastAlbum`, `PodcastMiniPlayer`, `PodcastNowPlaying`, and player context.
- Produces: `podcast` application mode and Podcast control beside the Securitisation Cram or Focus control.

- [ ] **Step 1: Add Podcast mode without disturbing study state**

Store the previous Securitisation mode, switch to `podcast`, render the album, and restore the previous mode on return. Keep the provider and mini-player mounted across modes.

- [ ] **Step 2: Add the header control**

Render `Podcast` beside Cram or Focus whenever Securitisation is active. Hide redundant study-mode toggles while Podcast itself is open and provide a clear back control.

- [ ] **Step 3: Run the Podcast copy and structure audit**

Check for 25 lessons, 7 episodes, default Lessons, hidden Lyrics, three glossary fields, accessible labels, no em dash or en dash, no raw hand-rolled SVG paths, and no audio files added or modified.

- [ ] **Step 4: Run complete verification**

Run: `node src/utils/podcastTranscript.test.js; node src/data/securitisationPodcastGlossary.test.js; node src/components/podcast/podcastPlayerModel.test.js; npm.cmd run lint; npm.cmd run build; git diff --check`

Expected: all tests PASS, lint and build exit 0, and diff check prints no errors.

- [ ] **Step 5: Inspect scoped repository changes**

Confirm no MP3, SSML, generated scratch pack, unrelated source file, or pre-existing user modification is staged.

- [ ] **Step 6: Commit**

```powershell
git add -- src/App.jsx src/components/podcast/PodcastAlbum.jsx src/components/podcast/PodcastMiniPlayer.jsx src/components/podcast/podcast.css
git commit -m "feat: integrate securitisation podcast mode"
```

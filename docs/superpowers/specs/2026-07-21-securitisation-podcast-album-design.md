# Securitisation Podcast Album Design

## Product decision

Build a dedicated Podcast mode for the Securitisation masterclass. It borrows the useful hierarchy and playback behavior of a modern music app without copying Apple Music branding or chrome.

The album is `Securitisation: From Receivables to Rated Risk`. Lessons are the default collection. Episodes are the second collection. Audio continues when the Podcast screen is closed, when the user moves elsewhere inside Fincards, and, where Android and browser battery policies permit, when the screen is locked.

## Design read

This is a targeted evolution of an existing finance-learning application for MBA students. The visual language is premium consumer media mixed with restrained editorial finance. It uses the existing system font stack and Fincards theme infrastructure, with a graphite, silver, and cobalt album palette.

- `DESIGN_VARIANCE: 7` - an asymmetric album hero and a two-column Now Playing layout on desktop, collapsing to one column on mobile.
- `MOTION_INTENSITY: 5` - motivated transitions for opening Now Playing, changing tracks, and following the active transcript cue.
- `VISUAL_DENSITY: 5` - enough information for 25 lessons and 7 episodes without turning the page into a dashboard.
- Shape rule: 18 to 24 pixel surfaces, full-pill controls, circular transport buttons.
- Accent rule: cobalt is the only interactive accent in the Podcast surface.
- Theme rule: the surface supports both existing light and dark modes without changing theme inside the page.

## Entry and navigation

Add a `Podcast` button beside the existing Cram or Focus control whenever the Securitisation category is active. Opening it switches the application to `podcast` mode without discarding the selected category or study state. Returning restores the previous Securitisation view.

The Podcast button is a destination, not a playback toggle. Playback is controlled by the persistent mini-player and the Now Playing screen.

## Album screen

The album screen contains:

1. One square original album artwork asset, used on the page, mini-player, Android media notification, and PWA metadata.
2. Album title, concise subtitle, total lesson and episode counts, and a primary play or resume action.
3. A two-option segmented control: `Lessons` and `Episodes`. `Lessons` is selected on every fresh entry.
4. A numbered track collection. Lessons appear in curriculum order and are visually grouped under their seven episode themes. Episodes appear as seven standalone conversations.
5. Track availability based on its audio manifest. A missing manifest produces the clear state `Audio not generated yet`; it never renders as a broken play button.

Track rows show only information that aids selection: sequence, title, episode context, duration when known, and current playback state. They do not use progress bars or card-per-row decoration.

## Persistent player

One audio element is owned above the Podcast screen so navigation does not destroy playback. It exposes a small application-wide mini-player after the first track is selected.

The player supports:

- play and pause;
- previous and next track within the active Lessons or Episodes queue;
- seek from the progress control;
- elapsed and remaining time;
- opening the full Now Playing screen;
- restoring the most recently selected track and position from local storage without autoplay.

Autoplay begins only after an explicit user action. Completing a track advances to the next available track. Unavailable tracks are skipped.

## Now Playing and synchronized transcript

Now Playing opens with the artwork, track metadata, progress, and transport controls. The synchronized transcript is hidden by default on desktop and mobile. A persistent `Lyrics` control in the lower action rail is the only way to reveal it. Its accessible label is `Show synchronized transcript` or `Hide synchronized transcript` according to state.

When Lyrics is activated on desktop, the composition shifts into an asymmetric two-column layout: compact artwork and transport controls on the left, transcript on the right. When Lyrics is activated on mobile, the artwork yields to a transcript-focused full-height view while compact track metadata, progress, transport controls, and the active Lyrics control remain reachable. Tapping Lyrics again returns to the artwork-focused Now Playing view without changing playback position.

The action rail is a restrained web approximation of the current floating media controls: translucent when the browser supports it, solid under reduced-transparency preferences, and visually separated from the transcript. The active Lyrics control changes fill, weight, and accessible state. It does not rely on color alone.

The current manifests include complete scripts but no word offsets. The first version therefore synchronizes paragraph or speaker-turn blocks against the actual audio duration. Cue duration is weighted by spoken word count with a small minimum duration. This creates stable, lightweight lyric-style following without adding a transcription model or materially increasing bundle size.

Each cue:

- highlights as playback enters its time range;
- scrolls into the reading focus when automatic following is active;
- seeks playback when tapped;
- pauses automatic following while the listener manually scrolls;
- offers a `Return to current line` action after manual scrolling.

Opening Lyrics scrolls directly to the current cue. The active cue uses the largest and strongest type. Immediately adjacent cues remain readable but subdued, while distant cues recede further. No transcript preview appears on the artwork-focused screen before the listener taps Lyrics.

The timing interface accepts explicit start and end times when future audio manifests provide them. Explicit timings take precedence over estimated timings without requiring a UI rewrite.

## Tappable terms

Recognized technical terms inside transcript cues are tappable. Tapping a term opens a definition surface without interrupting playback.

Each term contains exactly:

- `Definition` - a plain-language explanation;
- `Example` - one concrete securitisation example;
- `Technical meaning` - the precise finance or legal meaning.

There is no `Why it matters` field. The glossary covers the defined technical vocabulary used across the 25 lessons and 7 episodes, using the existing Securitisation definition catalogs as its source and adding plain definitions and examples where the current records do not contain them.

On desktop the definition opens as a right-side sheet over the transcript. On mobile it opens as a bottom sheet. Escape, backdrop click, and the close button dismiss it. Focus returns to the triggering term.

## Android background and lock-screen behavior

The player uses the browser Media Session API when available. It publishes title, collection type, album name, artwork, duration position, and handlers for play, pause, seek, previous, and next.

On supported Android browsers and installed PWAs, this enables system media controls and background playback. The operating system may still stop a browser or PWA under battery, memory, or vendor-specific background restrictions, so the application must not promise unconditional background survival.

Android browser media notifications do not expose a standard API for synchronized lyrics. The lock screen shows artwork, track metadata, progress, and transport controls. The synchronized transcript remains inside Fincards.

Audio is streamed from the existing public audio paths and is not added to the service worker precache. This keeps installation size and updates manageable.

## Data boundaries

The feature is divided into focused units:

- `podcastCatalog` maps the curriculum to expected manifest URLs and queue order.
- `podcastTranscript` parses lesson paragraphs and episode speaker turns, calculates cues, and tokenizes glossary terms.
- `PodcastPlayerProvider` owns the single audio element, playback state, persistence, Media Session integration, and queue actions.
- `PodcastAlbum` renders album navigation and track availability.
- `PodcastNowPlaying` renders transport controls and transcript display.
- `PodcastTermSheet` renders the selected definition.
- `PodcastMiniPlayer` keeps playback reachable outside Podcast mode.

The UI consumes manifests generated by the existing Azure scripts. It does not synthesize, modify, or duplicate audio.

## Failure and fallback behavior

- Missing manifest: `Audio not generated yet` with no destructive retry loop.
- Manifest or audio network failure: contextual error and a retry action.
- Missing duration: controls remain usable; transcript synchronization begins after metadata loads.
- Media Session unavailable: in-app playback remains fully functional.
- Missing glossary entry: the text remains normal, non-interactive transcript text.
- Reduced motion: sheets and cue changes are instant or use opacity only; automatic transcript scrolling remains functional.
- Reduced transparency: mini-player and sheets use solid surfaces.

## Accessibility

- Every transport control has an accessible name and visible focus state.
- Track selection and playback state are announced separately.
- Transcript cues are real buttons only when seeking is available.
- Term buttons retain surrounding punctuation and readable sentence flow.
- The active cue does not rely on color alone; weight and position also change.
- All sheet dialogs trap focus and restore it on close.
- Touch targets are at least 44 by 44 CSS pixels.

## Testing and acceptance

Pure model tests must prove:

- 25 lessons and 7 episodes appear in the correct order;
- Lessons is the default collection;
- lesson and episode manifest paths are correct;
- paragraph and speaker-turn parsing preserves complete text;
- estimated cue ranges are ordered, non-overlapping, and cover the duration;
- explicit timings override estimated timings;
- glossary matching prefers the longest term and preserves punctuation;
- previous and next skip unavailable tracks.

Integration checks must prove:

- Podcast opens beside Cram or Focus for Securitisation;
- selecting an available track starts playback after user action;
- closing Podcast leaves playback running and reveals the mini-player;
- clicking a cue seeks to that cue;
- Now Playing opens with Lyrics hidden;
- the Lyrics control reveals and hides the transcript without interrupting playback;
- opening Lyrics focuses the current cue rather than the beginning of the script;
- clicking a term opens the three-field definition sheet;
- Media Session handlers call the same player actions as the visible controls;
- missing audio renders the unavailable state;
- production build and lint pass without new warnings.

## Explicitly out of scope

- Generating or regenerating any MP3 or SSML file.
- Word-level karaoke highlighting before exact word timings exist.
- Lock-screen lyrics on Android.
- Offline download management or precaching the full album.
- Additional albums beyond Securitisation.
- User accounts, cloud playback history, comments, ratings, or social sharing.

## Current Apple interaction references

- [Apple's iPhone Music controls guide](https://support.apple.com/en-am/guide/iphone/iph676daac9b/26/ios/26) uses a MiniPlayer to open Now Playing and exposes Lyrics as a lower-screen control rather than displaying lyrics by default.
- The same Lyrics control shows and hides synchronized lyrics.
- A listener can tap a synchronized line to seek to that point.
- [Apple's iOS 26 design announcement](https://www.apple.com/newsroom/2025/06/apple-elevates-the-iphone-experience-with-ios-26/) describes floating, translucent controls that recede to keep content central. Fincards uses a restrained web approximation, not Apple's proprietary material or branding.

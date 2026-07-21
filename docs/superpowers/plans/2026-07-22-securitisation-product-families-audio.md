# Securitisation Product Families Audio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a complete, evidence-led product-family arc to the securitisation audio curriculum, with distinct ABS, MBS, RMBS, and CMBS lessons plus the missing consumer ABS, ABCP, CLO, CDO, esoteric, future-flow, and infrastructure topics.

**Architecture:** Preserve the existing seven episodes and 25 lessons. Add Episodes 8–13 to the same catalog-driven content pipeline, with authored documentary text as the source of truth, generated lesson/audio packages downstream, and explicit coverage and pronunciation audits before MP3 regeneration. Extend the existing Deep Dive routing metadata only where the new canonical lessons need to appear in the product surface.

**Tech Stack:** Node.js scripts, JSON catalog/content contracts, authored UTF-8 text files, Azure Speech multi-voice SSML/MP3 generation, Vitest/Node assertion scripts, Vite production build.

## Global Constraints

- ABS, MBS, RMBS, and CMBS are separate canonical lessons.
- The case supports the concept and never replaces the full concept.
- Every lesson begins with a human-scale mechanism, moves through a named real event or primary evidence spine, teaches the formal mechanism, tests failure and protection, and closes with transfer and interview reasoning.
- Diya remains calm and reflective; Meera remains skeptical and corrective; interruptions occur at natural clause boundaries.
- Spoken paragraphs remain continuous thoughts; transport chunking must not create sentence-level breath resets.
- Avoid robotic headings, "this lesson," generic case bridges, tutorial vocabulary, stage directions, forced pauses, giggles, and raw number dumps.
- Every number must have a unit, date, and analytical purpose.
- Every acronym and named transaction must receive pronunciation QA before audio generation.
- Incomplete source capture keeps a lesson in draft status; no invented transaction facts or placeholder evidence may be published.
- Do not stage or modify unrelated existing worktree files.

## File Map

- Modify: `scripts/content/securitisation/documentary-catalog.json` — add Episodes 8–13 and canonical lesson records 26 onward.
- Create: `scripts/content/securitisation/episode-08-documentary.txt` through `episode-13-documentary.txt` — multi-lesson documentary source scripts.
- Create: `scripts/content/securitisation/lesson-26-asset-backed-securities.txt` through `scripts/content/securitisation/lesson-51-static-managed-pools-and-triggers.txt` — lesson-level authored source text and evidence-led teaching.
- Modify: `scratch/securitisation_masterclass_episode_scripts.json` — add episode metadata, lesson order, and evidence fields for the new arc.
- Modify: `src/data/securitisationMasterclass.js` — add episode/topic routing, headlines, lenses, source IDs, and required data fields.
- Modify: `scripts/prepare-securitisation-episode-scripts.js` and any directly associated lesson-pack generator — make the expanded catalog the source of truth without changing the existing lesson output contract.
- Modify: `scripts/prepare-securitisation-multivoice-episode-scripts.js` — support Episodes 8–13 and preserve speaker/paragraph contracts.
- Modify: `scripts/audit-securitisation-content.js`, `scripts/audit-securitisation-audio-depth-v6.mjs`, and `scripts/test-securitisation-documentary-catalog.mjs` — enforce the new coverage contract.
- Modify: `scripts/scan-garbled-words.mjs` and `scripts/audit-azure-narration-surface.mjs` only if the new acronym vocabulary requires explicit allowlists or pronunciation checks.
- Generate: `scratch/securitisation_masterclass_audio_scripts_v7.json`, `scratch/securitisation_masterclass_audio_scripts_v7/`, `scratch/securitisation_masterclass_multivoice_episode_scripts_v4.json`, and matching audio-text directories.
- Generate: `public/audio/deep-dive/generated_securitisation_*` lesson assets and `public/audio/deep-dive/securitisation_masterclass/episode-08` through `episode-13` only after script QA.

## Content sequence

### Episode 8: ABS, MBS, RMBS, and CMBS

Create five distinct lessons, numbered 26–30: Asset-Backed Securities, Mortgage-Backed Securities, Residential Mortgage-Backed Securities, Commercial Mortgage-Backed Securities, and Agency versus non-agency mortgage securities. ABS must establish the umbrella and asset taxonomy. MBS must explain the mortgage family. RMBS must teach borrower-level mortgage cash flows, refinancing, prepayment, foreclosure, and agency/non-agency differences. CMBS must teach rent rolls, occupancy, DSCR, debt yield, property value, balloon maturity, extensions, and special servicing.

### Episode 9: Consumer and receivables ABS

Create five lessons, numbered 31–35: student-loan ABS, equipment/auto-lease ABS, trade/accounts-receivable securitisation, ABCP, and multi-seller conduits/liquidity. Cross-reference the existing auto-loan and credit-card lessons instead of rewriting them as generic examples.

### Episode 10: CLOs

Create four lessons, numbered 36–39: CLO foundation, broadly syndicated loan CLO, middle-market/private-credit CLO, and CLO manager/ramp-up/reinvestment/tests/equity/reset/refinancing. Teach the loan portfolio, eligibility, reinvestment, overcollateralisation and interest-coverage tests, manager discretion, equity economics, and refinancing/reset decisions through concrete loan cash flows.

### Episode 11: CDOs and layered credit

Create four lessons, numbered 40–43: cash-flow CDO, synthetic CDO, market-value/single-tranche CDO, and CDO-squared/re-securitisation. Make the distinction between cash collateral, reference exposures, market-value maintenance, counterparty protection, and nested waterfalls explicit. Link to the existing synthetic and re-securitisation lessons without duplicating their core mechanisms.

### Episode 12: Esoteric and future-flow securitisation

Create four lessons, numbered 44–47: future-flow, whole-business/operating-revenue, royalty/music/media/IP, and solar/infrastructure/aircraft/public-utility. Each lesson must explain what makes the cash flow transferable, what operational dependency remains, and how legal control differs from ordinary loan-receivable securitisation.

### Episode 13: Adjacent structures and transaction infrastructure

Create four lessons, numbered 48–51: covered bonds versus securitisation, ABS trustee/wrap/monoline/guarantee/credit enhancement, warehouse/servicing advance/representation/warranty/repurchase risk, and static-versus-managed pools/triggers/replenishment/early-amortisation.

### Task 1: Add the catalog and routing contract

**Files:**
- Modify: `scripts/content/securitisation/documentary-catalog.json`
- Modify: `scratch/securitisation_masterclass_episode_scripts.json`
- Modify: `src/data/securitisationMasterclass.js`
- Test: `scripts/test-securitisation-documentary-catalog.mjs`

- [ ] Add canonical IDs, names, brief IDs, source paths, episode numbers, and stable sequence numbers for all new lessons.
- [ ] Add Episodes 8–13 with ordered lesson IDs, titles, event/evidence fields, and explicit product-family boundaries.
- [ ] Add topic lenses containing thesis, mechanism, decision, failure, source IDs, and required data fields for every new canonical topic.
- [ ] Add assertions that catalog lesson count, episode lesson membership, source paths, and topic-lens IDs are one-to-one.
- [ ] Run `node scripts/test-securitisation-documentary-catalog.mjs` and confirm the existing 25 lessons still pass alongside the new records.

### Task 2: Build the source-evidence map

**Files:**
- Create or modify: `scratch/securitisation_product_family_sources.md`
- Modify: `scratch/source_evidence_catalog.json` only through the existing source-catalog workflow

- [ ] Map each new lesson to at least one primary source family: SEC Regulation AB, Federal Reserve/Treasury, BIS/Basel, RBI, SIFMA, deal documents, trustee reports, rating-pool reports, or company filings.
- [ ] Record the exact document title, source URL, relevant section/page or field, date, jurisdiction, and the mechanism it supports.
- [ ] Mark lessons as draft when the source map lacks transaction-level data; never fill missing values with invented figures.
- [ ] Verify that each named case is used as evidence for a general mechanism and not as a substitute for the lesson.

### Task 3: Author ABS/MBS/RMBS/CMBS lessons

**Files:**
- Create: `scripts/content/securitisation/lesson-26-asset-backed-securities.txt`
- Create: `scripts/content/securitisation/lesson-27-mortgage-backed-securities.txt`
- Create: `scripts/content/securitisation/lesson-28-residential-mortgage-backed-securities.txt`
- Create: `scripts/content/securitisation/lesson-29-commercial-mortgage-backed-securities.txt`
- Create: `scripts/content/securitisation/lesson-30-agency-versus-non-agency-mortgage-securities.txt`
- Create: `scripts/content/securitisation/episode-08-documentary.txt`

- [ ] Write each lesson as a complete spoken documentary, not a glossary entry.
- [ ] Use distinct opening mechanisms: a pool eligibility decision for ABS, a mortgage-payment timing problem for MBS, a refinance/default decision for RMBS, a rent-roll and balloon-refinancing problem for CMBS, and a guarantee-versus-credit-risk decision for agency/non-agency securities.
- [ ] Include concrete cash flows, underwriting fields, servicing, legal transfer, triggers, enhancement, timing, and investor consequences.
- [ ] Include a real evidence spine and an Indian bridge only where the jurisdiction and mechanism are clear.
- [ ] Run the content-depth and documentary audits against these five lessons before continuing.

### Task 4: Author consumer, receivables, lease, and ABCP lessons

**Files:**
- Create: `scripts/content/securitisation/lesson-31-student-loan-abs.txt`
- Create: `scripts/content/securitisation/lesson-32-equipment-and-auto-lease-abs.txt`
- Create: `scripts/content/securitisation/lesson-33-trade-and-accounts-receivable-securitisation.txt`
- Create: `scripts/content/securitisation/lesson-34-asset-backed-commercial-paper.txt`
- Create: `scripts/content/securitisation/lesson-35-multi-seller-conduits-and-liquidity.txt`
- Create: `scripts/content/securitisation/episode-09-documentary.txt`

- [ ] Teach how student loans, leases, trade receivables, and short-term ABCP differ in obligor behaviour, amortisation, dilution, revolving/replenishment, liquidity, servicing, and default resolution.
- [ ] Use the existing auto-loan and credit-card lessons as comparison anchors, not duplicated scripts.
- [ ] Include early amortisation and liquidity stress for ABCP and multi-seller structures.
- [ ] Run catalog, depth, documentary, and pronunciation audits.

### Task 5: Author CLO and CDO lessons

**Files:**
- Create: `scripts/content/securitisation/lesson-36-clo-foundation.txt`
- Create: `scripts/content/securitisation/lesson-37-broadly-syndicated-loan-clo.txt`
- Create: `scripts/content/securitisation/lesson-38-middle-market-and-private-credit-clo.txt`
- Create: `scripts/content/securitisation/lesson-39-clo-manager-ramp-reinvestment-and-equity.txt`
- Create: `scripts/content/securitisation/episode-10-documentary.txt`
- Create: `scripts/content/securitisation/episode-11-documentary.txt`

- [ ] Separate loan-collateral CLO mechanics from broader CDO mechanics.
- [ ] Explain manager discretion, reinvestment, overcollateralisation tests, interest-coverage tests, trading gains/losses, equity cash flows, and reset/refinancing through period-by-period consequences.
- [ ] Explain cash-flow, synthetic, market-value, single-tranche, and CDO-squared structures without collapsing them into one label.
- [ ] Explicitly distinguish CDOs from CLOs, ABS, RMBS, CMBS, and synthetic securitisation.
- [ ] Run acronym pronunciation and garbled-word audits before SSML generation.

### Task 6: Author esoteric, future-flow, and adjacent-structure lessons

**Files:**
- Create: `scripts/content/securitisation/lesson-44-future-flow-securitisation.txt`
- Create: `scripts/content/securitisation/lesson-45-whole-business-and-operating-revenue-securitisation.txt`
- Create: `scripts/content/securitisation/lesson-46-royalty-music-media-and-ip-cash-flows.txt`
- Create: `scripts/content/securitisation/lesson-47-solar-infrastructure-aircraft-and-public-utility-securitisation.txt`
- Create: `scripts/content/securitisation/lesson-48-covered-bonds-versus-securitisation.txt`
- Create: `scripts/content/securitisation/lesson-49-abs-trustee-wrap-monoline-and-guarantees.txt`
- Create: `scripts/content/securitisation/lesson-50-warehouse-servicing-advances-and-repurchase-risk.txt`
- Create: `scripts/content/securitisation/lesson-51-static-managed-pools-and-triggers.txt`
- Create: `scripts/content/securitisation/episode-12-documentary.txt`
- Create: `scripts/content/securitisation/episode-13-documentary.txt`

- [ ] Teach future-flow, whole-business, royalty/IP, solar/infrastructure/aircraft/public-utility, covered-bond, trustee/wrap/guarantee, warehouse, servicing-advance, representation/warranty, and managed-pool structures.
- [ ] State clearly when a topic is adjacent to securitisation rather than a conventional ABS product.
- [ ] Keep each lesson anchored in a transferable cash flow, legal right, operational dependency, failure condition, and investor decision.
- [ ] Run the same content and pronunciation audits before packaging.

### Task 7: Extend lesson and episode generators

**Files:**
- Modify: `scripts/prepare-securitisation-episode-scripts.js`
- Modify: `scripts/prepare-securitisation-multivoice-episode-scripts.js`
- Modify: `scripts/prepare-securitisation-audio-scripts.js`
- Test: `scripts/audit-securitisation-content.js`
- Test: `scripts/audit-securitisation-audio-depth-v6.mjs`

- [ ] Make `scripts/content/securitisation/documentary-catalog.json` and the authored source files the only inputs needed to include Episodes 8–13.
- [ ] Preserve the current lesson schema, episode metadata, speaker markup, teaching-order metadata, and source mapping.
- [ ] Generate the v7 lesson pack and v4 multivoice episode pack into new scratch paths without overwriting prior packs.
- [ ] Assert that every catalog lesson is present exactly once and every episode has the expected lesson order.
- [ ] Run `node scripts/audit-securitisation-content.js` against `scratch/securitisation_masterclass_audio_scripts_v7.json` and `node scripts/audit-securitisation-audio-depth-v6.mjs scratch/securitisation_masterclass_audio_scripts_v7.json`; fix all errors before audio work.

### Task 8: Extend app routing and audio manifests

**Files:**
- Modify: `src/data/securitisationMasterclass.js`
- Modify: `src/data/podcastCatalog.js` only if the existing derived catalog does not automatically include the new episode count
- Modify: manifest packaging script if required by the new episode count

- [ ] Confirm the new lessons resolve through the Deep Dive reader, search, series markers, and podcast catalog.
- [ ] Confirm episode count, lesson count, sequence, titles, and audio manifest paths are derived from the expanded catalog rather than hardcoded 7/25 values.
- [ ] Add a test for opening a new ABS, RMBS, and CMBS lesson by canonical ID and for displaying the correct episode/sequence metadata.

### Task 9: Generate and verify narration assets

**Files:**
- Modify only through generation: `scratch/securitisation_masterclass_audio_scripts_v7.json`, `scratch/securitisation_masterclass_multivoice_episode_scripts_v4.json`, matching text directories, and `public/audio/deep-dive/...`
- Use: `scripts/generate-securitisation-multivoice-audio-azure.mjs`
- Use: `scripts/scan-garbled-words.mjs`
- Use: `scripts/audit-azure-narration-surface.mjs`

- [ ] Generate SSML-only output for the new episodes first.
- [ ] Inspect acronym aliases, named transactions, punctuation, paragraph boundaries, speaker routing, and absence of `[DIYA]`/`[MEERA]` spoken markers.
- [ ] Run pronunciation and narration-surface audits and fix source prose or deterministic aliases before MP3 generation.
- [ ] Generate MP3s only from the verified script package, preserving source paragraph boundaries and using chunking only at coherent thought boundaries.
- [ ] Spot-check the new ABS, RMBS, CMBS, CLO, and CDO MP3s before claiming audio completion.

### Task 10: Full verification and handoff

**Files:**
- Test: all securitisation audit scripts, `npm.cmd run lint`, `npm.cmd run build`

- [ ] Run catalog, content-depth, documentary-discovery, audio-script, Azure narration, pronunciation, and manifest audits.
- [ ] Confirm every new lesson has authored source, generated text, SSML, MP3, manifest, source mapping, and route.
- [ ] Confirm no existing 25-lesson audio asset or episode is removed or silently replaced.
- [ ] Run `npm.cmd run lint` and `npm.cmd run build` from PowerShell.
- [ ] Report exact counts, generated paths, test outputs, remaining draft evidence, and any MP3s not regenerated.

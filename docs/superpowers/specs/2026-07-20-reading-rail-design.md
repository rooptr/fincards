# Deep Dive reading rail

## Goal

Replace the click-only lesson index with navigation that keeps a learner oriented without covering the Deep Dive search field or its results.

## Approved interaction

### Desktop

- A slim fixed reading rail sits at the left edge of the lesson reading area, below the app header.
- `Aa Definitions` is the first control in the rail.
- Each lesson section has a compact marker. The active marker exposes the current section title beside the rail.
- Hovering the rail, or moving keyboard focus into it, reveals the full section-title tray. Links still scroll to their existing anchors.
- The rail does not use a modal, backdrop, or persistent card. It must never cover the Deep Dive search interface.

### Mobile and tablet

- Replace the rail with a horizontal, scrollable tab strip placed below the search interface and above the lesson content.
- `Aa Definitions` is the first tab, followed by the lesson section tabs.
- The current section is indicated with the existing accent color and remains visible in the horizontal list when practical.
- Definitions continue to open accessibly from their tab. The desktop hover interaction is not required on touch devices.

## Components and data flow

- `ArticleAnchorBar` and `MasterclassAnchorBar` keep their existing anchor IDs and link destinations.
- Both render the same navigation data in two responsive presentations: desktop reading rail and mobile horizontal tabs.
- Existing active-section state drives the visible active marker. Masterclass episode state drives the corresponding episode marker.
- `DefinitionsPanel` remains the definitions source of truth and is rendered as the first navigation control.

## Motion and accessibility

- The desktop tray uses opacity and transform only, at a restrained duration.
- `:focus-within` exposes the tray for keyboard users, with clear focus styling on each control.
- Under `prefers-reduced-motion`, the tray changes state without animated movement.
- Mobile tabs have normal semantic buttons and links with horizontal scrolling, not hidden hover-only controls.

## Verification

- Exercise desktop hover, keyboard focus, active-section state, definitions, and anchor navigation.
- Exercise the mobile tab strip at a narrow viewport, confirming it does not overlap the search field or search results.
- Run the project build and lint checks after the change.

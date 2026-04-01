# Aurora Initiative · Reference Card Build — Deferred & Flagged Components
**Last updated: 2026-04-01**
Branch: `refactor/2-improve-design-system-inaccuracies`

This file is the source of truth for all deferred harness runs and flagged items discovered during reference card builds. Update this file whenever a new flag is added.

---

## Legend
- 🔴 **Blocked** — cannot write card without harness run
- 🟡 **Flagged** — card written from MCP data but browser-unverified; flag if used in prototype generation
- 🟢 **Queued** — no props in MCP; needs standalone harness run before card can be written

---

## Deferred Components

### `spr-button-dropdown`
- **Status:** 🟢 Queued
- **Parent:** `spr-button` (subcomponent)
- **Issue:** No documented props in MCP — empty subcomponent entry
- **Action:** Standalone harness run, or fold in when encountered in prototype context

---

### `spr-input-dropdown`
- **Status:** 🟢 Queued
- **Parent:** `spr-input` (subcomponent)
- **Issue:** No documented props in MCP
- **Action:** Harness run needed before card can be written

### `spr-input-email`
- **Status:** 🟢 Queued
- **Parent:** `spr-input` (subcomponent)
- **Issue:** No documented props in MCP
- **Action:** Harness run needed before card can be written

### `spr-input-password`
- **Status:** 🟢 Queued
- **Parent:** `spr-input` (subcomponent)
- **Issue:** No documented props in MCP
- **Action:** Harness run needed before card can be written

### `spr-input-search`
- **Status:** 🟢 Queued
- **Parent:** `spr-input` (subcomponent)
- **Issue:** No documented props in MCP
- **Action:** Harness run needed before card can be written

### `spr-input-url`
- **Status:** 🟢 Queued
- **Parent:** `spr-input` (subcomponent)
- **Issue:** No documented props in MCP
- **Action:** Harness run needed before card can be written

### `spr-input-username`
- **Status:** 🟢 Queued
- **Parent:** `spr-input` (subcomponent)
- **Issue:** No documented props in MCP
- **Action:** Harness run needed before card can be written

---

## Flagged — MCP Data Only, Browser-Unverified

### `spr-input-contact-number`
- **Status:** 🟡 Flagged
- **Parent:** `spr-input` (subcomponent)
- **Issue:** Full props available in MCP but never run in test harness
- **Action:** Verify in harness if used in prototype generation

### `spr-input-currency`
- **Status:** 🟡 Flagged
- **Parent:** `spr-input` (subcomponent)
- **Issue:** Full props available in MCP but never run in test harness
- **Action:** Verify in harness if used in prototype generation

---

## Resolved
_Nothing resolved yet._

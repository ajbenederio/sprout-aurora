# DEFERRED.md — Aurora Initiative
Design System Next v2.27.9 · Branch: `refactor/2-improve-design-system-inaccuracies`

## Status Legend
- 🟢 **Queued** — no props in MCP; needs standalone harness run before card can be written
- 🟡 **Flagged** — card written from MCP data but browser-unverified; flag if used in prototype generation
- 🔴 **Blocked** — cannot write card without harness run

---

## spr-stacking-sidepanel
- **Status:** 🟢 Queued
- **Parent:** `spr-sidepanel` (subComponents array)
- **Reason:** Empty props/emits in MCP JSON — cannot document from MCP alone
- **Has one slot:** `[name]` (dynamic named slot)
- **Action:** Needs standalone harness run before card can be written

---

## spr-date-picker subcomponents (internal tab subcomponents)
- **Status:** 🟢 Queued
- **Parent:** `spr-date-picker`
- **Reason:** Internal tab subcomponents deferred during spr-date-picker session; some flagged as MCP-only
- **Action:** Pull from parent JSON and harness-verify when needed in prototype generation context

---

## spr-button-dropdown
- **Status:** 🔴 Blocked
- **Reason:** Harness run pending — card not yet written
- **Action:** Complete harness verification before writing card
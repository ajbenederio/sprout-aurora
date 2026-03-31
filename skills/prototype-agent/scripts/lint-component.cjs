#!/usr/bin/env node

/**
 * prototype-agent component linter v3
 *
 * Auto-fixes:  lang="ts" on script setup, PascalCase → kebab-case components
 * Flags only:  hex values in <style scoped> (suggests the correct Tailwind class)
 *              untyped refs, missing interfaces
 *
 * Scoped to skills/prototype-agent/outputs/ by default.
 * Requires --src to lint files outside that directory.
 *
 * Usage:
 *   node skills/prototype-agent/scripts/lint-component.js [options] <file-or-dir>
 *
 * Options:
 *   --dry-run   Show what would change without writing anything
 *   --src       Allow linting files outside skills/prototype-agent/outputs/
 *
 * Examples:
 *   node ... skills/prototype-agent/outputs/
 *   node ... --dry-run skills/prototype-agent/outputs/leave-policy-faq/
 *   node ... --src src/components/EmployeeListScreen.vue
 */

const fs   = require('fs')
const path = require('path')

// ─── CLI args ─────────────────────────────────────────────────────────────────

const args    = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const SRC_OK  = args.includes('--src')
const target  = args.filter(a => !a.startsWith('--')).pop()

const OUTPUTS_DIR = path.resolve('skills/prototype-agent/outputs')

function isSafeToWrite(filePath) {
  return path.resolve(filePath).startsWith(OUTPUTS_DIR) || SRC_OK
}

// ─── Hex → semantic token suggestions ────────────────────────────────────────
// Maps common hex values to the preferred Tailwind class.
// Preference order: semantic token > raw palette > no token (flag with comment).
//
// These are SUGGESTIONS for the developer — the linter flags them rather than
// auto-replacing, because colors belong in the template class attribute,
// not as a CSS value replacement.

const HEX_SUGGESTIONS = {
  // Mushroom (neutral/text)
  '#262b2b': 'spr-text-color-strong (or spr-text-mushroom-950)',
  '#394141': 'spr-text-color-strong (or spr-text-mushroom-900)',
  '#414b4b': 'spr-text-mushroom-800',
  '#4c5857': 'spr-text-mushroom-700',
  '#5d6c6b': 'spr-text-color-base (or spr-text-mushroom-600)',
  '#738482': 'spr-text-color-supporting (or spr-text-mushroom-500)',
  '#919f9d': 'spr-text-color-weak (or spr-text-mushroom-400)',
  '#b8c1c0': 'spr-text-mushroom-300',
  '#d9dede': 'spr-text-mushroom-200 — or spr-border-color-base for borders',
  '#e6eaea': 'spr-text-mushroom-100 — or spr-background-color-base for bg',
  '#eff1f1': 'spr-background-color-surface (or spr-bg-mushroom-50)',
  // White/neutral
  '#f1f2f3': 'spr-background-color-surface (or spr-bg-white-100)',
  '#f5f6f6': 'spr-background-color-surface (or spr-bg-white-100)',
  '#f9fafb': 'spr-background-color-surface (or spr-bg-white-100)',
  '#ffffff': 'spr-background-color (or spr-bg-white-50)',
  '#fff':    'spr-background-color (or spr-bg-white-50)',
  // Kangkong (brand/success/green)
  '#052e15': 'spr-bg-kangkong-950',
  '#0f6e56': 'spr-bg-kangkong-800',
  '#14532b': 'spr-text-kangkong-900',
  '#158039': 'spr-text-color-brand-base (or spr-text-kangkong-700)',
  '#4ade7b': 'spr-text-kangkong-400',
  '#86efa8': 'spr-text-kangkong-300',
  '#dcfce6': 'spr-background-color-brand-weak (or spr-bg-kangkong-100)',
  '#f0fdf4': 'spr-background-color-success-weak (or spr-bg-kangkong-50)',
  // Tomato (danger/red)
  '#b61f27': 'spr-text-color-danger-base (or spr-text-tomato-700)',
  '#da2f38': 'spr-text-tomato-600',
  '#fef2f3': 'spr-background-color-danger-weak (or spr-bg-tomato-50)',
  // Mango (pending/yellow)
  '#ca8a04': 'spr-text-color-pending-base (or spr-text-mango-700)',
  // Carrot (caution/orange)
  '#b45309': 'spr-text-color-caution-base (or spr-text-carrot-700)',
  // Blueberry (information/blue)
  '#1e40af': 'spr-text-color-information-base (or spr-text-blueberry-800)',
}

// Hex values with no token — keep but flag with a comment instruction
const NO_TOKEN_HEX = new Set([
  '#00291b', // brand deep-green — no spr- equivalent exists
])

// ─── PascalCase → kebab-case component map ────────────────────────────────────

const PASCAL_TO_KEBAB = {
  SprAccordion:          'spr-accordion',
  SprAttributeFilter:    'spr-attribute-filter',
  SprAuditTrail:         'spr-audit-trail',
  SprAvatar:             'spr-avatar',
  SprBadge:              'spr-badge',
  SprBanner:             'spr-banner',
  SprButton:             'spr-button',
  SprButtonDropdown:     'spr-button-dropdown',
  SprCalendar:           'spr-calendar',
  SprCalendarCell:       'spr-calendar-cell',
  SprCard:               'spr-card',
  SprCheckbox:           'spr-checkbox',
  SprChips:              'spr-chips',
  SprCollapsible:        'spr-collapsible',
  SprDateCalendarPicker: 'spr-date-calendar-picker',
  SprDatePicker:         'spr-date-picker',
  SprDateRangePicker:    'spr-date-range-picker',
  SprDropdown:           'spr-dropdown',
  SprEmptyState:         'spr-empty-state',
  SprFileUpload:         'spr-file-upload',
  SprFilter:             'spr-filter',
  SprFloatingAction:     'spr-floating-action',
  SprIcon:               'spr-icon',
  SprInput:              'spr-input',
  SprInputContactNumber: 'spr-input-contact-number',
  SprInputCurrency:      'spr-input-currency',
  SprInputDropdown:      'spr-input-dropdown',
  SprInputEmail:         'spr-input-email',
  SprInputPassword:      'spr-input-password',
  SprInputSearch:        'spr-input-search',
  SprInputUrl:           'spr-input-url',
  SprInputUsername:      'spr-input-username',
  SprList:               'spr-list',
  SprLogo:               'spr-logo',
  SprLozenge:            'spr-lozenge',
  SprModal:              'spr-modal',
  SprMonthYearPicker:    'spr-month-year-picker',
  SprPopper:             'spr-popper',
  SprProgressBar:        'spr-progress-bar',
  SprRadio:              'spr-radio',
  SprRadioGrouped:       'spr-radio-grouped',
  SprSelect:             'spr-select',
  SprSelectLadderized:   'spr-select-ladderized',
  SprSelectMultiple:     'spr-select-multiple',
  SprSidenav:            'spr-sidenav',
  SprSidepanel:          'spr-sidepanel',
  SprSlider:             'spr-slider',
  SprSnackbar:           'spr-snackbar',
  SprStackingSidepanel:  'spr-stacking-sidepanel',
  SprStatus:             'spr-status',
  SprStepper:            'spr-stepper',
  SprSwitch:             'spr-switch',
  SprTable:              'spr-table',
  SprTablePagination:    'spr-table-pagination',
  SprTabs:               'spr-tabs',
  SprTextarea:           'spr-textarea',
  SprTimePicker:         'spr-time-picker',
  SprTooltip:            'spr-tooltip',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normalizeHex(hex) {
  let h = hex.toLowerCase().trim()
  if (h === '#fff') h = '#ffffff'
  if (h.length === 4) h = '#' + h[1]+h[1] + h[2]+h[2] + h[3]+h[3]
  return h
}

function collectVueFiles(t) {
  const stat = fs.statSync(t)
  if (stat.isFile()) return t.endsWith('.vue') ? [t] : []
  return fs.readdirSync(t).flatMap(f => {
    const full = path.join(t, f)
    return fs.statSync(full).isDirectory() ? collectVueFiles(full)
      : full.endsWith('.vue') ? [full] : []
  })
}

function simpleDiff(a, b) {
  const ao = a.split('\n'), bn = b.split('\n')
  const out = []
  for (let i = 0; i < Math.max(ao.length, bn.length); i++) {
    if (ao[i] !== bn[i]) {
      if (ao[i] !== undefined) out.push(`  - ${ao[i].trim()}`)
      if (bn[i] !== undefined) out.push(`  + ${bn[i].trim()}`)
    }
  }
  return out
}

// ─── Auto-fix passes (safe string operations) ─────────────────────────────────

function fixScriptSetupLang(content, fixes) {
  if (/<script\s+setup\s+lang=["']ts["']/.test(content)) return content
  if (/<script\s+setup(?!\s+lang)/.test(content)) {
    fixes.push('Added lang="ts" to <script setup>')
    return content.replace(/<script\s+setup(?!\s+lang)/, '<script setup lang="ts"')
  }
  return content
}

function fixPascalCaseComponents(content, fixes) {
  // Scope to <template> block only — never touches script imports or strings
  const tmplMatch = content.match(/(<template[\s\S]*?<\/template>)/)
  if (!tmplMatch) return content

  let tmpl = tmplMatch[1]
  const orig = tmpl

  for (const [pascal, kebab] of Object.entries(PASCAL_TO_KEBAB)) {
    if (new RegExp(`<${pascal}[\\s>/]`).test(tmpl) || new RegExp(`<\\/${pascal}>`).test(tmpl)) {
      tmpl = tmpl
        .replace(new RegExp(`<${pascal}([\\s>/])`, 'g'), `<${kebab}$1`)
        .replace(new RegExp(`<\\/${pascal}>`, 'g'), `</${kebab}>`)
      fixes.push(`<${pascal}> → <${kebab}>`)
    }
  }

  return tmpl !== orig ? content.replace(tmplMatch[1], tmpl) : content
}

// ─── Flag-only passes (complex or context-dependent) ─────────────────────────

function flagHexInStyleScoped(content, flags) {
  // Only inspect <style scoped> — colors in template class attrs are correct
  const m = content.match(/<style\s+scoped[^>]*>([\s\S]*?)<\/style>/)
  if (!m) return

  const body = m[1]
  const seen = new Set()

  ;[...body.matchAll(/#([0-9a-fA-F]{3,8})\b/g)].forEach(match => {
    const raw  = match[0]
    const norm = normalizeHex(raw)
    if (seen.has(norm)) return
    seen.add(norm)

    // Already has a no-token comment — skip
    if (new RegExp(`${raw.replace('#', '\\#')}[^;]*;?\\s*/\\*\\s*no spr-`).test(body)) return

    if (NO_TOKEN_HEX.has(norm)) {
      flags.push(
        `HEX IN CSS: ${raw} — no spr- token exists. ` +
        `Add comment: /* no spr- token — brand deep-green */`
      )
      return
    }

    const suggestion = HEX_SUGGESTIONS[norm]
    if (suggestion) {
      flags.push(
        `HEX IN CSS: ${raw} → move to template class attribute. ` +
        `Suggested class: ${suggestion}`
      )
    } else {
      flags.push(
        `HEX IN CSS: ${raw} — not in token map. ` +
        `Query mcp__design-system-next__get_tokens or check ` +
        `skills/sprout-design-system/references/color-tokens.md`
      )
    }
  })
}

function flagUntypedRefs(content, flags) {
  const untyped = [...content.matchAll(/\bref\(\[/g)].length +
                  [...content.matchAll(/\bref\(\{/g)].length
  const typed   = [...content.matchAll(/\bref<[^>]+>\(/g)].length
  if (untyped > 0 && untyped > typed) {
    flags.push(
      `UNTYPED REF: ${untyped} untyped ref call(s) — ` +
      `use ref<Type[]>([...]) for arrays, ref<Type>({}) for objects`
    )
  }
}

function flagMissingInterfaces(content, flags) {
  if (!/\binterface\s+\w+/.test(content) && /ref<\w+\[\]>/.test(content)) {
    flags.push(
      'MISSING INTERFACE: typed array ref found but no TypeScript interface defined'
    )
  }
}

function flagOldIconPattern(content, flags) {
  if (/class="icon-wrap"/.test(content) || /class="abs-fill"/.test(content)) {
    flags.push(
      'OLD ICON PATTERN: three-layer img wrapper detected. ' +
      'Replace with Iconify: import { Icon } from \'@iconify/vue\' → <Icon icon="ph:..." />'
    )
  }
}

// ─── File linter ──────────────────────────────────────────────────────────────

function lintFile(filePath) {
  const rel      = path.relative(process.cwd(), filePath)
  const original = fs.readFileSync(filePath, 'utf8')
  let content    = original

  const fixes = []
  const flags = []
  const safe  = isSafeToWrite(filePath)

  // Auto-fix passes
  content = fixScriptSetupLang(content, fixes)
  content = fixPascalCaseComponents(content, fixes)

  // Flag-only passes
  flagHexInStyleScoped(content, flags)
  flagUntypedRefs(content, flags)
  flagMissingInterfaces(content, flags)
  flagOldIconPattern(content, flags)

  const changed = content !== original
  const diff    = changed ? simpleDiff(original, content) : []
  const written = changed && safe && !DRY_RUN
  const skipped = changed && !safe

  if (written) fs.writeFileSync(filePath, content, 'utf8')

  return { file: rel, fixes, flags, changed, diff, written, skipped }
}

// ─── Report ───────────────────────────────────────────────────────────────────

function printReport(results) {
  let totalFixes = 0, totalFlags = 0, totalSkipped = 0
  const D = '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

  console.log(`\n${D}`)
  console.log(`  prototype-agent linter v3${DRY_RUN ? ' [DRY RUN]' : ''}`)
  console.log(`${D}\n`)

  for (const r of results) {
    const icon = r.flags.length > 0 ? '✗' : r.fixes.length > 0 ? '✦' : '✓'
    console.log(`${icon}  ${r.file}`)

    if (r.skipped) {
      console.log(`   ⚠ outside outputs/ — re-run with --src to lint this file`)
      totalSkipped++
    }

    for (const f of r.fixes) {
      const label = DRY_RUN ? 'would fix' : r.written ? 'fixed' : 'fix (not written)'
      console.log(`   ✦ ${label}: ${f}`)
      totalFixes++
    }

    if (r.diff.length > 0 && DRY_RUN) {
      console.log('   diff:')
      r.diff.slice(0, 10).forEach(l => console.log(`   ${l}`))
      if (r.diff.length > 10) console.log(`   ... +${r.diff.length - 10} more lines`)
    }

    for (const f of r.flags) {
      console.log(`   ✗ ${f}`)
      totalFlags++
    }

    if (!r.skipped && r.fixes.length === 0 && r.flags.length === 0) {
      console.log('   ✓ all checks passed')
    }

    console.log('')
  }

  console.log(D)
  console.log(`  ${results.length} file(s) · ${totalFixes} auto-fixed · ${totalFlags} flagged · ${totalSkipped} skipped`)

  if (totalFlags > 0)        console.log('  ✗ resolve flagged items manually before handoff')
  else if (totalSkipped > 0) console.log('  ⚠ some files skipped — re-run with --src to include')
  else if (DRY_RUN)          console.log('  re-run without --dry-run to apply fixes')
  else                       console.log('  ✓ all files clean — ready for handoff')

  console.log(`${D}\n`)
  return totalFlags
}

// ─── Entry point ──────────────────────────────────────────────────────────────

if (!target) {
  console.error([
    '',
    'Usage: node skills/prototype-agent/scripts/lint-component.js [options] <file-or-dir>',
    '',
    'Options:',
    '  --dry-run   Show what would change without writing files',
    '  --src       Allow linting outside skills/prototype-agent/outputs/',
    '',
    'Examples:',
    '  node ... skills/prototype-agent/outputs/',
    '  node ... --dry-run skills/prototype-agent/outputs/leave-policy-faq/',
    '  node ... --src src/components/EmployeeListScreen.vue',
    '',
  ].join('\n'))
  process.exit(1)
}

if (!fs.existsSync(target)) {
  console.error(`Not found: ${target}`)
  process.exit(1)
}

const files = collectVueFiles(target)
if (files.length === 0) { console.log('No .vue files found.'); process.exit(0) }

const results   = files.map(lintFile)
const flagCount = printReport(results)
process.exit(flagCount > 0 ? 1 : 0)
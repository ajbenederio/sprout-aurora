<script setup>
import { ref, computed } from 'vue'
import { useNav } from '@/composables/useNav.js'
const { navigate, goBack } = useNav()

// Research anchor: design implication #3 — audit confidence via per-employee delta view before finalization
// Competitive pattern: per-employee drill-down before approval (see research brief §Patterns & Conventions)

const wizardSteps = ref([
  { number: 1, label: 'Configure', status: 'completed' },
  { number: 2, label: 'Compute',   status: 'completed' },
  { number: 3, label: 'Review',    status: 'active'    },
  { number: 4, label: 'Approve',   status: 'pending'   },
])

// 48 employees — full list for drill-down from "See all 48 employees ›" CTA in PayrollReviewScreen
const allEmployees = ref([
  { id:  1, name: 'Maria Santos',       reason: 'SSS + PhilHealth rate change',     delta:  8640, type: 'Compliance'   },
  { id:  2, name: 'Jose Reyes',         reason: 'Overtime — 12 hrs extra',           delta:  4200, type: 'Overtime'     },
  { id:  3, name: 'Ana Cruz',           reason: 'Leave without pay — 2 days',        delta: -3600, type: 'Leave'        },
  { id:  4, name: 'Carlo Mendoza',      reason: 'Night differential adjustment',     delta:  2100, type: 'Differential' },
  { id:  5, name: 'Liza Ramos',         reason: 'SSS rate update',                   delta:  1200, type: 'Compliance'   },
  { id:  6, name: 'Mark Torres',        reason: 'Overtime — 8 hrs extra',            delta:  2800, type: 'Overtime'     },
  { id:  7, name: 'Grace Villanueva',   reason: 'Leave without pay — 1 day',         delta: -1800, type: 'Leave'        },
  { id:  8, name: 'Ben Aquino',         reason: 'PhilHealth rate change',            delta:   960, type: 'Compliance'   },
  { id:  9, name: 'Cathy Lim',          reason: 'Night differential + overtime',     delta:  3300, type: 'Differential' },
  { id: 10, name: 'Dan Garcia',         reason: 'SSS + PhilHealth + Pag-IBIG',       delta:  1560, type: 'Compliance'   },
  { id: 11, name: 'Elena Ong',          reason: 'Overtime — 6 hrs extra',            delta:  2100, type: 'Overtime'     },
  { id: 12, name: 'Felix Tan',          reason: 'Leave without pay — 3 days',        delta: -5400, type: 'Leave'        },
  { id: 13, name: 'Gloria Navarro',     reason: 'SSS rate update',                   delta:  1080, type: 'Compliance'   },
  { id: 14, name: 'Henry Dela Cruz',    reason: 'Night differential adjustment',     delta:  1750, type: 'Differential' },
  { id: 15, name: 'Iris Buenaventura',  reason: 'Overtime — 10 hrs extra',           delta:  3500, type: 'Overtime'     },
  { id: 16, name: 'John Castro',        reason: 'PhilHealth rate change',            delta:   840, type: 'Compliance'   },
  { id: 17, name: 'Karen Salazar',      reason: 'Leave without pay — 1 day',         delta: -1800, type: 'Leave'        },
  { id: 18, name: 'Luis Domingo',       reason: 'SSS contribution bracket change',   delta:  1440, type: 'Compliance'   },
  { id: 19, name: 'Mia Castillo',       reason: 'Night differential — 14 nights',    delta:  2450, type: 'Differential' },
  { id: 20, name: 'Nick Santos',        reason: 'Overtime — 4 hrs extra',            delta:  1400, type: 'Overtime'     },
  { id: 21, name: 'Olive Reyes',        reason: 'SSS + PhilHealth rate change',      delta:  1320, type: 'Compliance'   },
  { id: 22, name: 'Paul Bautista',      reason: 'Leave without pay — 2 days',        delta: -3600, type: 'Leave'        },
  { id: 23, name: 'Queen Herrera',      reason: 'PhilHealth rate change',            delta:   960, type: 'Compliance'   },
  { id: 24, name: 'Ryan Espinoza',      reason: 'Night differential adjustment',     delta:  1960, type: 'Differential' },
  { id: 25, name: 'Sarah Medina',       reason: 'Overtime — 16 hrs extra',           delta:  5600, type: 'Overtime'     },
  { id: 26, name: 'Tom Aguilar',        reason: 'SSS rate update',                   delta:  1200, type: 'Compliance'   },
  { id: 27, name: 'Una Flores',         reason: 'Leave without pay — 1 day',         delta: -1800, type: 'Leave'        },
  { id: 28, name: 'Victor Marquez',     reason: 'Night differential + overtime',     delta:  3150, type: 'Differential' },
  { id: 29, name: 'Wendy Gomez',        reason: 'PhilHealth premium increase',       delta:   720, type: 'Compliance'   },
  { id: 30, name: 'Xavier Reyes',       reason: 'Overtime — 8 hrs extra',            delta:  2800, type: 'Overtime'     },
  { id: 31, name: 'Yolanda Cruz',       reason: 'SSS contribution bracket change',   delta:  1560, type: 'Compliance'   },
  { id: 32, name: 'Zach Morales',       reason: 'Leave without pay — 4 days',        delta: -7200, type: 'Leave'        },
  { id: 33, name: 'Alice Padilla',      reason: 'Night differential — 10 nights',    delta:  1750, type: 'Differential' },
  { id: 34, name: 'Brad Ocampo',        reason: 'Overtime — 6 hrs extra',            delta:  2100, type: 'Overtime'     },
  { id: 35, name: 'Clara Santos',       reason: 'PhilHealth rate change',            delta:   840, type: 'Compliance'   },
  { id: 36, name: 'Diego Reyes',        reason: 'Leave without pay — 1 day',         delta: -1800, type: 'Leave'        },
  { id: 37, name: 'Eva Mendoza',        reason: 'Night differential adjustment',     delta:  2100, type: 'Differential' },
  { id: 38, name: 'Frank Torres',       reason: 'SSS + PhilHealth rate change',      delta:  1080, type: 'Compliance'   },
  { id: 39, name: 'Gina Villanueva',    reason: 'Overtime — 12 hrs extra',           delta:  4200, type: 'Overtime'     },
  { id: 40, name: 'Hugo Aquino',        reason: 'Leave without pay — 2 days',        delta: -3600, type: 'Leave'        },
  { id: 41, name: 'Ida Lim',            reason: 'SSS rate update',                   delta:  1200, type: 'Compliance'   },
  { id: 42, name: 'Jake Garcia',        reason: 'Night differential — 8 nights',     delta:  1400, type: 'Differential' },
  { id: 43, name: 'Kim Ong',            reason: 'Overtime — 4 hrs extra',            delta:  1400, type: 'Overtime'     },
  { id: 44, name: 'Leo Tan',            reason: 'PhilHealth premium increase',       delta:   720, type: 'Compliance'   },
  { id: 45, name: 'Mae Navarro',        reason: 'Leave without pay — 3 days',        delta: -5400, type: 'Leave'        },
  { id: 46, name: 'Ned Dela Cruz',      reason: 'Night differential + overtime',     delta:  2800, type: 'Differential' },
  { id: 47, name: 'Ora Buenaventura',   reason: 'SSS contribution bracket change',   delta:  1440, type: 'Compliance'   },
  { id: 48, name: 'Pete Castro',        reason: 'Overtime — 10 hrs extra',           delta:  3500, type: 'Overtime'     },
])

const filters = ['All', 'Compliance', 'Overtime', 'Leave', 'Differential']
const activeFilter = ref('All')

const filteredEmployees = computed(() =>
  activeFilter.value === 'All'
    ? allEmployees.value
    : allEmployees.value.filter((e) => e.type === activeFilter.value)
)

// Lozenge tone per change type
const typeTone = (type) => {
  switch (type) {
    case 'Compliance':   return 'caution'
    case 'Overtime':     return 'information'
    case 'Leave':        return 'danger'
    case 'Differential': return 'neutral'
    default:             return 'plain'
  }
}

const fmt = (n) => {
  const a = Math.abs(n)
  if (a >= 1000) return `₱${(a / 1000).toFixed(1)}K`
  return `₱${a.toLocaleString()}`
}
</script>

<template>
  <div class="screen">

    <!-- iOS Status Bar — no DS component for native chrome -->
    <div class="status-bar">
      <span class="status-time">9:41</span>
      <div class="status-icons">
        <span>●●●</span>
        <span>WiFi</span>
        <span>■</span>
      </div>
    </div>

    <!-- Page Header — back to review summary, period lozenge -->
    <div class="page-header">
      <button class="back-btn" @click="goBack()">‹ Review</button>
      <div class="header-main-row">
        <h1 class="page-title">All Employees</h1>
        <SprLozenge label="Mar 1–15, 2026" tone="success" :fill="true" />
      </div>
    </div>

    <!-- Wizard Stepper Strip — Review active, same as PayrollReviewScreen -->
    <div class="stepper-strip">
      <SprStepper
        variant="horizontal"
        :steps="wizardSteps"
        :has-lines="true"
        type="solid"
      />
    </div>

    <!-- Filter Chips Row — Research anchor: implication #3 drill-down by change type -->
    <div class="filter-row">
      <button
        v-for="f in filters"
        :key="f"
        class="filter-chip"
        :class="{ 'filter-chip--active': activeFilter === f }"
        @click="activeFilter = f"
      >
        {{ f }}
      </button>
    </div>

    <!-- Scrollable Content -->
    <div class="content">

      <!-- Employee List — per-employee delta view -->
      <SprCard
        v-if="filteredEmployees.length > 0"
        tone="plain"
        :show-header="false"
        :show-footer="false"
        border-radius-size="lg"
        :has-content-padding="false"
      >
        <template #content>
          <div
            v-for="(emp, i) in filteredEmployees"
            :key="emp.id"
            class="emp-row"
            :class="{ 'emp-row--divider': i < filteredEmployees.length - 1 }"
            style="cursor: pointer"
            @click="navigate('employee-payslip')"
          >
            <div class="emp-left">
              <span class="emp-name">{{ emp.name }}</span>
              <span class="emp-reason">{{ emp.reason }}</span>
            </div>
            <div class="emp-right">
              <span
                class="emp-delta"
                :class="emp.delta > 0 ? 'emp-delta--up' : 'emp-delta--down'"
              >
                {{ emp.delta > 0 ? '+' : '-' }}{{ fmt(emp.delta) }}
              </span>
              <SprLozenge :label="emp.type" :tone="typeTone(emp.type)" />
            </div>
          </div>
        </template>
      </SprCard>

      <!-- Empty State — shown when a filter returns 0 results -->
      <SprCard
        v-else
        tone="plain"
        :show-header="false"
        :show-footer="false"
        border-radius-size="lg"
      >
        <template #content>
          <div class="empty-state">
            <div class="empty-icon">○</div>
            <p class="empty-title">No {{ activeFilter }} changes this run</p>
            <p class="empty-sub">All employees in this category had the same pay as the last run.</p>
          </div>
        </template>
      </SprCard>

      <div style="height:100px"></div>
    </div>

    <!-- Fixed Footer — back to review summary -->
    <div class="footer">
      <SprButton
        tone="neutral"
        variant="secondary"
        size="large"
        :fullwidth="true"
        @click="goBack()"
      >
        ‹ Back to Review Summary
      </SprButton>
    </div>

  </div>
</template>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }

.screen {
  width: 430px;
  height: 932px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  font-family: 'Rubik', system-ui, sans-serif;
  overflow: hidden;
  position: relative;
}

/* ─── Status Bar ─────────────────────────────── */
.status-bar {
  height: 59px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 21px;
  flex-shrink: 0;
}
.status-time {
  font-family: 'SF Pro Text', system-ui, sans-serif;
  font-weight: 600;
  font-size: 15px;
  color: #000;
  letter-spacing: -0.24px;
}
.status-icons {
  display: flex;
  gap: 6px;
  font-family: 'SF Pro Text', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
}

/* ─── Page Header ────────────────────────────── */
.page-header {
  background: #fff;
  padding: 10px 16px 14px;
  border-bottom: 1px solid #e1e6e4;
  flex-shrink: 0;
}
.back-btn {
  background: none;
  border: none;
  padding: 0;
  font-size: 14px;
  color: #158039;
  cursor: pointer;
  font-family: inherit;
  margin-bottom: 6px;
  display: block;
}
.header-main-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.page-title { font-size: 20px; font-weight: 600; color: #00291b; margin: 0; }

/* ─── Stepper Strip ──────────────────────────── */
.stepper-strip {
  background: #fff;
  padding: 12px 20px;
  border-bottom: 1px solid #e1e6e4;
  flex-shrink: 0;
}

/* ─── Filter Row ─────────────────────────────── */
.filter-row {
  display: flex;
  gap: 8px;
  padding: 10px 16px;
  background: #fff;
  border-bottom: 1px solid #e1e6e4;
  flex-shrink: 0;
  overflow-x: auto;
}
.filter-row::-webkit-scrollbar { display: none; }

.filter-chip {
  background: none;
  border: 1px solid #c9d4d1;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  color: #5d6c6b;
  cursor: pointer;
  font-family: inherit;
  white-space: nowrap;
  transition: background 0.12s, color 0.12s, border-color 0.12s;
}
.filter-chip--active {
  background: #dcfce6;
  border-color: #158039;
  color: #00291b;
  font-weight: 600;
}

/* ─── Scrollable Content ─────────────────────── */
.content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f1f2f3;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.content::-webkit-scrollbar { display: none; }

/* ─── Employee Rows ──────────────────────────── */
.emp-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;
}
.emp-row--divider { border-bottom: 1px solid #f1f2f3; }
.emp-left { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.emp-name  { font-size: 13px; font-weight: 500; color: #00291b; }
.emp-reason { font-size: 11px; color: #5d6c6b; }
.emp-right { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
.emp-delta { font-size: 13px; font-weight: 600; }
.emp-delta--up   { color: #92400e; }
.emp-delta--down { color: #158039; }

/* ─── Empty State ────────────────────────────── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 32px 16px;
  text-align: center;
}
.empty-icon  { font-size: 28px; color: #c9d4d1; }
.empty-title { font-size: 14px; font-weight: 600; color: #00291b; }
.empty-sub   { font-size: 12px; color: #5d6c6b; line-height: 1.5; }

/* ─── Fixed Footer ───────────────────────────── */
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #e1e6e4;
  padding: 12px 16px 28px;
  z-index: 10;
}
</style>

<script setup lang="ts">
// Research anchor: [domain-knowledge] HR admin desktop — employee directory lookup
import type { Header } from 'design-system-next'
import { ref, computed, watch } from 'vue'
import { useNav } from '@/composables/useNav.js'

// --- Interfaces ---
interface EmployeeRow {
  id: number
  employeeId: string
  name: { title: string }
  department: { title: string }
  position: { title: string }
  status: { title: string }
}

// --- State ---
const { navigate } = useNav()
const searchQuery = ref<string>('')
const currentPage = ref<number>(1)
const rowsPerPage = ref<number>(10)

// Research anchor: [pattern-based] reset to page 1 on search or row-count change
watch([searchQuery, rowsPerPage], () => { currentPage.value = 1 })

// --- Mock data ---
// All cells use { title } shape — flat strings render blank (reference card rule 5)
const allEmployees = ref<EmployeeRow[]>([
  { id: 1,  employeeId: 'EMP-0001', name: { title: 'Maria Santos'    }, department: { title: 'Engineering'  }, position: { title: 'Senior Software Engineer'  }, status: { title: 'Active'       } },
  { id: 2,  employeeId: 'EMP-0002', name: { title: 'Jose Reyes'       }, department: { title: 'Finance'       }, position: { title: 'Finance Analyst'           }, status: { title: 'Active'       } },
  { id: 3,  employeeId: 'EMP-0003', name: { title: 'Ana Cruz'         }, department: { title: 'HR'            }, position: { title: 'HR Manager'                }, status: { title: 'Active'       } },
  { id: 4,  employeeId: 'EMP-0004', name: { title: 'Carlo Mendoza'    }, department: { title: 'IT'            }, position: { title: 'IT Specialist'             }, status: { title: 'Active'       } },
  { id: 5,  employeeId: 'EMP-0005', name: { title: 'Liza Ramos'       }, department: { title: 'Operations'    }, position: { title: 'Customer Support Lead'     }, status: { title: 'On Leave'     } },
  { id: 6,  employeeId: 'EMP-0006', name: { title: 'Mark Torres'      }, department: { title: 'Sales'         }, position: { title: 'Sales Executive'           }, status: { title: 'Active'       } },
  { id: 7,  employeeId: 'EMP-0007', name: { title: 'Grace Villanueva' }, department: { title: 'IT'            }, position: { title: 'QA Analyst'                }, status: { title: 'Active'       } },
  { id: 8,  employeeId: 'EMP-0008', name: { title: 'Ben Aquino'       }, department: { title: 'Finance'       }, position: { title: 'Accountant'                }, status: { title: 'Active'       } },
  { id: 9,  employeeId: 'EMP-0009', name: { title: 'Cathy Lim'        }, department: { title: 'Sales'         }, position: { title: 'Account Manager'           }, status: { title: 'Active'       } },
  { id: 10, employeeId: 'EMP-0010', name: { title: 'Dan Garcia'       }, department: { title: 'Operations'    }, position: { title: 'Logistics Coordinator'     }, status: { title: 'Inactive'     } },
  { id: 11, employeeId: 'EMP-0011', name: { title: 'Elena Pascual'    }, department: { title: 'Engineering'   }, position: { title: 'Frontend Developer'        }, status: { title: 'Probationary' } },
  { id: 12, employeeId: 'EMP-0012', name: { title: 'Felix Navarro'    }, department: { title: 'HR'            }, position: { title: 'Recruitment Specialist'    }, status: { title: 'Active'       } },
  { id: 13, employeeId: 'EMP-0013', name: { title: 'Gloria Dela Rosa' }, department: { title: 'Finance'       }, position: { title: 'Payroll Officer'           }, status: { title: 'Active'       } },
  { id: 14, employeeId: 'EMP-0014', name: { title: 'Henry Castillo'   }, department: { title: 'Operations'    }, position: { title: 'Operations Manager'        }, status: { title: 'Active'       } },
  { id: 15, employeeId: 'EMP-0015', name: { title: 'Iris Ocampo'      }, department: { title: 'Engineering'   }, position: { title: 'Backend Developer'         }, status: { title: 'Active'       } },
  { id: 16, employeeId: 'EMP-0016', name: { title: 'James Bautista'   }, department: { title: 'Sales'         }, position: { title: 'Sales Manager'             }, status: { title: 'On Leave'     } },
  { id: 17, employeeId: 'EMP-0017', name: { title: 'Karen Robles'     }, department: { title: 'IT'            }, position: { title: 'Systems Administrator'     }, status: { title: 'Active'       } },
  { id: 18, employeeId: 'EMP-0018', name: { title: 'Luis Fernandez'   }, department: { title: 'Engineering'   }, position: { title: 'DevOps Engineer'           }, status: { title: 'Probationary' } },
  { id: 19, employeeId: 'EMP-0019', name: { title: 'Mia Domingo'      }, department: { title: 'HR'            }, position: { title: 'Training Coordinator'      }, status: { title: 'Active'       } },
  { id: 20, employeeId: 'EMP-0020', name: { title: 'Nathan Aguilar'   }, department: { title: 'Finance'       }, position: { title: 'Tax Compliance Officer'    }, status: { title: 'Active'       } },
  { id: 21, employeeId: 'EMP-0021', name: { title: 'Olivia Macaraeg'  }, department: { title: 'Operations'    }, position: { title: 'Supply Chain Analyst'      }, status: { title: 'Inactive'     } },
  { id: 22, employeeId: 'EMP-0022', name: { title: 'Paolo Guerrero'   }, department: { title: 'Engineering'   }, position: { title: 'Mobile Developer'          }, status: { title: 'Active'       } },
  { id: 23, employeeId: 'EMP-0023', name: { title: 'Queenie Soriano'  }, department: { title: 'Sales'         }, position: { title: 'Business Development Rep'  }, status: { title: 'Terminated'   } },
  { id: 24, employeeId: 'EMP-0024', name: { title: 'Ramon Tolentino'  }, department: { title: 'IT'            }, position: { title: 'Network Engineer'          }, status: { title: 'Active'       } },
  { id: 25, employeeId: 'EMP-0025', name: { title: 'Sofia Abad'       }, department: { title: 'HR'            }, position: { title: 'Compensation & Benefits'   }, status: { title: 'Active'       } },
])

// --- Computed ---
// Research anchor: [domain-knowledge] search resolves FP-1 — scanning friction on long list
const filteredEmployees = computed<EmployeeRow[]>(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return allEmployees.value
  return allEmployees.value.filter(e =>
    e.name.title.toLowerCase().includes(q) ||
    e.department.title.toLowerCase().includes(q) ||
    e.position.title.toLowerCase().includes(q)
  )
})

const paginatedEmployees = computed<EmployeeRow[]>(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value
  return filteredEmployees.value.slice(start, start + rowsPerPage.value)
})

// --- Table config ---
const headers = ref<Header[]>([
  { field: 'name',       name: 'Employee',   sort: true },
  { field: 'department', name: 'Department', sort: true },
  { field: 'position',   name: 'Position',   sort: true },
  { field: 'status',     name: 'Status' },
])

// dropdownSelection values must be numbers — reference card warning
const paginationDropdown = ref([
  { text: 10, value: 10 },
  { text: 20, value: 20 },
  { text: 50, value: 50 },
])

// --- Helpers ---
// Research anchor: [domain-knowledge] identity anchor — initials avatar in HRIS lists
const STATUS_TONE: Record<string, string> = {
  'Active':       'success',
  'Inactive':     'neutral',
  'On Leave':     'pending',
  'Probationary': 'caution',
  'Terminated':   'danger',
}

const initials = (name: string): string =>
  name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
</script>

<template>
  <div class="page">

    <!-- Top Nav -->
    <nav class="topnav">
      <div class="flex items-center gap-10">
        <div class="flex items-baseline gap-0.5">
          <span class="logo-sprout">sprout</span>
          <span class="logo-hr">HR</span>
        </div>
        <div class="flex gap-7">
          <span class="nav-link" @click="navigate('hris-dashboard')">Dashboard</span>
          <span class="nav-link nav-link--active">Employees</span>
          <span class="nav-link">Payroll</span>
          <span class="nav-link">Leave</span>
          <span class="nav-link">Reports</span>
        </div>
      </div>
      <div class="flex items-center gap-2 cursor-pointer">
        <div class="user-avatar">M</div>
        <span class="user-name">Maria Santos</span>
        <span class="user-caret">▾</span>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main">

      <!-- Page Header -->
      <div class="flex items-end justify-between">
        <div>
          <p class="breadcrumb">Dashboard <span class="mx-1 spr-text-color-weak">/</span> Employees</p>
          <h1 class="page-title">Employee Directory</h1>
        </div>
        <spr-button tone="success" variant="primary" size="medium">
          + Add Employee
        </spr-button>
      </div>

      <!-- Search toolbar -->
      <!-- Research anchor: [domain-knowledge] search above table resolves FP-1 -->
      <div class="flex items-center gap-3">
        <!-- spr-input-search is deferred (no verified card) — using spr-input type="search" as workaround -->
        <spr-input
          id="employee-search"
          v-model="searchQuery"
          type="search"
          placeholder="Search by name, department, or position…"
        />
        <spr-lozenge
          :label="`${filteredEmployees.length} result${filteredEmployees.length !== 1 ? 's' : ''}`"
          tone="neutral"
        />
      </div>

      <!-- Data Table -->
      <!-- Height wrapper required — without it tbody collapses to 0px (reference card rule 1) -->
      <div style="height: 600px; width: 100%;">
        <spr-table
          :headers="headers"
          :dataTable="paginatedEmployees"
          variant="white"
          :fullHeight="true"
          :emptyState="{
            description: 'No employees found',
            subDescription: 'Try a different search term',
            image: 'list',
            size: 'large',
          }"
        >
          <!-- Name cell: avatar + name + employee ID -->
          <!-- spr-avatar — MCP-only, no verified reference card -->
          <template #name="{ row }">
            <div class="flex items-center gap-3">
              <spr-avatar
                :initial="initials((row.name as any).title)"
                variant="initial"
                color="primary"
                size="sm"
              />
              <div class="flex flex-col gap-0.5">
                <span class="emp-name">{{ (row.name as any).title }}</span>
                <span class="spr-body-xs-regular spr-text-color-supporting">{{ row.employeeId }}</span>
              </div>
            </div>
          </template>

          <!-- Status cell: filled lozenge with tone by employment status -->
          <template #status="{ row }">
            <spr-lozenge
              :label="(row.status as any).title"
              :tone="STATUS_TONE[(row.status as any).title] ?? 'plain'"
              :fill="true"
            />
          </template>

          <!-- Pagination — resolves FP-2 (losing place in long list) -->
          <template #footer>
            <spr-table-pagination
              v-model:selectedRowCount="rowsPerPage"
              v-model:currentPage="currentPage"
              :totalItems="filteredEmployees.length"
              :dropdownSelection="paginationDropdown"
              :bordered="false"
            />
          </template>
        </spr-table>
      </div>

    </main>
  </div>
</template>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }

.page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'Rubik', system-ui, sans-serif;
}

/* Top Nav */
.topnav {
  height: 60px;
  background: #00291b; /* no spr- token — brand deep-green */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  flex-shrink: 0;
}

.logo-sprout {
  font-size: 18px;
  font-weight: 700;
  color: #dcfce6; /* no spr- token — kangkong-100 */
  letter-spacing: -0.5px;
}

.logo-hr {
  font-size: 11px;
  font-weight: 600;
  color: #86efa8; /* no spr- token — kangkong-300 */
  letter-spacing: 0.04em;
}

.nav-link {
  font-size: 14px;
  color: #86efa8; /* no spr- token — kangkong-300 */
  cursor: pointer;
  opacity: 0.75;
  transition: opacity 0.15s;
}

.nav-link:hover { opacity: 1; }

.nav-link--active {
  color: #ffffff;
  opacity: 1;
  font-weight: 500;
  border-bottom: 2px solid #4ade7b; /* no spr- token — kangkong-400 */
  padding-bottom: 2px;
}

.user-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #158039; /* no spr- token — kangkong-700 */
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-name { font-size: 13px; color: #dcfce6; /* no spr- token — kangkong-100 */ }
.user-caret { font-size: 10px; color: #86efa8; /* no spr- token — kangkong-300 */ }

/* Main */
.main {
  flex: 1;
  overflow-y: auto;
  padding: 28px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #f1f2f3; /* no spr- token — white-100 */
}

.main::-webkit-scrollbar { display: none; }

/* Page header */
.breadcrumb {
  font-size: 12px;
  color: #5d6c6b; /* no spr- token — mushroom-600 */
  margin-bottom: 4px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #00291b; /* no spr- token — brand deep-green */
}

/* Name cell */
.emp-name {
  font-size: 14px;
  font-weight: 600;
  color: #00291b; /* no spr- token — brand deep-green */
}
</style>

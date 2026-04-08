<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Header } from 'design-system-next'

// ─── Headers ───────────────────────────────────────────────────────────────
const headers = ref<Header[]>([
  { field: 'name',       name: 'Employee',          sort: true },
  { field: 'department', name: 'Department',         sort: true },
  { field: 'position',   name: 'Position',           sort: true },
  { field: 'status',     name: 'Employment Status' },
])

// ─── Seed data (20 employees) ───────────────────────────────────────────────
const allEmployees = [
  { id:  1, name: { title: 'Maria Santos'    }, department: { title: 'Engineering'    }, position: { title: 'Frontend Developer'     }, status: { title: 'Active'        } },
  { id:  2, name: { title: 'Jose Reyes'      }, department: { title: 'Human Resources'}, position: { title: 'HR Specialist'          }, status: { title: 'Active'        } },
  { id:  3, name: { title: 'Ana Cruz'        }, department: { title: 'Finance'        }, position: { title: 'Accountant'             }, status: { title: 'On Leave'      } },
  { id:  4, name: { title: 'Carlos Dela Rosa'}, department: { title: 'Engineering'    }, position: { title: 'Backend Developer'      }, status: { title: 'Active'        } },
  { id:  5, name: { title: 'Liza Mendoza'    }, department: { title: 'Marketing'      }, position: { title: 'Marketing Manager'      }, status: { title: 'Active'        } },
  { id:  6, name: { title: 'Ramon Villanueva'}, department: { title: 'Operations'     }, position: { title: 'Operations Analyst'     }, status: { title: 'Probationary'  } },
  { id:  7, name: { title: 'Grace Tan'       }, department: { title: 'Finance'        }, position: { title: 'Finance Manager'        }, status: { title: 'Active'        } },
  { id:  8, name: { title: 'Michael Lim'     }, department: { title: 'Engineering'    }, position: { title: 'DevOps Engineer'        }, status: { title: 'Active'        } },
  { id:  9, name: { title: 'Patricia Ocampo' }, department: { title: 'Human Resources'}, position: { title: 'Recruitment Specialist' }, status: { title: 'Active'        } },
  { id: 10, name: { title: 'Angelo Bautista' }, department: { title: 'Sales'          }, position: { title: 'Sales Executive'        }, status: { title: 'Inactive'      } },
  { id: 11, name: { title: 'Marisol Aquino'  }, department: { title: 'Marketing'      }, position: { title: 'Content Strategist'     }, status: { title: 'Active'        } },
  { id: 12, name: { title: 'Dennis Flores'   }, department: { title: 'Engineering'    }, position: { title: 'QA Engineer'            }, status: { title: 'Probationary'  } },
  { id: 13, name: { title: 'Rowena Castillo' }, department: { title: 'Operations'     }, position: { title: 'Project Manager'        }, status: { title: 'Active'        } },
  { id: 14, name: { title: 'Eduardo Manalo'  }, department: { title: 'Sales'          }, position: { title: 'Account Manager'        }, status: { title: 'Active'        } },
  { id: 15, name: { title: 'Jennifer Ramos'  }, department: { title: 'Finance'        }, position: { title: 'Payroll Specialist'      }, status: { title: 'On Leave'      } },
  { id: 16, name: { title: 'Nestor Domingo'  }, department: { title: 'Engineering'    }, position: { title: 'Solutions Architect'     }, status: { title: 'Active'        } },
  { id: 17, name: { title: 'Cristina Palma'  }, department: { title: 'Human Resources'}, position: { title: 'HR Manager'             }, status: { title: 'Active'        } },
  { id: 18, name: { title: 'Vincent Soriano' }, department: { title: 'Marketing'      }, position: { title: 'Brand Designer'         }, status: { title: 'Probationary'  } },
  { id: 19, name: { title: 'Teresita Navarro'}, department: { title: 'Operations'     }, position: { title: 'Admin Assistant'        }, status: { title: 'Inactive'      } },
  { id: 20, name: { title: 'Ronald Mercado'  }, department: { title: 'Sales'          }, position: { title: 'Sales Manager'          }, status: { title: 'Active'        } },
]

// ─── Search ─────────────────────────────────────────────────────────────────
const searchQuery = ref('')

// Reset to page 1 when search changes
watch(searchQuery, () => { currentPage.value = 1 })

const filteredEmployees = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return allEmployees
  return allEmployees.filter(e =>
    e.name.title.toLowerCase().includes(q) ||
    e.department.title.toLowerCase().includes(q) ||
    e.position.title.toLowerCase().includes(q) ||
    e.status.title.toLowerCase().includes(q)
  )
})

// ─── Pagination ─────────────────────────────────────────────────────────────
const rowCount    = ref(10)
const currentPage = ref(1)

const totalItems = computed(() => filteredEmployees.value.length)

const tableData = computed(() => {
  const start = (currentPage.value - 1) * rowCount.value
  return filteredEmployees.value.slice(start, start + rowCount.value)
})

const dropdownSelection = [
  { text: 10, value: 10 },
  { text: 20, value: 20 },
  { text: 50, value: 50 },
]

// ─── Status lozenge tone ────────────────────────────────────────────────────
function statusTone(status: string): string {
  if (status === 'Active')       return 'success'
  if (status === 'On Leave')     return 'caution'
  if (status === 'Probationary') return 'information'
  return 'neutral' // Inactive
}
</script>

<template>
  <div class="employee-list">

    <!-- Page header -->
    <div class="el-header">
      <h1 class="el-header__title">Employees</h1>
      <p class="el-header__subtitle">{{ totalItems }} employee{{ totalItems !== 1 ? 's' : '' }} found</p>
    </div>

    <!-- Table — height wrapper is required or tbody collapses to 0 -->
    <div class="el-table-wrap">
      <spr-table
        :headers="headers"
        :dataTable="tableData"
        :tableActions="{ search: true, filter: false, option: false }"
        v-model:searchModel="searchQuery"
        :emptyState="{
          description: 'No employees found',
          subDescription: 'Try a different search term',
          image: 'location',
          size: 'large',
        }"
      >
        <!-- Custom status cell — spr-lozenge with tone by status value -->
        <template #status="{ row }">
          <spr-lozenge
            :label="(row.status as any).title"
            :tone="statusTone((row.status as any).title)"
            :fill="(row.status as any).title === 'Active'"
          />
        </template>

        <!-- Pagination in #footer slot — required placement -->
        <template #footer>
          <spr-table-pagination
            v-model:selectedRowCount="rowCount"
            v-model:currentPage="currentPage"
            :totalItems="totalItems"
            :dropdownSelection="dropdownSelection"
          />
        </template>
      </spr-table>
    </div>

  </div>
</template>

<style scoped>
.employee-list {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 32px 80px;
  font-family: 'Rubik', sans-serif;
}

.el-header {
  margin-bottom: 24px;
}

.el-header__title {
  font-size: 24px;
  font-weight: 700;
  color: #00291b;
  margin: 0 0 4px;
}

.el-header__subtitle {
  font-size: 14px;
  color: #5d6c6b; /* mushroom-600 */
  margin: 0;
}

/* Height wrapper — required for spr-table to render rows */
.el-table-wrap {
  height: 600px;
  width: 100%;
}
</style>

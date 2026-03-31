<script setup>
import { computed } from 'vue'
import { useNav } from './composables/useNav.js'

import PayrollRunDashboard from './components/PayrollRunDashboard.vue'
import PayrollReviewScreen from './components/PayrollReviewScreen.vue'
import PayrollEmployeeListScreen from './components/PayrollEmployeeListScreen.vue'
import EmployeePayslipScreen from './components/EmployeePayslipScreen.vue'
import HRISDashboardScreen from './components/HRISDashboardScreen.vue'
import LeaveManagementScreen from './components/LeaveManagementScreen.vue'
import GovernmentFilingScreen from './components/GovernmentFilingScreen.vue'
import EmployeeSelfServiceScreen from './components/EmployeeSelfServiceScreen.vue'
import AiLearningShell from './components/AiLearningShell.vue'
import ShiftCenterScreen from './components/ShiftCenterScreen.vue'
import EmployeeHubScreen from './components/EmployeeHubScreen.vue'
import EmployeeListScreen from './components/EmployeeListScreen.vue'

const { current } = useNav()

const screenMap = {
  'hris-dashboard':      HRISDashboardScreen,
  'employee-hub':        EmployeeHubScreen,
  'payroll-run':         PayrollRunDashboard,
  'payroll-review':      PayrollReviewScreen,
  'employee-list':       PayrollEmployeeListScreen,
  'employee-payslip':    EmployeePayslipScreen,
  'leave-management':    LeaveManagementScreen,
  'government-filing':   GovernmentFilingScreen,
  'employee-self-service': EmployeeSelfServiceScreen,
  'ai-learning':         AiLearningShell,
  'shift-center':        ShiftCenterScreen,
  'employee-directory': EmployeeListScreen,
}

const activeComponent = computed(() => screenMap[current.value])
</script>

<template>
  <div class="app">
    <component :is="activeComponent" />
  </div>
</template>

<style scoped>
.app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>

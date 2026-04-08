<script setup lang="ts">
import type { AccordionItem } from 'design-system-next'

// [research: user scans for specific policy answers — title should be the question itself]
const faqItems: AccordionItem[] = [
  {
    title: 'How many leave credits am I entitled to per year?',
    subtitle: 'Vacation Leave · Sick Leave · Service Incentive Leave',
    collapseId: 'leave-entitlement',
  },
  {
    title: 'What is the filing deadline for leave requests?',
    subtitle: 'Planned absences · Emergency leaves · Late filing',
    collapseId: 'filing-deadline',
  },
  {
    title: 'Can unused leave credits be converted to cash?',
    subtitle: 'Leave monetization · Conversion limits · Deadlines',
    collapseId: 'monetization',
  },
  {
    title: 'What happens to my leave credits when I resign?',
    subtitle: 'Final pay · Unused VL · Separation process',
    collapseId: 'separation',
  },
]
</script>

<template>
  <div class="faq-page">
    <!-- Page header -->
    <div class="faq-header">
      <div class="faq-header__eyebrow">Company Policy</div>
      <h1 class="faq-header__title">Leave Policy FAQ</h1>
      <p class="faq-header__subtitle">
        Common questions about leave entitlements, filing procedures, and monetization.
        For policy clarifications not covered here, contact HR at
        <a href="mailto:hr@company.com" class="faq-header__link">hr@company.com</a>.
      </p>
    </div>

    <!-- FAQ accordion -->
    <!-- [research: users compare multiple answers — alwaysOpen lets them stay open simultaneously] -->
    <div class="faq-content">
      <spr-accordion
        :accordionItems="faqItems"
        accordionTrigger="header"
        :alwaysOpen="true"
        :isDefaultOpen="true"
        :bordered="true"
      >
        <!-- Q1: Leave entitlement -->
        <template #leave-entitlement>
          <div class="faq-answer">
            <p>
              Regular employees are entitled to <strong>15 days Vacation Leave (VL)</strong> and
              <strong>15 days Sick Leave (SL)</strong> per year upon regularization, credited monthly
              at a rate of 1.25 days per month.
            </p>
            <p>
              Probationary employees are covered by the statutory
              <strong>5-day Service Incentive Leave (SIL)</strong> under the Labor Code, which
              converts to VL/SL upon regularization.
            </p>
            <div class="faq-answer__table-wrap">
              <table class="faq-answer__table">
                <thead>
                  <tr>
                    <th>Leave Type</th>
                    <th>Annual Credits</th>
                    <th>Who is Eligible</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Vacation Leave (VL)</td>
                    <td>15 days</td>
                    <td>Regular employees</td>
                  </tr>
                  <tr>
                    <td>Sick Leave (SL)</td>
                    <td>15 days</td>
                    <td>Regular employees</td>
                  </tr>
                  <tr>
                    <td>Service Incentive Leave (SIL)</td>
                    <td>5 days</td>
                    <td>Probationary employees</td>
                  </tr>
                  <tr>
                    <td>Maternity Leave</td>
                    <td>105 days</td>
                    <td>Female employees (RA 11210)</td>
                  </tr>
                  <tr>
                    <td>Paternity Leave</td>
                    <td>7 days</td>
                    <td>Married male employees (RA 8187)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="faq-answer__note">
              Leave credits are prorated for employees who joined mid-year based on the number of
              remaining months in the calendar year.
            </p>
          </div>
        </template>

        <!-- Q2: Filing deadline -->
        <template #filing-deadline>
          <div class="faq-answer">
            <p>
              Leave filing deadlines depend on whether the absence is planned or unplanned:
            </p>
            <ul class="faq-answer__list">
              <li>
                <strong>Planned absences</strong> — File at least
                <strong>3 working days before</strong> the intended date. Requests filed within this
                window are subject to approval at the discretion of your department head.
              </li>
              <li>
                <strong>Emergency or unplanned absences</strong> — Notify your immediate supervisor
                on or before <strong>9:00 AM</strong> on the day of the absence via call or
                messaging. Follow up with a formal leave request upon return.
              </li>
              <li>
                <strong>Extended absences (3+ consecutive days)</strong> — A medical certificate is
                required for sick leave absences lasting 3 or more consecutive days.
              </li>
            </ul>
            <p class="faq-answer__note">
              Late or unfiled leaves may be treated as Absent Without Official Leave (AWOL) and
              subject to the corresponding deduction or disciplinary action per the Employee
              Handbook.
            </p>
          </div>
        </template>

        <!-- Q3: Monetization -->
        <template #monetization>
          <div class="faq-answer">
            <p>
              Yes. Under the company's <strong>Leave Monetization Policy</strong>, regular employees
              may convert a portion of unused Vacation Leave credits to cash once per calendar year.
            </p>
            <ul class="faq-answer__list">
              <li>Maximum conversion: <strong>10 VL credits per year</strong></li>
              <li>
                Cash equivalent is computed based on the employee's
                <strong>daily rate at time of conversion</strong>
              </li>
              <li>
                Sick Leave credits are <strong>not monetizable</strong> and are forfeited if unused
                at year-end
              </li>
              <li>
                Conversion requests must be submitted to HR no later than
                <strong>October 31</strong> of the current calendar year
              </li>
            </ul>
            <p>
              Conversion is computed as: <code>Daily Rate × Number of VL Credits to Monetize</code>.
              The payout is processed with the November payroll cycle and subject to applicable
              withholding tax.
            </p>
            <p class="faq-answer__note">
              Employees must retain a minimum of 5 VL credits after conversion. Monetization is not
              available during the first year of regularization.
            </p>
          </div>
        </template>

        <!-- Q4: Resignation -->
        <template #separation>
          <div class="faq-answer">
            <p>
              Upon separation from the company, leave credits are handled as follows:
            </p>
            <ul class="faq-answer__list">
              <li>
                <strong>Unused Vacation Leave</strong> — Earned and unconsumed VL credits will be
                converted to cash and included in your
                <strong>final pay computation</strong>, subject to withholding tax. The rate used is
                your daily rate on your last working day.
              </li>
              <li>
                <strong>Unused Sick Leave</strong> — SL credits are
                <strong>forfeited upon resignation</strong> and will not be converted to cash,
                regardless of the number of credits remaining.
              </li>
              <li>
                <strong>Pending leave requests</strong> — Any approved or pending leave requests
                after your last working day will be cancelled and credits restored to your final
                balance for computation.
              </li>
            </ul>
            <p>
              Final pay is released within <strong>30 days</strong> from the date of clearance
              completion. HR will provide a leave balance breakdown as part of the clearance
              documents.
            </p>
            <p class="faq-answer__note">
              This policy applies to resignations and end-of-contract separations. Employees
              terminated for cause may have different entitlements — consult HR for specifics.
            </p>
          </div>
        </template>
      </spr-accordion>
    </div>
  </div>
</template>

<style scoped>
.faq-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 48px 32px 80px;
  font-family: 'Rubik', sans-serif;
}

/* Header */
.faq-header {
  margin-bottom: 40px;
}

.faq-header__eyebrow {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #158039; /* kangkong-700 — active/brand */
  margin-bottom: 8px;
}

.faq-header__title {
  font-size: 28px;
  font-weight: 700;
  color: #00291b; /* deep brand green */
  margin: 0 0 12px;
  line-height: 1.25;
}

.faq-header__subtitle {
  font-size: 15px;
  color: #5d6c6b; /* mushroom-600 — secondary text */
  line-height: 1.6;
  margin: 0;
}

.faq-header__link {
  color: #158039;
  text-decoration: none;
}

.faq-header__link:hover {
  text-decoration: underline;
}

/* Answer body */
.faq-content {
  display: flex;
  flex-direction: column;
}

.faq-answer {
  padding: 4px 0 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-answer p {
  font-size: 14px;
  line-height: 1.7;
  color: #262b2b; /* mushroom-950 — body text */
  margin: 0;
}

.faq-answer__list {
  font-size: 14px;
  line-height: 1.8;
  color: #262b2b;
  padding-left: 20px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.faq-answer__note {
  font-size: 13px !important;
  color: #5d6c6b !important; /* mushroom-600 */
  background: #eff1f1; /* mushroom-50 */
  border-left: 3px solid #b8c1c0; /* mushroom-300 */
  padding: 10px 14px;
  border-radius: 0 4px 4px 0;
}

/* Mini table */
.faq-answer__table-wrap {
  overflow-x: auto;
}

.faq-answer__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.faq-answer__table th {
  background: #eff1f1; /* mushroom-50 */
  color: #4c5857; /* mushroom-700 */
  font-weight: 600;
  text-align: left;
  padding: 8px 12px;
  border-bottom: 1px solid #d9dede; /* mushroom-200 */
}

.faq-answer__table td {
  padding: 8px 12px;
  color: #262b2b;
  border-bottom: 1px solid #eff1f1;
}

.faq-answer__table tr:last-child td {
  border-bottom: none;
}

code {
  font-size: 12px;
  background: #eff1f1;
  padding: 2px 6px;
  border-radius: 4px;
  color: #14532b; /* kangkong-900 */
}
</style>

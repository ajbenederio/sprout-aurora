import { ref, computed } from 'vue'

const stack = ref([])
const current = ref('employee-directory')

export function useNav() {
  function navigate(to) {
    stack.value.push(current.value)
    current.value = to
  }

  function goBack() {
    if (stack.value.length > 0) {
      current.value = stack.value.pop()
    }
  }

  const canGoBack = computed(() => stack.value.length > 0)

  return { current, navigate, goBack, canGoBack }
}

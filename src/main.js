import { createApp } from 'vue'
import SproutDesignSystem from 'design-system-next'
import 'design-system-next/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(SproutDesignSystem)
app.mount('#app')

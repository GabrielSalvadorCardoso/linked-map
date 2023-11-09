import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import { createPinia } from 'pinia'
// import NavBar from './components/NavBar.vue'
import 'leaflet/dist/leaflet.css';
import '@mdi/font/css/materialdesignicons.css'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const pinia = createPinia()
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi'
  },
  components,
  directives,
})

createApp(App).use(pinia).use(vuetify).mount('#app')
import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
// import NavBar from './components/NavBar.vue'
import 'leaflet/dist/leaflet.css';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi'
  },
  components,
  directives,
})

createApp(App).use(vuetify).mount('#app')
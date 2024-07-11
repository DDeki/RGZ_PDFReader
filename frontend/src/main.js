import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import keycloak from './keycloak'

keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
    if (authenticated) {
      const app = createApp(App)
      app.use(router)
      app.mount('#app')
    } else {
      window.location.reload()
    }
  
    // Token refresh
    setInterval(() => {
      keycloak.updateToken(70).then((refreshed) => {
        if (refreshed) {
          console.log('Token refreshed')
        } else {
          console.warn('Token not refreshed, valid for '
            + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds')
        }
      }).catch(() => {
        console.error('Failed to refresh token')
      })
    }, 60000)
  }).catch(() => {
    console.error('Authentication Failed')
  })
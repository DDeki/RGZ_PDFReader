import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './components/HomeView.vue';
import keycloak from './keycloak'; // Import Keycloak instance

const router = createRouter({
  mode: 'history',
  history: createWebHistory('/ocr-home'),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:catchAll(.*)', // catch all undefined routes
      redirect: '/'
    }
    // other routes...
  ]
});

const app = createApp(App);

// Function to clean the URL
function cleanUrl() {
  console.log('Cleaning up URL...');
  window.history.replaceState({}, document.title, "/ocr-home");
  /*const fragment = new URLSearchParams(window.location.hash.substring(1));
  if (fragment.has('state') || fragment.has('code')) {
    console.log('Cleaning up URL...');
    //const cleanUri = window.location.origin + window.location.pathname;
    //window.history.replaceState({}, document.title, cleanUri);
    window.history.replaceState({}, document.title, "/ocr-home");
    //console.log('URL cleaned:', cleanUri);
  } else {
    console.log('No URL cleanup needed.');
  }*/
}

// Set up router guards
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!keycloak.authenticated) {
      keycloak.login();
    } else {
      next();
    }
  } else {
    next();
  }
});


keycloak.init({ onLoad: 'login-required' })
  .then(authenticated => {
    if (!authenticated) {
      window.location.reload();
    } else {
      console.log('Authenticated');

      // Add Keycloak to Vue instance properties
      app.config.globalProperties.$keycloak = keycloak;

      // Ensure router guards handle authentication
      router.beforeEach((to, from, next) => {
        if (to.meta.requiresAuth && !keycloak.authenticated) {
          keycloak.login();
        } else {
          next();
        }
      });

      // Clean up URL after authentication
      cleanUrl();

      // Mount the app
      app.use(router);
      app.mount('#app');

      cleanUrl();

    }
  })
  .catch(error => {
    console.error('Authentication Failed', error); // Log the error
  });

// Clean up URL on initial load
//cleanUrl();
<template>
  <HomeView msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HomeView from './components/HomeView.vue'

export default {
  name: 'App',
  components: {
    HomeView
  },
  mounted() {
    console.log('MOUNTED APP.');
    const fragment = new URLSearchParams(window.location.hash.substring(1));
    if (fragment.has('state') || fragment.has('code')) {
      console.log('Cleaning up URL...');
      //const cleanUri = window.location.origin + window.location.pathname;
      //window.history.replaceState({}, document.title, cleanUri);
      window.history.replaceState({}, document.title, "/ocr-home");
      //console.log('URL cleaned:', cleanUri);
    } else {
      console.log('No URL cleanup needed.');
    }
  },
  methods: {
    clearAllCookies() {
      const cookies = document.cookie.split(";");
      const paths = ["/", "/ocr-home"]; // Add all known paths where cookies might be set
      const domain = window.location.hostname; // Assumes cookies are set with the current domain

      cookies.forEach(cookie => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

        paths.forEach(path => {
          document.cookie = name + `=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path};domain=${domain}`;
        });

        // Clear cookie without specifying the domain (useful for default domain cookies)
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
  background-image: url('./assets/standard_pozadina1.png');
  background-size: 100% 100%;
  background-position: center;
}
</style>

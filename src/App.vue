<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Styles globaux */
#app {
  font-family: Arial, sans-serif;
}
</style>

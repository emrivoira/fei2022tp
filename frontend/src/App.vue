<template>
  <v-app>
    <main-menu></main-menu>
    <main-bar></main-bar>
  </v-app>
</template>

<script>
import MainMenu from './components/MainMenu.vue';
import MainBar from './components/MainBar.vue';

export default {
  name: 'App',

  components: {
    MainMenu,
    MainBar
   
  },

  data: () => ({
    showMenu: true,
    item: [
      {title: 'Home', icon: 'mdi-view-deshboard'}
    ]
  }),
};
</script>

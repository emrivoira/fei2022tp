<template>

<v-app>
  <main-menu></main-menu>
  <v-main>
    <v-container fluid>
      <router-view/>
    </v-container>
  </v-main>
</v-app>
</template>


<script>
import MainMenu from './components/MainMenu.vue';
export default {
  name: 'App',
  components: {
    MainMenu,
   
  },
  data: () => ({
    showMenu: true,
    
  }),
};
</script>
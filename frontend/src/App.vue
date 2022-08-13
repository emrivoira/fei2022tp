<template>
  <v-app>
    /**
    * Se elimo el  componente MainBar. Considero que se puede resolver en un solo componente.
    * Incluso seria lo mas optimo por que se trata de funcionalidades que vand e la mano.
    */
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
    MainMenu
   
  },

  data: () => ({
    showMenu: true,
    item: [
      {title: 'PageHome', icon: 'mdi-view-deshboard'}

    ]
  }),
};
</script>

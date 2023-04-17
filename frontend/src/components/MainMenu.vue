<template>
   <v-container>

          <v-app-bar
            app
            elevation="4"
            class="primary"
            >
            <v-app-bar-nav-icon @click="mostrarMenu=!mostrarMenu" color="white">
            </v-app-bar-nav-icon>
            <v-app-bar-title
            class="white--text"
            >Sistema de Reserva de Aulas CURZA</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn small text fab>
                <v-icon color="white">mdi-cog-outline</v-icon>
            </v-btn>
            <v-btn small @click="logout"
                class="secondary"
            >
                <v-icon>mdi-exit-to-app</v-icon>
            </v-btn>

        </v-app-bar>

        <v-navigation-drawer
            app
            v-model="mostrarMenu"
            temporary
            class="secondary"
        >
            <v-list-item class="primary white--text">
                <v-img
                    alt="Reserva Aulas Logo"
                    class="shrink ma-3"
                    contain
                    :src="require('../assets/logo.png')"
                    transition="scale-transition"
                    width="40"
                ></v-img>
                <v-list-item-content>
                    <v-list-item-title class="text-h6">
                        SiRAC
                    </v-list-item-title>
                    
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list dense>
                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    :to="item.to"
                    link
                    
                >
                    <v-list-item-icon
                        class="--white"
                    >
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content
                        class="white--text"
                    >
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
   </v-container>
</template>

<script>
    export default {
        name: 'MainMenu',
        data: () => ({
          mostrarMenu: false,
          items:[
          {title:'Home', icon: 'mdi-view-dashboard', to: '/'},
          {title:'Gestión de Aulas', icon: 'mdi-google-classroom', to: '/aulas'},
          {title:'Gestión de Carreras', icon: 'mdi-school', to: '/carreras'},
          {title:'Gestión de Profesores', icon: 'mdi-human-male-board', to: '/profesores'},
          {title:'Gestión de Materias', icon: 'mdi-book-open', to: '/materias'},
          {title:'About', icon: 'mdi-information-outline', to: '/about'},
            
          ],
           logout(){
                console.log('Desconectado...')
            },
        }),
        mounted() {
            
        },
        computed: {
            
        },
        
    }

</script>
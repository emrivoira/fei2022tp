<template>
   <!-- Codigo de PageReservation.vue-->
  <v-card
    class="elevation-1 mx-15 "
    flex
  >
  
    <template >
      <v-toolbar
        class="pb-3 primary elevation-4 "
        
        flat
      >
        <v-app-bar-nav-icon>
              <v-icon color="white">mdi-human-male-board</v-icon>
            </v-app-bar-nav-icon>
            <v-toolbar-title class="white--text">Generar Reserva</v-toolbar-title>
            <v-divider
              class="mx-4 white"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            
            <v-row
              class="my-auto"
            >
              
             
              <v-col
                cols="12"
                
              >
            
                <v-select
              
                background-color="white"
                v-model="selectedClassroom"
                :items="classroom"
                label="Seleccione el aula a reservar"
                item-text="descripcion"
                item-value="id"
                @change="newSelectClassroom"
                dense
                ></v-select>
              </v-col>
            </v-row>
            
            <v-spacer></v-spacer>

            <v-btn color="accent" @click="changeReserveDialog" :disabled="!changeVisibilityAdd">
              Agregar
            </v-btn>
        </v-toolbar>
        
      
    </template>
    
    <template>
      <ComponentCalendar  :selectedClassroom="selectedClassroom" :newReserve="newReserve" ref="calendar"/>
    </template>

    <v-dialog v-model="reserveDialog" max-width="500px">
      <v-card>
        <v-card-title>Nueva Reserva</v-card-title>
        <v-card-text>
          <v-date-picker   full-width class="my-4" v-model="saveItems.startDate" label="Fecha de inicio"></v-date-picker>
          <v-time-picker :landscape="$vuetify.breakpoint.smAndUp" ampm-in-title v-model="saveItems.startHour" label="Hora de inicio"></v-time-picker>
          <v-date-picker   full-width class="my-4" v-model="saveItems.endDate" label="Fecha de fin"></v-date-picker>
          <v-time-picker :landscape="$vuetify.breakpoint.smAndUp" ampm-in-title v-model="saveItems.endHour" label="Hora de fin"></v-time-picker>
          <v-text-field v-model="saveItems.detail" label="Detalle"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveNewReserve">Guardar</v-btn>
          <v-btn text @click="changeReserveDialog">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-card>

</template>

<script>
import ComponentCalendar from './ComponentCalendar.vue';
export default {
  components:{
    ComponentCalendar
  },
  data: () => ({
    classroom:[],
    selectedClassroom: null,
    reserveDialog: false,
    newReserve: [],
    changeVisibilityAdd: false,
    saveItems: {
      idClassroom:"",
      startDate: "",
      startHour: "",
      endDate:"",
      endHour:"",
      detail:"",
     

    }
  }),
  
  
  created() {
    this.getClassroom();
  },
  methods: {
    async getClassroom() {
      await this.axios
        .get("apiv1/aula")
        .then((response) => {
          this.classroom = response.data;
    
          
        })
        .catch((e) => {
          this.errors = e;
          // Capturamos los errores
        });
    },


    newSelectClassroom() {
      console.log(this.selectedClassroom);
      if (this.selectedClassroom != null){
          this.changeVisibilityAdd = true
      }
    },
    changeReserveDialog() {
      if (this.reserveDialog){
        this.reserveDialog = false;
      }else {
        this.reserveDialog = true;  
      }
    },

    saveNewReserve(){
      this.saveItems.idClassroom = this.selectedClassroom;
      this.newReserve.push(this.saveItems);
      this.reserveDialog = false;
      this.$refs.calendar.saveReserve();
      
    },


  },

}

</script>
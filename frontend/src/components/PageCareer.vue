<template>
   <v-data-table
    :headers="headers"
    :items="career"
    :items-per-page="10"
    class="elevation-1 mx-15"
    :loading="loading"
  >
  <template v-slot:top>
        <v-toolbar
          flat
          class="pb-3 primary elevation-4"
        >
          <v-app-bar-nav-icon>
            <v-icon color="white">mdi-school</v-icon>
          </v-app-bar-nav-icon>
          <v-toolbar-title class="white--text">Gestionar Carreras</v-toolbar-title>
          <v-divider
            class="mx-4 white"
            inset
            vertical
          ></v-divider>
          <v-spacer> </v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="secondary white--text"
                dark
                class=""
                v-bind="attrs"
                v-on="on"
              >
                Agregar Carrera
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.nombre"
                        label="Carrera"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="error"
                  text
                  @click="close"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="accent darken-1"
                  text
                  @click="save"
                >
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="700px">
            <v-card>
              <v-card-title>
                <v-icon 
                class="mx-auto"
                color="red"
                x-large
                >
                 mdi-alert
                </v-icon>
              </v-card-title>
              <v-card-text class="text-h5 text-center" >¿Esta seguro que deseas eliminar una carrera llamada: {{ getNombre }}?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="closeDelete">Cancelar</v-btn>
                <v-btn color="success darken-1 " text @click="deleteItemConfirm">Confirmar</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>

          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          color="primary"
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          color="error darken-2"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
    </template>
      <template v-slot:no-data>
        <v-alert
          class="mt-5"
          border="bottom"
          colored-border
          type="warning"
          elevation="4"
        >
          No se encontraron datos en la base de datos, pude comenzar a realizar la carga.
        </v-alert>
      </template>
      <template v-if="statusAlert" v-slot:footer>
        <ComponentAlert 
          :type="typeAlert" 
          :message="messageAlert"
        />

      </template>
</v-data-table>
      

    

</template>

<script>
import ComponentAlert from "./ComponentAlert.vue"
  export default {
    components:{
      ComponentAlert
    },
    data:() => ({
      dialog: false,
      dialogDelete: false,
      loading: true,
      typeAlert:"",
      messageAlert:"",
      statusAlert: false,
      career:[],
      headers: [
          { text: 'id',value: 'id',},
          { text: 'Nombre de Carrera', value: 'nombre' },
          { text: "Acciones", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        nombre:""
      },
      defaultItem:{
        nombre:"Cargar nueva carrera"
      },
      

    }),
    computed:{
      formTitle() {
        return this.editedIndex === -1 ? "Nueva Carrera" : "Editar Carrera"
      },
      getNombre(){
      return this.editedItem.nombre;
    }
    },
    watch: {
      dialog(val) {
        val || this.close();
      },
      dialogDelete(val) {
        val || this.closeDelete();
      },
    },

    created() {
      this.getCareer();
    },
    
    methods:{
      async getCareer(){
        await this.axios.get("apiv1/carrera")
          .then((response)=>{
            this.career = response.data;
            this.classroom = response.data;
          setTimeout(()=> {
            this.loading = false;
          }, 1500); 
        })
        .catch((e) => {
          this.errors = e; 
        })
      },

      editItem(item){
        this.editedIndex = this.career.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },

      deleteItem(item){
        this.editedIndex = this.career.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
      },

      deleteItemConfirm(){
        this.career.splice(this.editedIndex, 1);
        this.deleteCareer(),
        this.closeDelete();
      },

      close() {
        this.dialog = false;
        this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        });
      },

      closeDelete() {
        this.dialogDelete = false;
        this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        });
      },

      shootAlert(method){
      switch (method) {
        
        case 'post':
          this.typeAlert="success";
          this.messageAlert="Se creo la carrera existosamente";
          break;
        case 'put':
          this.typeAlert="success";
          this.messageAlert="La edición la carrera fue existosa";
          break;
          case 'delete':
          this.typeAlert="warning";
          this.messageAlert="Se elimino la carrera de manera exitosa";
          break;
        default:
          break;
      }
      
      this.statusAlert = true;
      setTimeout(()=> {
        this.statusAlert = false;
      }, 2500);
    },

      save() {
      if (this.editedIndex > -1) {
        this.editCareer();
        Object.assign(this.career[this.editedIndex], this.editedItem);
      } else {
        this.saveCareer();
      }
      this.close();
    },
    
    async saveCareer() {
      await this.axios
        .post("apiv1/carrera", this.editedItem)
        .then((response) => {
          this.editedItem = response.data;
          this.career.push(this.editedItem);
          this.shootAlert(response.config.method);
        })
        .catch((e) => {
          this.errors = e;
        });
    },

    async editCareer() {
      await this.axios
        .put("apiv1/carrera/" + this.editedItem.id, this.editedItem)
        .then((response) => {
          this.shootAlert(response.config.method);
          
        })
        .catch((e) => {
          this.errors = e;
        });
    },
    
    async deleteCareer() {
      
      await this.axios.delete("apiv1/carrera/" + this.editedItem.id)
      .then((response) => {
        this.shootAlert(response.config.method);
      })
      .catch((e) => {
        this.errors = e;
      });
    },

    

    },
    //termino methods
  }
</script>
<template>
    <v-data-table
      :headers="headers"
      :items="classroom"
      class="elevation-1 mx-15 "
      :loading =  "loading"
    >
    <template v-slot:[`item.es_climatizada`]="{ item }">
      <v-chip
        :color="cangedColorHeated(item.es_climatizada)"
        dark
      >
        {{ changedTextHeated(item.es_climatizada) }}
      </v-chip>
    </template>

      <template v-slot:top>
        <v-toolbar
          class="pb-3 primary elevation-4"
          flat
        >
          <v-app-bar-nav-icon>
            <v-icon color="white">mdi-google-classroom</v-icon>
          </v-app-bar-nav-icon>
          <v-toolbar-title class="white--text">Gestionar Aulas</v-toolbar-title>
          <v-divider
            class="mx-4 white"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="secondary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Agregar aula
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
                        v-model="editedItem.descripcion"
                        label="Descripción"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.ubicacion"
                        label="Ubicación"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.cant_proyector"
                        label="Cantidad de Proyectores"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.aforo"
                        label="Aforo"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    <v-switch
                        v-model="editedItem.es_climatizada"
                        :input-value="editedItem.es_climatizada"
                        @change="(value) => changeState(value)"
                        :label="`Esta climatizada`"
                      ></v-switch>
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
              <v-card-text class="text-h5 text-center" >¿Esta seguro de borra el aula llamada: {{ getDescripción }} ?</v-card-text>
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
          color="secondary"
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
import ComponentAlert from './ComponentAlert.vue';
export default {
  components:{
    ComponentAlert
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    classroom: [],
    loading: true,
    errors: "",
    typeAlert:"",
    messageAlert:"",
    statusAlert: false,
    method: "",
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Descripción", value: "descripcion" },
      { text: "Ubicación", value: "ubicacion" },
      { text: "Cantidad de Proyectores", value: "cant_proyector" },
      { text: "Aforo", value: "aforo" },
      { text: "¿Es Climatizada?", value: "es_climatizada" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      descripcion: "",
      ubicacion: "",
      cant_proyector: 0,
      aforo: 0,
      es_climatizada: false,
    },
    defaultItem: {
      descripcion: "",
      ubicacion: "",
      cant_proyector: 0,
      aforo: 0,
      es_climatizada: false,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Aula" : "Editar Aula";
    },
    getDescripción(){
      return this.editedItem.descripcion;
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
    this.getClassroom();
  },

  mounted() {
   
  },

    
  methods: {
    async getClassroom() {
      await this.axios
        .get("apiv1/aula")
        .then((response) => {
          this.classroom = response.data;
          setTimeout(()=> {
            this.loading = false;
          }, 1500); 
          console.log(this.classroom)
        })
        .catch((e) => {
          this.errors = e;
          // Capturamos los errores
        });
    },

    editItem(item) {
      this.editedIndex = this.classroom.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      //console.log(this.editedIndex)
      //console.log(this.editedItem.id)
    },

    deleteItem(item) {
      this.editedIndex = this.classroom.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
      console.log('deleteItem(item)', item);
      //console.log(item.id);
    },

    deleteItemConfirm() {
      console.log('Confirmar delete (item)', this.editedItem.id);
      this.classroom.splice(this.editedIndex, 1);
      //this.deleteItemConfirmTitle();
      this.deleteClassroom();
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
    changedTextHeated (es_climatizada){
     
     if (es_climatizada === false) {
       return 'No es Climatizada'
     } else {
       return 'Esta Climatizada'
     }

   },

    changeState(valor) {
      this.editedItem.es_climatizada = valor;
    },

    

    shootAlert(method){
      switch (method) {
        
        case 'post':
          this.typeAlert="success";
          this.messageAlert="Se creo el aula existosamente";
          break;
        case 'put':
          this.typeAlert="success";
          this.messageAlert="La edición del aula fue existosa";
          break;
          case 'delete':
          this.typeAlert="warning";
          this.messageAlert="Se elimino el aula de manera exitosa";
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
        console.log(this.editedItem.id);
        this.editClassroom();
        Object.assign(this.classroom[this.editedIndex], this.editedItem);
      } else {
        this.saveClassroom();
      }
      this.close();
    },
    /*
    deleteItemConfirmTitle(){
      return "¿Esta seguro de borra el aula llamada: '" + this.editedItem.descripcion + "' ?";
    },
    */
    cangedColorHeated (es_climatizada){
     
      if (es_climatizada === false) {
        return 'error'
      } else {
        return 'success'
      }

    },
    // Se crean metodos para guardar, actualizar y borrar registros.
  
    async saveClassroom() {
      await this.axios
        .post("apiv1/aula", this.editedItem)
        .then((response) => {
          this.editedItem = response.data;
          this.classroom.push(this.editedItem);
          this.shootAlert(response.config.method);
        })
        .catch((e) => {
          this.errors = e;
        });
    },
    async editClassroom() {
      await this.axios
        .put("apiv1/aula/" + this.editedItem.id, this.editedItem)
        .then((response) => {
          this.shootAlert(response.config.method);
          
        })
        .catch((e) => {
          this.errors = e;
          console.log("Error de edición", e)
        });
    },

    async deleteClassroom() {
      
      await this.axios.delete("apiv1/aula/" + this.editedItem.id)
      .then((response) => {
        this.shootAlert(response.config.method);
      })
      .catch((e) => {
        console.log('Log del catch delete', e)
        this.errors = e;
      });
    },
  },

  
};
</script>
<template>
    <v-data-table
      :headers="headers"
      :items="professor"
      class="elevation-1 mx-15 "
      :loading =  "loading"
    >

      <template v-slot:top>
        <v-toolbar
          class="pb-3 primary elevation-4"
          flat
        >
          <v-app-bar-nav-icon>
            <v-icon color="white">mdi-human-male-board</v-icon>
          </v-app-bar-nav-icon>
          <v-toolbar-title class="white--text">Gestionar Profesores</v-toolbar-title>
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
                color="secondary white--text"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Agregar Profesor
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
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.apellido"
                        label="Apellido"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="mostrar"
                        label="mostrar"
                        disabled
                      >
                      </v-text-field>
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
              <v-card-text class="text-h5 text-center" >¿Esta seguro de borra el profesor: {{  editedItem.mostrar }} ?</v-card-text>
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
    professor: [],
    loading: true,
    errors: "",
    typeAlert:"",
    messageAlert:"",
    statusAlert: false,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Nombre", value: "nombre" },
      { text: "Apellido", value: "apellido" },
      { text: "Mostrar", value: "mostrar" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      nombre: "",
      apellido: "",
      mostrar:"",
      
     
    },
    defaultItem: {
      nombre: "",
      apellido: "",
      mostrar: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Profesor" : "Editar Profesor";
    },
     
    mostrar:{
      get(){
      return this.editedItem.nombre +" "+ this.editedItem.apellido;
      },
      set(professor){
        const name = professor.split(" ")
        this.editedItem.nombre = name[0]
        this.editedItem.apellido = name[1]

      }
    }
 
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    /** editedItem:
    {
      completarMostrar(){
        this.editedItem.mostrar = this.editedItem.nombre + " " + this.editedItem.apellido;
      },
      deep: true
    },*/
  },

  created() {
    this.getClassroom();
  },

  mounted() {
   
  },

    
  methods: {
    async getClassroom() {
      await this.axios
        .get("apiv1/profesor")
        .then((response) => {
          this.professor = response.data;
          setTimeout(()=> {
            this.loading = false;
          }, 1500); 
        })
        .catch((e) => {
          this.errors = e;
          // Capturamos los errores
        });
    },

    editItem(item) {
      this.editedIndex = this.professor.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.professor.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

   

    deleteItemConfirm() {
      this.professor.splice(this.editedIndex, 1);
      this.deleteProfessor();
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
          this.messageAlert="Se creo el Profesor existosamente";
          break;
        case 'put':
          this.typeAlert="success";
          this.messageAlert="La edición del Profesor fue existosa";
          break;
          case 'delete':
          this.typeAlert="warning";
          this.messageAlert="Se elimino el Profesor de manera exitosa";
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
        this.editProfessor();
        Object.assign(this.professor[this.editedIndex], this.editedItem);
      } else {
        this.saveProfessor();
      }
      this.close();
    },
  
    // Se crean metodos para guardar, actualizar y borrar registros.
  
    async saveProfessor() {
      this.editedItem.mostrar = this.mostrar
      await this.axios
        .post("apiv1/profesor", this.editedItem)
        .then((response) => {
          this.editedItem = response.data;
          this.professor.push(this.editedItem);
          this.shootAlert(response.config.method);
        })
        .catch((e) => {
          this.errors = e;
        });
    },
    async editProfessor() {
      this.editedItem.mostrar = this.mostrar
      await this.axios
        .put("apiv1/profesor/" + this.editedItem.id, this.editedItem)
        .then((response) => {
          this.shootAlert(response.config.method);
          
        })
        .catch((e) => {
          this.errors = e;
          console.log("Error de edición", e)
        });
    },

    async deleteProfessor() {
      
      await this.axios.delete("apiv1/profesor/" + this.editedItem.id)
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
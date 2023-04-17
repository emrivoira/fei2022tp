<template>
    <v-data-table
        :headers="headers"
        :items="matter"
        class="elevation-1 mx-5"
        :loading="loading"
    >
        <template v-slot:[`item.id_carrera`]="{ item }">
                {{ item.id_carrera.nombre }}
        </template>
        <template v-slot:[`item.id_profesor`]="{ item }">
                {{ item.id_profesor.mostrar }}
        </template>
        <template v-slot:top>
            <v-toolbar
                class="primary elevation-4 pb-3"
                flat
            >
                <v-app-bar-nav-icon>
                    <v-icon color="white">mdi-book-open</v-icon>
                </v-app-bar-nav-icon>
                <v-toolbar-title class="white--text mx-3">Gestionar Materias</v-toolbar-title>
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
                            Agregar Materia
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
                                            v-model="editedItem.cant_alumnos"
                                            label="Cantidad de alumnos"
                                        ></v-text-field>    
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                    >
                                        <v-select
                                            :items="career"
                                            item-text="nombre"
                                            item-value="id"
                                            v-model="editedItem.id_carrera"
                                            label="Carrera"
                                        ></v-select>    
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                    >
                                        <v-select
                                            :items="professor"
                                            item-text="mostrar"
                                            item-value="id"
                                            v-model="editedItem.id_profesor"
                                            label="Seleccione el profesor"
                                        ></v-select>    
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
                        <v-card-text
                            class="text-h5 text-center"
                        >
                            ¿Estas seguro de borrar la materia: {{ editedItem.nombre }}?
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="error"
                                text
                                @click="closeDelete"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                color="success darken-1"
                                text
                                @click="deleteItemConfirm"
                            >
                                Confirmar
                            </v-btn>
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
                @click="$event =>editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                small
                color="error darken-2"
                @click="$event => deleteItem(item)"
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
                :type="TypeAlert"
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
            dialog:false,
            dialogDelete:false,
            matter: [],
            professor: [],
            career:[],
            loading:true,
            errors:"",
            messageAlert:"",
            statusAlert: false,
            headers:[
                {
                    text:"ID",
                    align:"start",
                    sortable:false,
                    value:"id",
                },
                { text: "Nombre", value: "nombre"},
                { text: "Cantidad de alumnos", value: "cant_alumnos"},
                { text: "Carrera", value: "id_carrera"},
                { text: "Profesor", value: "id_profesor"},
                { text: "Acciones", value: "actions", sortable:false }
            ],
            editedIndex: -1,
            editedItem: {
                nombre:"",
                cant_alumnos:0,
                id_carrera:0,
                id_profesor:0,
            },
            defaultItem:{
                nombre:"",
                cant_alumnos:0,
                id_carrera:0,
                id_profesor:0,
            }

        }),
        computed: {
            formTitle(){
                return this.editedIndex === -1 ? "Nueva Materia" : "Editar Materia";
            },
        },

        watch:{
            dialog(val) {
                val || this.close();
            },
            dialogDelete(val) {
                val || this.closeDelete();
            }
        },
        created() {

            this.getMatter();
            this.getCareer();
            this.getProfessor();
            
        },
        mounted() {
            console.log(this.getMatter());
            
        },
        methods: {

            async getMatter() {
                await this.axios
                .get("apiv1/materia")
                .then( (response) => {
                    this.matter = response.data;
                    setTimeout(() => {
                        this.loading = false;
                    }, 1500);
                })
                .catch( (e) => {
                    this.errors = e;
                        
                }); 
            },

            async getCareer() {
                await this.axios
                .get("apiv1/carrera")
                .then((response) => {
                    this.career = response.data;
                });
            },
            async getProfessor() {
                await this.axios
                .get("apiv1/profesor")
                .then((response) => {
                    this.professor = response.data;
                })
            },

            editItem(item){
                this.editedIndex = this.matter.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true;
            },

            deleteItem(item){
                this.editedIndex = this.matter.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialogDelete = true;

            },

            deleteItemConfirm() {
                this.matter.splice(this.editedIndex, 1);
                this.deletMatter();
                this.closeDelete();
            },
            close() {
                this.dialog = false;
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                })
            },

            closeDelete() {
                this.dialogDelete = false;
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                })
            },

            shootAlert(method){
                switch (method) {
                    case 'post':
                        this.typeAlert = "success"
                        this.messageAlert = "Materia creada exitosamente";
                        break
                    case 'put':
                        this.typeAlert = "success"
                        this.messageAlert = "Materia actualizada exitosamente";
                        break
                    case 'delete':
                        this.typeAlert = "warning"
                        this.messageAlert = "Materia eliminada exitosamente";
                        break
                    default:  
                        break  
                }
                this.statusAlert = true;
                setTimeout(() => {
                    this.statusAlert = false;
                }, 2500);
            },
        
        
            save() {
                if (this.editedIndex > -1) {
                //this.editMatter();
                Object.assign(this.matter[this.editedIndex], this.editedItem);
            } else {
                this.saveMatter();
            } 
            this.close();
            },

            async saveMatter(){
                await this.axios
                .post("apiv1/materia", this.editedItem)
                .then((response) => {
                    this.editedItem = response.data;
                    this.matter.push(this.editedItem);
                    this.shootAlert(response.config.method);

                })
                .catch((e) => {
                    this.errors = e;
                })
            }

            
            
            
        }        

    }
</script>
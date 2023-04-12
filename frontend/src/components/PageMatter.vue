<template>
    <v-data-table
        :headers="headers"
        :items="matter"
        class="elevation-1 mx-5"
        :loading="loading"
    >
        <template v-slot:top>
            <v-toolbar
                class="primary elevation-4 pb-3"
                flat
            >
                <v-app-bar-icon>
                    <v-icon color="white">mdi-book-open</v-icon>
                </v-app-bar-icon>
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
                        <v-card_text>
                            <v-container>
                                <v-row>
                                    <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                    >
                                        <v-text-field
                                            v-model="editedItem.nombre"
                                            label="Materia"
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
                                            label="Carrera"
                                        ></v-select>    
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                    >
                                        <v-select
                                            label="Profesor"
                                        ></v-select>    
                                    </v-col>
                                    
                                </v-row>
                            </v-container>
                        </v-card_text>    
                        <v-card-actions>
                            <v-spacer></v-spacer>

                        </v-card-actions>
                    </v-card>
            </v-toolbar>
        </template>

    </v-data-table>
</template>
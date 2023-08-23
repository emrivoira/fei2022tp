//Intancia de Vue
import Vue from 'vue'

import VueRouter from 'vue-router'

// Importamos los componentes a utilizar en las rutas
import PageHome from '@/components/PageHome'
import PageAbout from '@/components/PageAbout'
import PageNotFound from '@/components/PageNotFound'
import PageClassroom from '@/components/PageClassroom'
import PageCareer from "@/components/PageCareer"
import PageProfessor from "@/components/PageProfessor"
import PageMatter from "@/components/PageMatter"
import PageReservation from "@/components/PageReservation"

//Indicamos que vue va a utilizar la libreria/plugins vue-router
Vue.use(VueRouter)

/** Exportamos un arreglo, cada uno de los componentes
 *  es un objeto
 */
const routes = [

    /** 
        Se definen en la constantes las rutas
        Los objetos del arreglo:
        El path es el que se encarga de indicar la ruta.
        name, nombra la ruta. No es obligatorio
        En el Component llamamos al comoponente que 
        mostraremos en esa ruta.
    */
    {path: '*', name: 'PageNotFound', component: PageNotFound },
    {path: '/', name: 'PageHome', component: PageHome  },
    {path: '/about', name: 'PageAbout', component: PageAbout },
    {path: '/aulas', name: 'PageClassroom', component: PageClassroom },
    {path: '/profesores', name: 'PageProfessor', component: PageProfessor },
    {path: '/materias', name:'PageMatter', component: PageMatter},
    {path: '/carreras', name: 'PageCareer', component: PageCareer },
    {path: '/reservas', name: 'PageReservation', component: PageReservation}
]

// Se instancia el objeto vue-router
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
        routes
})

// Se exporta
export default router
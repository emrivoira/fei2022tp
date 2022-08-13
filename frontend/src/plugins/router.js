//Intancia de Vue
import Vue from 'vue'

import VueRouter from 'vue-router'

// Importamos los componentes a utilizar en las rutas
import PageHome from '@/components/PageHome'
import PageAbout from '@/components/PageAbout'
import PageNotFound from '@/components/PageNotFound'

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
]

// Se instancia el objeto vue-router
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
        routes
})

// Se exporta la instancia
export default router
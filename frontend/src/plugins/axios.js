import axios from "axios";

/**
 * 
 * Configuracion de Axios.
 * BaseUrl es la URL en donde se realizan las peticiones. 
 * 
 */

axios.defaults.baseURL = "http://127.0.0.1:8000";

/**
 * 
 * Se declara una constante para guardar el objeto axios,
 * para luego exportarlo por default desde este archivo.
 * 
 */

const custom_axios = axios;

export default custom_axios;
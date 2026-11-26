# practica24_253239

### ¿Cuáles son los tres requisitos de una PWA y qué hace cada uno?
Manifest: define el nombre, los iconos, los colores y la forma en que se presenta la aplicacion al instalarla
Service Worker: permite administrar la caché de los recursos y hacer que la aplicacion funcione sin conexion
HTTPS: proporciona un contexto seguro para utilizar las funcionalidades de la PWA. En desarrollo, localhost se considera una excepcion valida

### ¿Qué archivos generó vite-plugin-pwa en dist/ y para qué sirve cada uno?
manifest.webmanifest: contiene la configuracion de la aplicacion instalable
sw.js: es el Service Worker encargado de manejar las peticiones y la cache
registerSW.js: registra el Service Worker en el navegador
workbox-57884417.js: contiene las funciones utilizadas para administrar las estrategias de cache

### ¿Por qué las clases usan NetworkFirst y las imágenes CacheFirst?
Las clases utilizan NetworkFirst porque su informacion puede cambiar y es importante obtener los datos actualizado, si no hay conexion se recuperan los datos guardados en cache y las imagenes utilizan CacheFirst porque no cambian tan frecuentemente y asi evitamos descargarlas cada vez que se abre la aplicacion

### ¿Qué diferencia hay entre una PWA y una aplicación híbrida?
Una PWA es una aplicacion web que se puede instalar directamente desde el navegador y puede funcionar sin conexion y una aplicacion hibrida utiliza tecnologias web pero se ejecuta dentro de un contenedor nativo que le permite acceder a funcionalidades del dispositivo y distribuirse mediante tiendas de aplicaciones

### ¿Por qué en npm run dev no hay Service Worker?
Porque por defecto vite-plugin-pwa no habilita el Service Worker durante el desarrollo evitando que la cache interfiera con los cambios del codigo y por eso utilizamos npm run build para generar los archivos de produccion y npm run preview para probar la PWA

# practica15_253239

## Preguntas de la práctica

### ¿Por qué el 404 sí tiene encabezado y pie?
Porque la ruta del 404 esta dentro del mismo layout que las demas rutas entonces el layout siempre muestra el encabezado y el pie y en el outlet se muestra la pagina que 
corresponda a la url

### ¿Qué cambia en la pestaña Red si usas <a href> en lugar de Link?
Con <a href> el navegador hace una carga completa de la pagina al cambiar de direccion por lo que aparecen mas peticiones en la pestaña red y con link React Router cambia 
de ruta sin recargar toda la aplicacion

### ¿En qué tipo de dato llega el id de la URL y qué pasa si no lo conviertes?
El id que se obtiene con useParams llega como texto por eso se convierte con Number(id) antes de enviarlo a la funcion que espera un numero si no se convierte puede haber 
problemas de tipos

### ¿Qué pasa al ir de /clases/1 a /clases/2 si el id no está en las dependencias del efecto?
El efecto no se vuelve a ejecutar cuando cambia el id entonces la url puede cambiar a otra clase pero la informacion mostrada puede seguir siendo la de la clase anterior

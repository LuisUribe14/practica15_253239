# practica17_253239

### ¿La ruta protegida hace segura la aplicación? ¿Qué es lo que de verdad protege los datos?
No completamente pq la ruta protegida evita que una persona navegue desde el frontend a ciertas paginas si no tiene sesion pero la seguridad real la pone el backend pq valida el token antes de entregar o modificar datos

### ¿Por qué no se manda el miembroId al inscribirse?
Porque el backend obtiene el miembro a partir del usuario identificado en el jwt y asi no se confia en un miembroId enviado desde el frontend y se evita que una persona intente inscribir a otro miembro

### ¿Qué diferencia hay entre un 401 y un 403?
El 401 significa que la peticion no tiene una autenticacion valida por ejemplo porque falta el token o es invalido y el 403 significa que el usuario ss esta autenticado pero no tiene permiso para realizar esa accion

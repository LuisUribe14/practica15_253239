# practica16_253239

## Preguntas de la práctica

### ¿Por qué se usa un contexto y no props para la sesión?
Porque la sesion se necesita en varios componentes de la aplicacion y con un contexto se puede acceder al usuario y al token desde cualquier componente sin tener que pasar la información por props entre muchos niveles

### ¿Qué pasa si un componente usa la sesión fuera del proveedor?
El componente no puede acceder correctamente al contexto de sesion y en nuestro caso el hook lanza un error indicando que debe usarse dentro de SesionProvider

### ¿Dónde se guarda el token y qué riesgo tiene ese lugar?
El token se guarda en localStorage para que la sesion se mantenga aunque se recargue la psgina y el riesgo es que si existe un ataque de tipo XSS un script malicioso podria intentar leer ese token

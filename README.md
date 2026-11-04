# practica18_253239

### ¿Cuánto se ahorró y por qué el ahorro es pequeño?
El archivo principal paso de 320.81 kB a 315.51 kB, por lo que se redujo aproximadamente 5.30 kB. El ahorro es pequeño porque las páginas de esta aplicación tienen poco codigo y gran parte del tamaño corresponde a librerias y código compartido que sigue siendo necesario desde el inicio

### ¿Por qué falla la API si vite preview corre en el puerto 4173?
Porque el backend permite las solicitudes del frontend desde localhost:5173 y al ejecutar vite preview el frontend utiliza localhost:4173 que el navegador considera un origen diferente

### ¿Cuándo usarías Context y cuándo Zustand?
Pues depende usaria Context para informacion global relativamente estable como la sesion del usuario y Usaria Zustand para estados compartidos que cambian con mas frecuencia y son utilizados por varios componentes

# Films - API

Es una aplicación

### Database
El sistema gestor de base de datos usado para este proyecto es MongoDB.

### Ejecutar el proyecto
### Prerequisitos
- [Instalar Node.js](https://nodejs.org/es/download/). Como mínimo, debe ser la versión 12.

### Instrucciones
1) Instalar las dependencias requeridas ejecutando en la consola: ```npm i```
2) Crear un archivo .env y guardarlo en este directorio.

    Los valores a utilizar son:
    - PORT: número del puerto que va a ser usado para correr la app localmente. Si no se especifica, se usa el puerto "4000".
    - DATABASE_CONNECTION_URI: es la URI de conexión con la cual la app va a conectarse a la base de datos.

3) Para ejecutar la app, existen dos maneras:
    
    - ```npm run build && npm start```: construir la aplicación para el entorno de producción y ejecutarla localmente.
    - ```npm run dev```: ejecutar la app mientras se está desarrollando (usando el paquete 'nodemon' para recargar el servidor al guardar los cambios)
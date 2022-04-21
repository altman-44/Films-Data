# Films Data

Para subir los datos de las películas, se debe subir un archivo .csv con el siguiente encabezado: "titulo;genero;año;director;actores" (nótese que el separado a utilizar es ';'). En caso de subir varios valores para un campo (por ejemplo "Acción y Comedia" para el género, separarlos mediante ',').

## Ejecutar el proyecto
### Prerequisitos
- [Instalar Node.js](https://nodejs.org/es/download/). Como mínimo, debe ser la versión 12.

### Instrucciones
1) Instalar las dependencias requeridas ejecutando en la consola: ```npm i```
2) Para ejecutar la app, primero se debe especificar la ruta a la cual se van a hacer las peticiones. La misma debe ser la ruta en donde se esté ejecutando la api ('../api'). Esta es 'http://localhost:{PORT}/films', donde {PORT} es el número de puerto especificado en el archivo .env dentro del directorio de la api. Si no se especificó ningún puerto, '4000' es utilizado por defecto. Dicha ruta se debe declarar en './utils/constants.ts', a través de la variable 'API_BASE_URL'. Cabe aclarar que para publicar el proyecto en producción, se debe dejar esta variable con el valor '/films', ya que ambos proyectos (api y cliente) se publican en el mismo servidor.
Y luego, existen dos maneras para ejecutarla:
    
    - ```npm start```: ejecutar la app en desarrollo.
    - ```npm run build && npm run serve```: construir la aplicación para el entorno de producción. Se creará una carpeta llamada 'build' y luego, se creará un servidor local para cargar la página ubicada en el subdirectorio 'build'.
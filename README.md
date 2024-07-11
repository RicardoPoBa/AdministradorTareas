<h1 align="center" id="title">Administrador de Tareas - José Ricardo Porras Barrantes</h1>

<p id="description">Este proyecto es una prueba tecnica de un desarrollo completo con base de datos backend y frontend.</p>

<h2>🛠️ Pasos de instalación:</h2>

<p>1. Clonar el repositorio en una carpeta de tu pc</p>

<p>2. La carpeta BaseDeDatos cuenta con los script .sql para Crear la base de datos y uno que añade los registros esenciales y 2 de prueba</p>

<p>3. Al utilizar otro servidor de base de datos debera realizar un cambio en la cadena de conexión. Por lo que debera modificar el archivo TareasDS.xsd en donde debera modificar las etiquetas Connection y DbSource (Ver la imagen en Imagenes de Ayuda) Son alrededor de 9 coincidencias a modificar</p>

<p>4. Luego ya debería poder ejecutar el proyecto API este proyecto está hecho para ejecutarse con un localhost por lo que verifique el numero de puerto de salida de la API</p>

<p>5. Asegurese de tener Node.js instalado</p>

<p>6. Abra la carpeta administrador-tareas-ui el cual es el proyecto Front End</p>

<p>7. Ejecute el comando npm install para instalar los paquetes del proyecto</p>

```
npm install
```

<p>8. Para correr el proyecto ejecute</p>

```
npm run dev
```

<p>9. Si necesita cambiar el puerto del localhost para conectarse al API - Ver el archivo TareaProvider.jsx</p>

  
  
<h2>💻 Construido con</h2>

Tecnologías usadas en el proyecto:

*   SQL
*   SQL Server
*   Node.js
*   Vite
*   React
*   .NET
*   C#

<h2>Correciones pendientes</h2>

* Notas: Hice la tabla prevista para agregar notas por cada una de las tareas, sin embargo la idea que tenía en mente, me llevaría más tiempo.
* Las validaciones las decidí realizar en el Front y estas podrían mejorarse
* Algunos de los componentes repiten código, por lo que podrían refactorizarse
* El filtro tiene un pequeño detalle que cuando ninguno de los filtros coincide muestra todo, además tuve un detalle con los formatos de las fechas en donde una está como yyyy-MM-dd y la otra como dd-MM-yyyy
  por lo que eso no me dio tiempo de resolverlo.







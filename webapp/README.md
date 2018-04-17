# webapp-entrenamiento-jcardenas v1.0.0




## PRE-REQUISITOS
=
Requisitos previos que se deben tomar en cuenta antes de realizar la instalación.

## CONFIGURACIÓN INICIAL / INSTALACIÓN
=

Pasos a seguir para poner en funcionamiento el repositorio.

## USO
=
Al instalar el template encontrará la estructura de directorios que encontrará es:

```bash
   |
   |--/docs--Directorio de documentación
   |--/src--Directorio código fuente
      |
      |--app--Contenido de aplicación
         |
         |--/assets--Directorio de recursos de aplicación
            |
            |--/data--Directorio para data estática, por defecto posee el archivo modules.json
            |--/images--Directorio para imagenes del sistema
            |--/locales--Directorio para archivo de internacionalización
            |  |-locales.json--Archivo de internacionalización
            |  
            |--/styles--Directorio para estilos comunes
               |-main-style.css--Hoja css con propiedades generales del body(splash screen etc...)
               |-app-teme.html--Módulo de estilos con propiedades css a usar en todo el proyecto
         |--/behaviors--Directorio de comportamientos heredables
         |--/components--Directorio de componentes reusables
         |--/config--Directorio de configuraciones
         |--/elements--Directorio de elementos de aplicación
         |--/layouts--Directorio de layouts o corazas de aplicación        
         |--/main-element--Elemento principal de la aplicación, incluye el tablayout dentro de si
      |-bower.json--Archivo bower de dependencias web
      |-gulpfile.js--Archivo que genera el build
      |-index.html--Punto de entrada de la aplicación
      |-manifest.json--Manifiesto html5
      |-package.json---Archivo npm para dependencias de desarrollo
      |-polymer.json--Archivo para guiar al gulpfile a realizar el polymer build
      |-polymerSetup.js--Archivo usado para incorporar los polifyll de polymer en plataformas no soportadas
      |-service-worker.js--Archivo de service worker(Se genera con el build)
      |-sw-precache-config.js--Archivo con la configuración inicial del service worker
   |-.gitignore
   |-README.md--Este archivo
```



### COLABORACIONES
=
Pasos a seguir para realizar modificaciones a la aplicación.

### AUTORES
=
  <  >

### COPYRIGHT
=
(c) SIGIS Soluciones Integrales GIS C.A
[preview2]: docs/flowchart2.png
# BASE DE DATOS SIGIS

* [Descripción](#descripci%C3%B3n)
* [¿Por qué?](#por-qu%C3%A9-)
* [Estructura](#estructura)
    * [Deploy](#deploy)
    * [Revert](#revert)
    * [Verify](#verify)
    * [Data](#data)
*  [Control de cambios](#control-de-cambios)
*  [Opciones y configuración](#opciones-y-configuraci%C3%B3n)
    *  [Ejemplos](#ejemplos-configuraci%C3%B3n)
*  [Requerimientos](#requerimientos)
*  [Instalación](#instalaci%C3%B3n)
*  [Build](#build)
    *  [Run Build](#run-build)
*  [Package](#package)


## Descripción

Este proyecto permite administrar la construcción, mantimiento y control de versión de la bases de datos de un proyecto de software. 

El objetivo del mismo es representar la base de datos física en un esquema  fácil de construir y mantener a lo largo del tiempo, ofreciendo herramientas para la publicación de cambios, control de versión y planes de migración. 


Entre otras cosas permite corregir errores y adaptar los datos a medida que cambian los requisitos y esto,  es parte esencial de la evolución del software, especialmente en entornos ágiles.

### ¿Por qué ?

Realizar cambios a una base de datos de producción siempre es un riesgo, mientras que las bases de datos de desarrollo/pruebas tienden a ser más manipulables. Los datos en ellos se entienden mejor o, si todo falla, se puede revertir los cambios. Las bases de datos de producción son generalmente enormes, viejas y llenas de sorpresas las cuales pueden provenir de muchas fuentes entre ellas hay dos(2) importantes de resaltar:

* Datos dañados que fueron escritos por las versiones viejas del software y no fueron limpiados correctamente.

* Dependencias implícitas en los datos que nadie conoce más que las personas que cambian directamente la base de datos sin utilizar las herramientas designadas para ello.

Por estas razones, el proceso de actualización de una base de datos necesita un alto nivel de disciplina, pruebas exhaustivas y estrategias de control de cambios.

Administrar la base de datos como un proyecto usando este conjunto de herramientas y convenciones le permitirá agrupar y empaquetar los script con los cambios que se han de subir a producción ó QA, de ta forma que podrá verificar si sus cambios surtieron efecto y de lo contrario hacer un reverso de los mismos.


### Estructura

Este proyecto cuenta con una estructura que permite aplicar y probar los cambios en base de datos, generando un sistema de control de cambios. Adicionalmente permite verificar si los cambios fueron exitosos o revezar en caso contrario.

Para ello contará con la siguiente extructura:

- **DEPLOY** En este directorio podrá mantener los script sql con los cmabios que desea aplicar a la base de datos. Ejemplo:
```sql
   CREATE TABLE public.usuarios (
   );
```	
Puede leer maś sobre la estructura del deploy en el siguiente enlace [DEPLOY](src/deploy/DEPLOY.md).


- **REVERT** La carpeta revert debe contener  los script sql que permitan reversar  los cambios aplicados a la base de datos. Ejemplo:
```sql
   DROP TABLE IF EXISTS public.usuarios;
```
Para mayor información leea las especificaciones del [REVERT](src/revert/REVERT.md).


- **VERIFY** en el mismo podrá inlcuir las sentencias sql que permitan verificar si los cambios surtiron efecto. Ejemplo
```sql
   SELECT * FROM public.usuarios;
```
Para ver ejemplos siga el enlace [VERIFY](src/verify/VERIFY.md).

- **DATA** En dicha ccarpeta  podrá inlcuir las sentencias sql que permitan la inserción de datos en la tabla correspondiente ejemplo:
```sql
   INSERT INTO public.usuarios (log_usu, pass_usu) VALUES('demo', 'demo');
```
Para ver más sobre la sección de data visite [DATA](src/data/DATA.md).
  
> **Note:**

> - La normativa ha seguir es replicar la estructura de base de datos en carpetas u archios .sql según corresponda.

> - Debe generar una carpeta por cada esquema en el que desea realizar modificaciones.

> - Los scripts sql deben estar ubicados en una carpeta según el tipo de elemento ha crear: por ejemplo: Si es una funciónn, el sql debe ir en su respectivo esquema dentro de la carpeta functions.

> - En caso de necesitar un script de inserción de data debe crear un script sql con el nombre de la tabla en su respectiva ruta y alli agregar los inserts al final del script sql.


### Control de cambios

Para controlar los cambios ademas de tener nuestro proyecto en un repositorio de control de versión que, bien puede ser [Subversion](https://es.wikipedia.org/wiki/Subversion_(software)) o [Git](https://git-scm.com/). Tambien tendremos un flujo de control para la publicación de cambios a producción o ámbientes de prueba/QA.

La recomendación es usar [Git](https://git-scm.com/) con el gestor de proyecto [GitLab](https://about.gitlab.com/). Ya que con estas herramientas tenemos la posibilidad de automatizar la ejecución de ciertas rutinas que permiten agilizar el proceso de pruebas y control de nuestros cambios en base de datos. Adicionalmente podemos implementar code-review usando la figura del merge request. Sin embargo, este es un tema para ondar más adelante. Por ahora, vamos a enfocarnos en el flujo que nos permite controlar los cambios que publicamos. A continuación mostramos un diagrama que muestra pára que sirve nuestros scripts de deploy, revert y verify:


![alt text][preview2]


>**NOTAS**
>
> La razón por la que al ocurrir un error en el deploy se notifica y se termina el flujo, es porque este script corre dentro de un bloque BEGIN y COMMINT. Si ocurre algún error ningún cambio es plasmado en la base de datos.
>
>Una vez ejecutado exitosamente el DEPLOY es momento de comprobar si los cambios surtieron efecto, por ende, se corre el verify. Si éste da error, es porque algo no anda bien y se corre inmediatamente el revert para restaurar los cambios.
>
> Este flujo nos pemite controlar de forma más precisa los que publicamos, es lógico que debe haber un nivel de disciplina en la creación y mantenimiento de los script para que los mismos cumplan correctamente su labor. Por esta razón es importante usar un sistema de control de verisón que permite la ejecución de code-review. 

### Opciones y configuración

Todas las opciones y configuración se especifican en el archivo "config.json." En el puede definir los siguientes parámetros de comportamiento:


| **Parámetro** | **Descripción** |
| --------- | ----------- |
| buildPath | Indica la carpeta en donde se generará los resultados, es decir , los script de deploy, revert y verify. |
| templates | Define los scripts por defecto a ser incluidos antes o despues de todo el conjunto definido en include. Dichos script contiene las funcionalidades para indicar en que versión se encuentra actualmente los cambios de base de datos. Puede indicar una ruta y dentro de ella  los headeres y footers para cada ámbito ó indicar por separado, Puede ver más en los ejemplos de abajo.|
| include.data | En caso de quere indicar un orden específico en la inclución de script sql de data, puede hacerlo en este parámetro que no es mas que un array con la ruta relativa a los scripts o conjuntos a incluir y en el orden indicado. Debe asegurarse de definir bien la ruta del script si la misma no existe no será incluida dentro del script principal de data.|
| include.scripts | En caso de quere indicar un orden específico en la inclución de script sql, puede hacerlo en este parámetro que no es mas que un array con la ruta relativa al script o conjuntos de script a incluir y en el orden indicado. Debe asegurarse de definir bien la ruta del script, ya que si la misma no existe no será incluida dentro del script principal de cambios de estructura.|
| target | deinfe los datos de conexión a la base de datos en la que se aplicaran los cambios una vez construido el build. |

#### Ejemplos  configuración

* Opción 1

```json
{
	"buildPath": "build",
	
	"include": {
	    "data" : [
	        "**/*.sql",
	    ],
	    "scripts" : [
	        "public/public.usuarios.sql",
		    "general/**/*.sql"
	    ]
	},
	
	"target": {
		"host": "localhost",
		"port": "5432",
		"database": "my_db",
		"user": "foo",
		"password": "secret"
	}
}
```
> **NOTA** Note que en el campo `include` debe indicar la ruta relativa de los scripts que desea procesar. En caso de querer incluir varios puede usar el patrón **/*.sql que incluirá todos los scripts que sencuentren en una carpeta de forma recursiva.

* Opción 2
 
```json
{
	"buildPath": "build",

	"templates": {
		"deploy": {
			"headers": "defaultscripts/deploy/headers.sql",
			"footer": "defaultscripts/deploy/footer.sql"
		},
		"revert": {
			"headers": "defaultscripts/revert/headers.sql",
			"footer": "defaultscripts/revert/footer.sql"
		},
		"verify": {
			"headers": "defaultscripts/verify/headers.sql",
			"footer": "defaultscripts/verify/footer.sql"
		}
	},
	"include": {
	    "data" : [
	        "**/*.sql",
	    ],
	    "scripts" : [
	        "**/*.sql",
	    ]
	},
	"target": {
		"host": "localhost",
		"port": "5432",
		"database": "my_db",
		"user": "foo",
		"password": "secret"
	}
}
``` 

### Requerimientos:


* gulp
* svn
* node
* npm

### Instalación	
 
Debe ubicarse en la raíz del proyecto y ejecutar:

```bash 
$ npm install
```	
### Build:

```bash
$ gulp build
``` 	

Esto creará una carpeta en build que contiene los siguientes archivos:
```
    ./
    ├── config.json   //configuración de la base de datos
    ├── deploy.sql    //cambios para aplicar en la base de datos
    ├── revert.sql    //sentencias sql que permiten revertir los cambios aplicados por el deploy
    ├── run.sh        //bash script que permite correr el deploy
    └── verify.sql    // Sentencias sql que permiten validar si los cambios del deploy surtieron efecto.
``` 	

Puede indica el nombre del build y el autor por parámetros:
```bash
$ gulp build --name mybuild  --author myuser
``` 	


## Run Build
En el config debe indicar la configuración de la base de datos en donde correrá los cambios, entonces podrá ejecutar dicho build:

```bash
    $ sh run.sh
``` 	

Esto correrá el flujo completo de cambios (deploy-> verify-> revert) en la base de datos indicada. Posteriormente podrá ejecutar los ambitos específicos:

* **deploy** (default) ejcuta el flujo completo.

    ```bash
        $ sh run.sh deploy
    ``` 	
* **verify** Solamente verifica que los cambios de esta versión existan en base de datos:

    ```bash
        $ sh run.sh verify
    ``` 	
* **revert** Eliminará los cambios de esta versión. 

    ```bash
        $ sh run.sh revert
    ``` 	
    * `¡¡¡PRECAUCIÓN!!!` Debe ser muy cuidadoso ya que pudiera haber perdida de datos si ejecuta el revert habiendo versiones superiores en base de datos.    

    
    * Necesita tener postgresql-client
        * [https://help.ubuntu.com/community/PostgreSQL](https://help.ubuntu.com/community/PostgreSQL).


## Package
Una vez ejecutado y probado sus cambios usted podrá empaquetar su build con la siguiente línea de comando:

```bash
$ gulp package --target 1.0.0
``` 	
En donde el parámetro target define la carpeta del build que desea empaquetar. Al terminar  la tarea de empaquetado tendrá como resultado un archivo tar.gz del build indicado.

**`CUIDADO`** El package crear un tar.gz pero elimina la carpeta origen.

        
>**NOTA**
>
> Tambien puede hacer uso de los generadores de base de datos para agilizar el proceso de creacion y mantinimiento de su proyecto de base de datos. Para mayor información visitar:
>
> * [http://git.sigis.com.ve/librerias-desarrollo/generator-sigis-db](http://git.sigis.com.ve/librerias-desarrollo/generator-sigis-db)

Para la definición de este proyecto se usó como referencia los siguientes:

* [sqitch](https://github.com/theory/sqitch)
* [pgdiff](https://github.com/joncrlsn/pgdiff) 



### Autores

rbruno <robert.bruno@sigis.com.ve>.

### Copyright
(c) SIGIS Soluciones Integrales GIS, C.A.
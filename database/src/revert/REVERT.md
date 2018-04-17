## REVERT

Consiste en un conjunto de script que se desplegaran en la base de datos para revertir los cambios ejecutados por el DEPLOY.

Todos los scripts que genere deben cumplir las notmativas internas de SIGIS. Para mayor información visitar:

- [Normativas de desarrollo](http://git.sigis.com.ve/dprato/estandares-desarrollo)

Adicionalmente deberá seguir los siguientes lineamiento para mantenimiento de los script de base de datos.

### Estrutura

Por cada script en DEPLOY usted tendrá que crear una estructura igual, con la diferencia que el contenido del script debe ser la operación que permitar revertir el cambio ejecutado por  los scripts de DEPLOY. 

Basado en el ejemplo del DEPLOY en el que se crear una tabla llamada usuarios en el esquema público de postgresql, en el REVERT deberá crear una carpeta para el esquema y un archivo o script sql para reversar la creación de la tabla. la estrutura sería algo así:

 
```
   |
   |--/REVERT
   |--/public--Directorio que corresponde al esquema público.
      |
      |-- public.usuarios.sql-- script de eliminacion de la tabla usuarios

```

En el script debería de haber algo como esto:
```sql
   DROP TABLE IF EXISTS public.usuarios;
```
### ORDEN

Es importante que revise el orden de las sentencias sql en cada script, es probable que requiera definir cada sentencia sql en el rden inverso al deploy. Ejmplo: Si el deploy usted definio un schema, postriormente una tabla y posteriomente las claves primarias deberá definir las sentencias del revert en el orden inverso al del deploy.

- **DEPLOY**

```sql
   CREATE SCHEMA IF NOT EXISTS demo;
   
   CREATE TABLE IF NOT EXISTS demo.usuarios(
        id_usu seiral not null;
   );
   
   CONSTRAINT demo_usuarios_pk PRIMARY KEY(id_usu);
```

- **RVERT**

```sql
   
   ALTER TABLE demo.usuarios DROP CONSTRAINT demo_usuarios_pk;
   
   DROP TABLE IF EXISTS demo.usuarios;
   
   DROP SCHEMA IF EXISTS demo;
```

`IMPORTANTE`
 Viendo el ejemplo anterior es bastante claro que pudieramos simplemente eliminar el schema en cascada. Si embargo, esto trae como consecuencia un alto riesgo de perdida de información por ende la recomendación es usar el modo RESTRICT al eliminar un schema.
 
```sql
   DROP SCHEMA IF EXISTS demo RESTRICT;
```

De esta forma si quedó algún elemento dentro del schema se arrojará un error. Para evitar que el revert se detenga producto de una exception al eliminar el schema con elementos dentro de el de los cuales no tenemos control ni conocimiento podemos simplemente envolver la sentencia dentro de un bloque de código que en caso de fallar permita coninuar con el resto de las instrucciones.

```sql
   DO $$ 
    DECLARE 
	MSG  VARCHAR;
    BEGIN
	
        BEGIN
			DROP SCHEMA IF EXISTS demo RESTRICT;
		EXCEPTION
			WHEN others THEN  GET STACKED DIAGNOSTICS MSG = MESSAGE_TEXT; 
			RAISE NOTICE '%s', MSG;
		END;
    END;
$$;
   
```

>**NOTA**
>
> - Tambien puede hacer uso de los generadores de base de datos para agilizar la creación del/los scripts. Para mayor información visitar:
>
>    - [http://git.sigis.com.ve/rbruno/generator-sigis-db](http://git.sigis.com.ve/rbruno/generator-sigis-db)
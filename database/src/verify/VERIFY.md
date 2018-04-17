## VERIFY

Consiste en un conjunto de script que se desplegaran en la base de datos para VERIFICAR si los cambios ejecutados por el DEPLOY surtieron efecto.

Todos los scripts que genere deben cumplir las notmativas internas de SIGIS. Para mayor información visitar:

- [Normativas de desarrollo](http://git.sigis.com.ve/gdt/estandares-desarrollo)

Adicionalmente deberá seguir los siguientes lineamiento para mantenimiento de los script de base de datos.

### Estructura

Por cada script en DEPLOY usted tendrá que crear una estructura igual, con la diferencia que el contenido del script debe ser la operación que permitar verificar si el cambio ejecutado por los scripts de DEPLOY ha surtido efecto. 

Basado en el ejemplo del DEPLOY en el que se crear una tabla llamada usuarios en el esquema público de postgresql, en el VERIFY deberá crear una carpeta para el esquema y un archivo o script sql para verificar la creación de la tabla. la estrutura sería algo así:

 
```
   |
   |--/VERIFY
   |--/public--Directorio que corresponde al esquema público.
      |
      |-- public.usuarios.sql-- script de verificación de la tabla usuarios

```

En el script debería de haber algo como esto:
```sql
   SELECT * FROM public.usuarios;
```

### Ejemplos

El verify solo tiene como finalidad la comprobación del despliegue de cambios.  El cual debería hacerse sin tener en cuenta los datos y debería lanzar un error si el despliegue no tuvo éxito. 

Tomando en cuentas estos principios, no requerimos entonces de muchas cosas. Sin embargo, en algunos casos específicos de postgresql hay elementos que son un tanto complicados para comprobar su existencia, se suguiere tomar en cuenta las recomendaciones del proyecto  [sqitch](https://github.com/theory/sqitch/blob/master/lib/sqitchtutorial.pod) para los siguientes casos:


#### Schemas 

Podemos aprovechar las funciones de consulta de privilegios de acceso "has_schema_privilege() ". Estas funciones lanzan convenientemente excepciones si el objeto investigado no existe. En este caso si el schema existe la sentencia correrá en caso contrario lanzará un exception frenando el despliegue (DEPLOY).

    ```sql
        SELECT pg_catalog.has_schema_privilege('partitioning_tools', 'usage');
    ```

#### Functions

Si bien podemos usar exactamente el caso anterior, también pudiéramos simplemente correr la función en un bloque de código que compruebe si al pasarle los parámetros ideales la misma retorna el resultado esperado. Sin embargo, esta última  es más una prueba unitaria que una verificación de existencia. Simplemente quedaría al criterio del desarrollador. Lo único que se debe tomar en cuenta es que si la verificación falla debe arrojar un exception.
* **CASO I:**

    ```sql
       SELECT has_function_privilege('flipr.insert_user(text, text)', 'execute');
    ```
    
    ```sql
       SELECT has_function_privilege('funciones.cron_notificaciones()', 'execute');
    ```

* **CASO II:**
    ```sql
       DO $$DECLARE
        RESULT BOOLEAN :=FALSE;
        BEGIN
        
            SELECT INTO RESULT funciones.escape('test')  = 'test';
    
            IF  (RESULT = FALSE) THEN
            RAISE EXCEPTION 'Verify  funciones.escape return %', RESULT USING HINT = 'Please check!';
            END IF;
        END;
    $$
    ```    

#### Triggers

En el caso del  trigger es un poco más complicado. Sin embargo, tenemos dos(2) opciones que nos pueden ayudar a verificar el funcionamiento del trigger:

* **CASO I:** Verificar que el trigger existe y adicionalmente que esta asociado a la funcionalidad especifica que queremos ejecutar.
    ```sql
        DO $$DECLARE
            RESULT  INTEGER;
            BEGIN
            
                SELECT INTO RESULT COUNT(*)
              FROM information_schema.triggers
             WHERE
               event_object_table = 'reportes'
               AND trigger_name='t_bautizar_informacion_geografica'
               AND action_statement ilike '%bautizar_informacion_geografica%'
               AND event_object_schema='public'
               AND trigger_schema NOT IN
                   ('pg_catalog', 'information_schema');
    
            IF (RESULT = 0) THEN
                RAISE EXCEPTION 'Verify trigger bautizar_informacion_geografica' USING HINT = 'Please check trigger!';
            END IF;
           
        END;
    $$
    ```
>**NOTA**
>
> Debe modificar `event_object_table` con el nombre de la tabla a la cual está asignada el trigger,
> `trigger_name` es el nombre del trigegr
> `action_statement` La acción que se ejcuta
> `event_object_schema` el esquema de la tabla
> 

* **CASO II:**  Ejecutar las sentencias sql necesarias para que dicho trigger se dispare (INSERT, UPADTE, etc...) en un bloque de código controlado.

```sql
    DO $$DECLARE
        RESULT  RECORD;
    BEGIN
   
        INSERT INTO dummy  (a) VALUES ('test') RETURNING * INTO RESULT;

        IF (RESULT.fec_reg IS NULL) THEN
            RAISE EXCEPTION 'Verify trigger for dummy % ', RESULT.fec_reg USING HINT = 'Please check trigger!';
        END IF;
    END;
    $$   
```        

>**NOTA**
>
> En este caso de ejemplo  asumimos que el trigger asigna un valor al campo  "fec_reg". En caso de que el valor sea nulo quiere decir que el trigger no se ejecutó.
> Es importante indicar que cualquier sentencia que corra en el verify es completamente atómica, comienza con un BEGIN  pero termina en un ROOLBACK. Esto quiere decir que, ningún cambio será persistente al terminar de correr el script.


Cualquier otro caso que usted considere puede hacer uso del bloque DO de postgresql para mayor información sobre el mismo visite:

* [https://www.postgresql.org/docs/9.0/static/sql-do.html](https://www.postgresql.org/docs/9.0/static/sql-do.html)



>
> Tambien puede hacer uso de los generadores de base de datos para agilizar la creación del/los scripts. Para mayor información visitar:
>
> [http://git.sigis.com.ve/rbruno/generator-sigis-db](http://git.sigis.com.ve/rbruno/generator-sigis-db)

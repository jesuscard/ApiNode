## DEPLOY

Consiste en un conjunto de script que se desplegaran en la base de datos, es aqui donde debe consentran todos los cambios ha publicar.
Todos los scripts que se gener deben cumplir las notmativas internas de SIGIS. Para mayor información visitar:

- [Normativas de desarrollo](http://git.sigis.com.ve/dprato/estandares-desarrollo)

Adicionalmente deberá seguir los siguientes lineamiento para mantenimiento de los script de base de datos.

### Estrutura

Por cada schema de base datos usted tendrá un esquema en la carpeta DEPLOY. ej.:

Si desea crear una tabla para almacenar usuarios en el esquema público de postgresql, debera crear una carpeta para el esquema y un script sql para la creación de la tabla. la estrutura sería algo así:

 
```
   |
   |--/DEPLOY
   |--/public--Directorio que corresponde al esquema público.
      |
      |-- public.usuarios.sql-- script de creación de la tabla usuarios

```

En el script debería de haber algo como esto:
```sql
   CREATE TABLE public.usuarios (
   );
```

>**NOTA**
>
> Tambien puede hacer uso de los generadores de base de datos para agilizar la creación del/los scripts. Para mayor información visitar:
>
> [http://git.sigis.com.ve/rbruno/generator-sigis-db](http://git.sigis.com.ve/rbruno/generator-sigis-db)
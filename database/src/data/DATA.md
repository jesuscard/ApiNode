## DATA

Consiste en un conjunto de script que se desplegaran en la base de datos, es aqui donde debe consentran todos los INSERT.

Todos los scripts que se generen deben cumplir las notmativas internas de SIGIS. Para mayor información visitar:

- [Normativas de desarrollo](http://git.sigis.com.ve/dprato/estandares-desarrollo)

Adicionalmente deberá seguir los siguientes lineamiento para mantenimiento de los script de base de datos.

### Estrutura

Por cada schema de base datos usted tendrá un esquema en la carpeta DATA. ej.:

Si desea crear INSERT en una tabla para almacenar usuarios en el esquema público de postgresql, debera crear una carpeta para el esquema y un script sql para la inserción de data en la tabla usuarios. la estrutura sería algo así:

 
```
   |
   |--/DATA
   |--/public--Directorio que corresponde al esquema público.
      |
      |-- public.usuarios.sql-- script de INSERT de la tabla usuarios

```

En el script debería de haber algo como esto:
```sql
   INSERT INTO public.usuarios (log_usu, pass_usu) VALUES('demo','demo');
```


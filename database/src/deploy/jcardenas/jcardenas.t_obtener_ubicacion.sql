
CREATE OR REPLACE FUNCTION jcardenas.t_obtener_ubicacion()
RETURNS TRIGGER AS
 $BODY$
 DECLARE
 	datos_parroquia jcardenas.t_ubicacion; 	
BEGIN
	SELECT INTO
		datos_parroquia codigo_estado, codigo_municipio, codigo_parroquia
	FROM
		jcardenas.f_busqueda_geografica(ST_x(NEW.coo_pun::geometry), ST_y(NEW.coo_pun::geometry));

	NEW.cod_edo := datos_parroquia.codigo_estado;
	NEW.cod_mun := datos_parroquia.codigo_municipio;
	New.cod_par := datos_parroquia.codigo_parroquia;

	RETURN NEW;
END;
$$ LANGUAGE plpgsql VOLATILE;

COMMENT ON FUNCTION jcardenas.t_obtener_ubicacion(i integer) IS '

Ejemplo de llamada:

	SELECT jcardenas.t_obtener_ubicacion(1);

Autor: 
Fecha: Thu Nov 23 2017 05:25:02 GMT-0400 (BOT)
';

CREATE TRIGGER t_obtener_ubicacion
BEFORE INSERT OR UPDATE
ON jcardenas.puntos_referencia
FOR EACH ROW
EXECUTE PROCEDURE jcardenas.t_obtener_ubicacion();

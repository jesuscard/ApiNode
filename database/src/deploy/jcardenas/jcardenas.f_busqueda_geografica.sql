CREATE TYPE jcardenas.t_ubicacion AS (
	codigo_estado varchar(2),
	codigo_municipio varchar(3), 
	codigo_parroquia varchar(3)
); 

CREATE OR REPLACE FUNCTION jcardenas.f_busqueda_geografica(
		x double precision,
		y double precision) 
	RETURNS jcardenas.t_ubicacion AS 
	$BODY$
	DECLARE	
	--Declaracion de variables a utilizar en la funcion
	salida jcardenas.t_ubicacion;
	BEGIN
		
		EXECUTE	'SELECT 
		  		p.cod_edo,
		  		p.cod_mun,
		  		p.cod_par
		  	FROM 
		  		jcardenas.parroquias as p
		  	WHERE
		  		ST_Intersects(p.coo_par,ST_GeographyFromText(''SRID=4326;POINT('|| $1 ||' '|| $2 ||')'')) LIMIT 1'
	  INTO
				salida;
		--retorno de datos para insercion
		RETURN salida;
	END;
$$ LANGUAGE plpgsql  VOLATILE;

COMMENT ON FUNCTION jcardenas.f_busqueda_geografica(double precision) IS '

	Obtiene los códigos de estado, municipio y parroquias para registrarlo en la tabla jcardenas.puntosrefencia;

Autor: Jesus Cardenas
Fecha: Wed Nov 22 2017 06:13:33 GMT-0400 (BOT)
';

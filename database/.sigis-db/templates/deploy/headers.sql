

CREATE SCHEMA IF NOT EXISTS changelog;

CREATE TABLE IF NOT EXISTS changelog.versions (
	id_cont_ver SERIAL PRIMARY KEY NOT NULL, 
	num_ver CHARACTER VARYING NOT NULL, 
	usr_nam CHARACTER VARYING NOT NULL,
	fec_reg TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

DO $$ 
    DECLARE 
	MSG  VARCHAR;
    BEGIN
	
        BEGIN
			ALTER TABLE changelog.versions ADD COLUMN dmp_bck TEXT;
			COMMENT ON COLUMN changelog.versions.dmp_bck IS 'Dump de la base de datos después de correr el script';
			
			ALTER TABLE changelog.versions ADD COLUMN tar_gz bytea;
			COMMENT ON COLUMN changelog.versions.tar_gz	 IS 'Almacena el package (tar.gz) que contiene todos los scripts ejecutados para esta versión';
		EXCEPTION
			WHEN others THEN  GET STACKED DIAGNOSTICS MSG = MESSAGE_TEXT; 
			RAISE NOTICE '%s', MSG;
		END;
    END;
$$;


COMMENT ON COLUMN changelog.versions.num_ver IS 'Número de la version';
COMMENT ON COLUMN changelog.versions.usr_nam IS 'Nombre del usuario que creó el script';
COMMENT ON COLUMN changelog.versions.fec_reg IS 'Fecha de registro';


CREATE OR REPLACE FUNCTION changelog.verify_version(varchar)
  RETURNS integer AS
$BODY$
DECLARE
	_num_ver	ALIAS FOR $1;
	_usr_nam	ALIAS FOR $1;
	_VERSION  RECORD;
BEGIN

	SELECT * INTO _VERSION FROM changelog.versions WHERE num_ver=_num_ver;
	IF NOT FOUND THEN
    	RAISE EXCEPTION 'version % NOT exists', _VERSION.num_ver;
	END IF;

	return 0;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

COMMENT ON FUNCTION changelog.verify_version(varchar) IS 
$COMMENT$
/**
Valida que exista la versión indicada

Ejemplo de llamada:

SELECT changelog.verify_version(''1.0.0'');

Autor: Robert Bruno
Fecha: 04/05/2017
*/
$COMMENT$;


CREATE OR REPLACE FUNCTION changelog.deploy_version(varchar)
  RETURNS integer AS
$BODY$
DECLARE
	_num_ver	ALIAS FOR $1;
	_VERSION  RECORD;
BEGIN

	SELECT * INTO _VERSION FROM changelog.versions WHERE num_ver=_num_ver;
	IF FOUND THEN
    	RAISE EXCEPTION 'version % already exists', _VERSION.num_ver;
	END IF;

	return 0;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

COMMENT ON FUNCTION changelog.deploy_version(varchar) IS 
$COMMENT$
/**
Valida la versión de los cambios en base de datos a ejecutar

Ejemplo de llamada:

SELECT changelog.deploy_version(''1.0.0'');

Autor: Robert Bruno
Fecha: 29/11/2016
*/
$COMMENT$;

BEGIN;

SELECT changelog.deploy_version('<%= version %>');
INSERT INTO changelog.versions (num_ver,usr_nam) VALUES ('<%= version %>','<%= user %>');


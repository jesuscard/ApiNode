
CREATE OR REPLACE FUNCTION jcardenas.f_inserta_punto(nom_pun_ref varchar,
		longitud double precision,
		latitud double precision) 
RETURNS void AS $$
BEGIN
	INSERT INTO jcardenas.puntos_referencia(nom_pun_ref, coo_pun)
    VALUES(nom_pun_ref, POINT(longitud,latitud));
END;
$$ LANGUAGE plpgsql  VOLATILE;


COMMENT ON FUNCTION jcardenas.f_inserta_punto(i integer) IS '

Ejemplo de llamada:

	SELECT jcardenas.f_inserta_punto(1);

Autor: 
Fecha: Mon Dec 04 2017 07:18:52 GMT-0400 (BOT)
';

CREATE TABLE  IF NOT EXISTS jcardenas.puntos_referencia (


);

COMMENT ON TABLE jcardenas.puntos_referencia IS 'jcardenas.puntosreferencia';

ALTER TABLE jcardenas.puntos_referencia ADD COLUMN  cod_pun_ref serial;

COMMENT ON COLUMN jcardenas.puntos_referencia.cod_pun_ref IS 'cod_pun_ref is a serial';

ALTER TABLE jcardenas.puntos_referencia ADD COLUMN  nom_pun_ref varchar(255) NOT NULL;

COMMENT ON COLUMN jcardenas.puntos_referencia.nom_pun_ref IS 'nom_pun_ref is a varchar(255) NOT NULL';

ALTER TABLE jcardenas.puntos_referencia ADD COLUMN  cod_edo varchar(2);

COMMENT ON COLUMN jcardenas.puntos_referencia.cod_edo IS 'cod_edo is a varchar(2)';

ALTER TABLE jcardenas.puntos_referencia ADD COLUMN  cod_mun varchar(3);

COMMENT ON COLUMN jcardenas.puntos_referencia.cod_mun IS 'cod_mun is a varchar(3)';

ALTER TABLE jcardenas.puntos_referencia ADD COLUMN  cod_par varchar(3);

COMMENT ON COLUMN jcardenas.puntos_referencia.cod_par IS 'cod_par is a varchar(3)';

ALTER TABLE jcardenas.puntos_referencia ADD COLUMN  coo_pun point;

COMMENT ON COLUMN jcardenas.puntos_referencia.coo_pun IS 'coo_pun is a point';

ALTER TABLE jcardenas.puntos_referencia ADD PRIMARY KEY(cod_pun_ref);

ALTER TABLE jcardenas.puntos_referencia ADD FOREIGN KEY(cod_edo,cod_mun,cod_par) REFERENCES jcardenas.parroquias(cod_edo,cod_mun,cod_par);

ALTER TABLE jcardenas.puntos_referencia ALTER cod_pun_ref SET DEFAULT nextval('cod_pun_ref_seq');

CREATE INDEX nom_pun_ref_ind ON jcardenas.puntos_referencia(nom_pun_ref);







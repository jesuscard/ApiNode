CREATE TABLE  IF NOT EXISTS jcardenas.estados (

);

COMMENT ON TABLE jcardenas.estados IS 'jcardenas.estados';

ALTER TABLE jcardenas.estados ADD COLUMN  cod_edo varchar(2) NOT NULL;

COMMENT ON COLUMN jcardenas.estados.cod_edo IS 'Código del estado';

ALTER TABLE jcardenas.estados ADD COLUMN  nom_edo varchar(100) NOT NULL;

COMMENT ON COLUMN jcardenas.estados.nom_edo IS 'Nombre del estado';

ALTER TABLE jcardenas.estados ADD PRIMARY KEY(cod_edo);

CREATE INDEX nom_edo_ind ON jcardenas.estados(nom_edo);



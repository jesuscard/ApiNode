CREATE TABLE  IF NOT EXISTS jcardenas.parroquias (

);

COMMENT ON TABLE jcardenas.parroquias IS 'jcardenas.parroquias';

ALTER TABLE jcardenas.parroquias ADD COLUMN  cod_edo varchar(2) NOT NULL;

COMMENT ON COLUMN jcardenas.parroquias.cod_edo IS 'cod_edo is a varchar(2) NOT NULL';

ALTER TABLE jcardenas.parroquias ADD COLUMN  cod_mun varchar(3) NOT NULL;

COMMENT ON COLUMN jcardenas.parroquias.cod_mun IS 'cod_mun is a varchar(3) NOT NULL';

ALTER TABLE jcardenas.parroquias ADD COLUMN  cod_par varchar(3) NOT NULL;

COMMENT ON COLUMN jcardenas.parroquias.cod_par IS 'cod_par is a varchar(3) NOT NULL';

ALTER TABLE jcardenas.parroquias ADD COLUMN  nom_par varchar(255) NOT NULL;

COMMENT ON COLUMN jcardenas.parroquias.nom_par IS 'nom_par is a varchar(255) NOT NULL';

ALTER TABLE jcardenas.parroquias ADD COLUMN  coo_par polygon;

COMMENT ON COLUMN jcardenas.parroquias.coo_par IS 'coo_par is a polygon';

ALTER TABLE jcardenas.parroquias ADD PRIMARY KEY(cod_edo,cod_mun,cod_par);

ALTER TABLE jcardenas.parroquias ADD FOREIGN KEY(cod_edo,cod_mun) REFERENCES jcardenas.municipios(cod_edo,cod_mun);

CREATE INDEX nom_par_ind ON jcardenas.parroquias(nom_par);





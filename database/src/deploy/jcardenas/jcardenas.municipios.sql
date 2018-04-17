CREATE TABLE  IF NOT EXISTS jcardenas.municipios (

);

COMMENT ON TABLE jcardenas.municipios IS 'jcardenas.municipios';

ALTER TABLE jcardenas.municipios ADD COLUMN  cod_edo varchar(2) NOT NULL;

COMMENT ON COLUMN jcardenas.municipios.cod_edo IS 'Código del estado';

ALTER TABLE jcardenas.municipios ADD COLUMN  cod_mun varchar(3) NOT NULL;

COMMENT ON COLUMN jcardenas.municipios.cod_mun IS 'Código del municipio, es un código compuesto entre cod_edo y cod_mun';

ALTER TABLE jcardenas.municipios ADD COLUMN  nom_mun varchar(255) NOT NULL;

COMMENT ON COLUMN jcardenas.municipios.nom_mun IS 'Nombre del municipio';

ALTER TABLE jcardenas.municipios ADD PRIMARY KEY(cod_mun,cod_mun);

ALTER TABLE jcardenas.municipios ADD FOREIGN KEY(cod_edo) REFERENCES jcardenas.estados(cod_edo);

CREATE INDEX nom_mun_ind ON jcardenas.municipios(nom_mun);

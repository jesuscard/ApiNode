CREATE TABLE  IF NOT EXISTS jcardenas.usuarios (

);

COMMENT ON TABLE jcardenas.usuarios IS 'jcardenas.usuarios';

ALTER TABLE jcardenas.usuarios ADD COLUMN  id_usu SERIAL;

COMMENT ON COLUMN jcardenas.usuarios.id_usu IS 'id_usu is a SERIAL';

ALTER TABLE jcardenas.usuarios ADD COLUMN  nom_usu VARCHAR(50) NOT NULL;

COMMENT ON COLUMN jcardenas.usuarios.nom_usu IS 'nom_usu is a VARCHAR(50) NOT NULL';

ALTER TABLE jcardenas.usuarios ADD COLUMN  ape_usu VARCHAR(50) NOT NULL;

COMMENT ON COLUMN jcardenas.usuarios.ape_usu IS 'ape_usu is a VARCHAR(50) NOT NULL';

ALTER TABLE jcardenas.usuarios ADD COLUMN  log_usu VARCHAR(50)NOT NULL;

COMMENT ON COLUMN jcardenas.usuarios.log_usu IS 'log_usu is a VARCHAR(50)NOT NULL';

ALTER TABLE jcardenas.usuarios ADD COLUMN  pas_usu VARCHAR(50)NOT NULL;

COMMENT ON COLUMN jcardenas.usuarios.pas_usu IS 'pas_usu is a VARCHAR(50)NOT NULL';

ALTER TABLE jcardenas.usuarios ADD COLUMN  niv_adm BOOLEAN;

COMMENT ON COLUMN jcardenas.usuarios.niv_adm IS 'niv_adm is a BOOLEAN';

ALTER TABLE jcardenas.usuarios ADD UNIQUE (log_usu);

ALTER TABLE jcardenas.usuarios ADD PRIMARY KEY(id_usu);

CREATE INDEX ind_log_usu ON jcardenas.usuarios USING HASH (log_usu);

CREATE INDEX ind_pas_usu ON jcardenas.usuarios USING HASH (pas_usu);

ALTER TABLE jcardenas.usuarios ALTER id_usu SET DEFAULT nextval('id_usu_seq');




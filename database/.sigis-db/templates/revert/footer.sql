
DELETE FROM changelog.versions WHERE num_ver='<%= version %>' AND usr_nam='<%= user %>';


COMMIT;

-- Ajustes na estrutura criada para o many-to-many de usuário e papel 
 ALTER TABLE user_role ADD PRIMARY KEY (role_id, user_id);

 INSERT INTO role( id, authority, description)  VALUES (1, 'ALUNO', 'Usuario do sistema');
 INSERT INTO role( id, authority, description)  VALUES (2, 'PROFESSOR', 'Administrador do sistema');
 
 INSERT INTO client (id, cnpj, corporate_name,  phone_number, logo, name) values (1,'','Grupo MR', '87833007','','Grupo MR');
-- Tabela de usuários
 
 INSERT INTO tb_user(  id, enable, image, name, password, username) VALUES (1, true, '', 'mr', '$2a$10$teJrCEnsxNT49ZpXU7n22O27aCGbVYYe/RG6/XxdWPJbOLZubLIi2', 'mr');
 INSERT INTO tb_user(  id, enable, image, name, password, username) VALUES (2, true, '', 'mr2', '$2a$10$teJrCEnsxNT49ZpXU7n22O27aCGbVYYe/RG6/XxdWPJbOLZubLIi2', 'mr2');

 --INSERT INTO role_user(role_id, user_id) values (2, 1);
 INSERT INTO user_role(role_id, user_id) values (2, 1);
 INSERT INTO user_role(role_id, user_id) values (1, 2);
 
 INSERT INTO professor(id, id_usuario, nome) values (1, 1, 'mr');
 INSERT INTO aluno(id, id_usuario, nome) values (1, 2, 'mr2');
 

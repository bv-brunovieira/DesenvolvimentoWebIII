CREATE TABLE album (
   id serial NOT NULL PRIMARY KEY,
	nome varchar(50) NOT NULL,
	cpf varchar(16) NOT NULL,
	tel varchar(15) NOT NULL,
	email varchar(50) NOT NULL,
	estado varchar(2) NOT NULL,
	cidade varchar(60) NOT NULL,
	data_nascimento date NOT NULL,
	titulo_foto varchar(30) NOT NULL,
	nome_fotografo varchar(50) NOT NULL,
	nome_foto varchar(50) NOT NULL,
	nome_responsavel varchar(50),
	cpf_responsavel varchar(16),
	data_autorizacao date default CURRENT_TIMESTAMP
);


select * from album
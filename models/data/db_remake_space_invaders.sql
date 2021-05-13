-- CREATE DATABASE db_remake_space_invaders;
USE db_remake_space_invaders;

CREATE TABLE tb_user(
	idUser INT PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    email VARCHAR(80) NOT NULL
);

CREATE TABLE tb_game_score (
	idScore INT AUTO_INCREMENT,
    fkUser INT,
	FOREIGN KEY (fkUser) REFERENCES tb_user(idUser),
	PRIMARY KEY (idScore, fkUser),
    matchScore DECIMAL (8,2)
);




-- CREATE DATABASE db_remake_space_invaders;
USE db_remake_space_invaders;

CREATE TABLE tb_user(
	idUser INT PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    email VARCHAR(80) NOT NULL
);

CREATE TABLE tb_player_score (
    fkUser INT,
	FOREIGN KEY (fkUser) REFERENCES tb_user(idUser),
	idScore INT AUTO_INCREMENT,
	PRIMARY KEY (idScore, fkUser),
    matchScore DECIMAL (10,3),
    lastMatchScore DATETIME
);

    
-- SELECT * from tb_game_score JOIN tb_user ON fkUser = idUser;








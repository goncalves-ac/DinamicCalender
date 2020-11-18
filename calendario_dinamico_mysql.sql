-- MySQL Workbench Forward Engineering
-- -----------------------------------------------------
-- Schema calendario_dinamico
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema calendario_dinamico
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `calendario_dinamico`;
CREATE SCHEMA IF NOT EXISTS `calendario_dinamico` DEFAULT CHARACTER SET utf8mb4;
USE `calendario_dinamico` ;

-- -----------------------------------------------------
-- Table `calendario_dinamico`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `calendario_dinamico`.`usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(150) NOT NULL,
  `avatar_url` TEXT NULL,
  `sobrenome` VARCHAR(150) NOT NULL,
  `nascimento` DATE NOT NULL,
  `descricao` TINYTEXT NULL,
  `email` VARCHAR(240) NOT NULL,
  `senha` VARCHAR(150) NOT NULL,
  `genero` CHAR(1) NOT NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `calendario_dinamico`.`sso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `calendario_dinamico`.`sso` (
  `id_sso` int NOT NULL AUTO_INCREMENT,
  `uuid_externo` TEXT NOT NULL,
  `fk_id_usuario` int NOT NULL,
  PRIMARY KEY (`id_sso`),
  INDEX `fk_sso_usuario_idx` (`fk_id_usuario` ASC),
  CONSTRAINT `fk_sso_usuario`
    FOREIGN KEY (`fk_id_usuario`)
    REFERENCES `calendario_dinamico`.`usuario` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `calendario_dinamico`.`amigo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `calendario_dinamico`.`amigo` (
  `id_amizade` INT NOT NULL AUTO_INCREMENT,
  `id_usuario_1` int NOT NULL,
  `id_usuario_2` int NOT NULL,
  `status` varchar(9) NOT NULL DEFAULT 'PENDING',
  PRIMARY KEY (`id_amizade`),
  INDEX `fk_id_usuario_2` (`id_usuario_2` ASC),
  INDEX `fk_id_usuario_1` (`id_usuario_1` ASC),
  CONSTRAINT `fk_usuario_has_usuario_usuario1`
    FOREIGN KEY (`id_usuario_1`)
    REFERENCES `calendario_dinamico`.`usuario` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_usuario_has_usuario_usuario2`
    FOREIGN KEY (`id_usuario_2`)
    REFERENCES `calendario_dinamico`.`usuario` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `calendario_dinamico`.`evento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `calendario_dinamico`.`evento` (
  `id_evento` int NOT NULL AUTO_INCREMENT,
  `fk_id_dono` int NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `descricao` varchar(240) NULL,
  `inicio` DATETIME NOT NULL,
  `fim` DATETIME NOT NULL,
  `criado_em` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ultima_edicao` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `cor_de_fundo` varchar(7) NOT NULL DEFAULT '#3788d8',
  `privacidade` varchar(7) NOT NULL DEFAULT "PUBLIC",
  PRIMARY KEY (`id_evento`),
  FOREIGN KEY (`fk_id_dono`) references `usuario`(`id_usuario`) 
	ON DELETE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `calendario_dinamico`.`usuario_evento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `calendario_dinamico`.`usuario_evento` (
  `id_usuario_evento` int NOT NULL AUTO_INCREMENT,
  `fk_id_usuario` int NOT NULL,
  `fk_id_evento` int NOT NULL,
  `status` varchar(9) NOT NULL DEFAULT 'PENDING',
  PRIMARY KEY (`id_usuario_evento`),
  INDEX `fk_usuario_has_evento_evento1_idx` (`fk_id_evento` ASC),
  INDEX `fk_usuario_has_evento_usuario1_idx` (`fk_id_usuario` ASC),
  CONSTRAINT `usuario_existe`
    FOREIGN KEY (`fk_id_usuario`)
    REFERENCES `calendario_dinamico`.`usuario` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `evento_existe`
    FOREIGN KEY (`fk_id_evento`)
    REFERENCES `calendario_dinamico`.`evento` (`id_evento`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- MySQL Workbench Forward Engineering
-- -----------------------------------------------------
-- Schema calendario_dinamico
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema calendario_dinamico
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `calendario_dinamico`;
CREATE SCHEMA IF NOT EXISTS `calendario_dinamico` DEFAULT CHARACTER SET utf8mb4 ;
USE `calendario_dinamico` ;

-- -----------------------------------------------------
-- Table `calendario_dinamico`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `calendario_dinamico`.`usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(150) NULL,
  `avatar_url` VARCHAR(240) NULL,
  `sobrenome` VARCHAR(150) NULL,
  `nascimento` DATE NULL,
  `email` TINYTEXT NULL,
  `senha` VARCHAR(150) NULL,
  `genero` CHAR(1) NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `calendario_dinamico`.`sso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `calendario_dinamico`.`sso` (
  `id_sso` int NOT NULL AUTO_INCREMENT,
  `uuid_externo` TEXT NULL,
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
  `status` varchar(9) DEFAULT 'PENDING',
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
  `titulo` TEXT NULL,
  `descricao` LONGTEXT NULL,
  `inicio` DATETIME NULL,
  `fim` DATETIME NULL,
  `criado_em` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `ultima_edicao` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `cor_de_fundo` varchar(7) DEFAULT '#3788d8',
  `privacidade` TINYTEXT NULL,
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
  `status` varchar(9) DEFAULT 'PENDING',
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


-- MySQL Workbench Forward Engineering
-- -----------------------------------------------------
-- Schema calendario_dinamico
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema calendario_dinamico
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `calendario_dinamico` DEFAULT CHARACTER SET utf8mb4 ;
USE `calendario_dinamico` ;

-- -----------------------------------------------------
-- Table `calendario_dinamico`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `calendario_dinamico`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(150) NULL,
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
  `id_sso` INT NOT NULL AUTO_INCREMENT,
  `uuid_externo` TEXT NULL,
  `fk_id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_sso`),
  INDEX `fk_sso_usuario_idx` (`fk_id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_sso_usuario`
    FOREIGN KEY (`fk_id_usuario`)
    REFERENCES `calendario_dinamico`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `calendario_dinamico`.`amigo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `calendario_dinamico`.`amigo` (
  `id_amizade` INT NOT NULL AUTO_INCREMENT,
  `usuario_id_usuario_1` INT NOT NULL,
  `usuario_id_usuario_2` INT NOT NULL,
  `status` INT NULL DEFAULT 0,
  PRIMARY KEY (`id_amizade`, `usuario_id_usuario_1`, `usuario_id_usuario_2`),
  INDEX `fk_id_usuario_2` (`usuario_id_usuario_2` ASC) VISIBLE,
  INDEX `fk_id_usuario_1` (`usuario_id_usuario_1` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_has_usuario_usuario1`
    FOREIGN KEY (`usuario_id_usuario_1`)
    REFERENCES `calendario_dinamico`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_usuario_usuario2`
    FOREIGN KEY (`usuario_id_usuario_2`)
    REFERENCES `calendario_dinamico`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `calendario_dinamico`.`evento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `calendario_dinamico`.`evento` (
  `id_evento` INT NOT NULL AUTO_INCREMENT,
  `titulo` TEXT NULL,
  `descricao` LONGTEXT NULL,
  `inicio` DATETIME NULL,
  `fim` DATETIME NULL,
  `criado_em` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `ultima_edicao` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `propriedades` JSON NULL,
  `privacidade` TINYTEXT NULL,
  PRIMARY KEY (`id_evento`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `calendario_dinamico`.`usuario_evento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `calendario_dinamico`.`usuario_evento` (
  `id_usuario_evento` INT NOT NULL AUTO_INCREMENT,
  `fk_id_usuario` INT NOT NULL,
  `fk_id_evento` INT NOT NULL,
  `permissao` INT NULL,
  PRIMARY KEY (`id_usuario_evento`, `fk_id_usuario`, `fk_id_evento`),
  INDEX `fk_usuario_has_evento_evento1_idx` (`fk_id_evento` ASC) VISIBLE,
  INDEX `fk_usuario_has_evento_usuario1_idx` (`fk_id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_has_evento_usuario1`
    FOREIGN KEY (`fk_id_usuario`)
    REFERENCES `calendario_dinamico`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_evento_evento1`
    FOREIGN KEY (`fk_id_evento`)
    REFERENCES `calendario_dinamico`.`evento` (`id_evento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

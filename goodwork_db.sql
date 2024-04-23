-- MySQL Script generated by MySQL Workbench
-- Tue Apr 23 02:16:32 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema goodwork
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema goodwork
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `goodwork` DEFAULT CHARACTER SET utf8 ;
USE `goodwork` ;

-- -----------------------------------------------------
-- Table `goodwork`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goodwork`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `goodwork`.`resumes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goodwork`.`resumes` (
  `resume_id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`resume_id`, `user_id`),
  UNIQUE INDEX `resume_id_UNIQUE` (`resume_id` ASC) VISIBLE,
  INDEX `fk_Резюме_users_idx` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_Резюме_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `goodwork`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `goodwork`.`sessions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goodwork`.`sessions` (
  `session_id` INT NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(36) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`session_id`, `user_id`),
  UNIQUE INDEX `session_id_UNIQUE` (`session_id` ASC) VISIBLE,
  INDEX `fk_sessions_users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_sessions_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `goodwork`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `goodwork`.`vacancy`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goodwork`.`vacancy` (
  `vacancy_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `salary` INT NOT NULL,
  `experience` SMALLINT NOT NULL,
  `description` TEXT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`vacancy_id`, `user_id`),
  UNIQUE INDEX `vacancy_id_UNIQUE` (`vacancy_id` ASC) VISIBLE,
  INDEX `fk_vacancy_users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_vacancy_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `goodwork`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `goodwork`.`responses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goodwork`.`responses` (
  `response_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `vacancy_id` INT NOT NULL,
  PRIMARY KEY (`response_id`, `user_id`, `vacancy_id`),
  UNIQUE INDEX `response_id_UNIQUE` (`response_id` ASC) VISIBLE,
  INDEX `fk_responses_users1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_responses_vacancy1_idx` (`vacancy_id` ASC) VISIBLE,
  CONSTRAINT `fk_responses_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `goodwork`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_responses_vacancy1`
    FOREIGN KEY (`vacancy_id`)
    REFERENCES `goodwork`.`vacancy` (`vacancy_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `goodwork`.`feedbacks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goodwork`.`feedbacks` (
  `feedback_id` INT NOT NULL AUTO_INCREMENT,
  `comment` TEXT NOT NULL,
  `user_id` INT NOT NULL,
  `vacancy_id` INT NOT NULL,
  PRIMARY KEY (`feedback_id`, `user_id`, `vacancy_id`),
  UNIQUE INDEX `feedback_id_UNIQUE` (`feedback_id` ASC) VISIBLE,
  INDEX `fk_feedbacks_users1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_feedbacks_vacancy1_idx` (`vacancy_id` ASC) VISIBLE,
  CONSTRAINT `fk_feedbacks_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `goodwork`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_feedbacks_vacancy1`
    FOREIGN KEY (`vacancy_id`)
    REFERENCES `goodwork`.`vacancy` (`vacancy_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `goodwork`.`favourites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goodwork`.`favourites` (
  `fav_vacancy_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `vacancy_id` INT NOT NULL,
  PRIMARY KEY (`fav_vacancy_id`, `user_id`, `vacancy_id`),
  UNIQUE INDEX `fav_vacancy_id_UNIQUE` (`fav_vacancy_id` ASC) VISIBLE,
  INDEX `fk_favourites_users1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_favourites_vacancy1_idx` (`vacancy_id` ASC) VISIBLE,
  CONSTRAINT `fk_favourites_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `goodwork`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_favourites_vacancy1`
    FOREIGN KEY (`vacancy_id`)
    REFERENCES `goodwork`.`vacancy` (`vacancy_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

CREATE TABLE `aadhar`.`aadhar_info` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Aadharno` VARCHAR(45) NULL,
  `Dob` DATETIME NULL,
  `Email` VARCHAR(45) NULL,
  `Is_registered` TINYINT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

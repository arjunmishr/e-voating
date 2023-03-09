CREATE TABLE `aadhar`.`registration` (
    `id` INT NOT NULL,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NULL,
    `email_address` VARCHAR(45) NOT NULL,
    `gender` VARCHAR(10) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    `confirm_password` VARCHAR(45) NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `email_address_UNIQUE` (`email_address` ASC) VISIBLE,
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
  
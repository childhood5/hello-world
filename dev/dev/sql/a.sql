
CREATE TABLE IF NOT EXISTS `building_types` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL,
  `create_date` DATETIME NULL,
  `update_date` DATETIME NULL,
  `is_delete` TINYINT(2) NOT NULL,
  `is_hidden` TINYINT(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `building_types` (`name`, `is_delete`, `is_hidden`) VALUES ('apartment', '0', '0');
INSERT INTO `building_types` (`name`, `is_delete`, `is_hidden`) VALUES ('mansion', '0', '0');
INSERT INTO `building_types` (`name`, `is_delete`, `is_hidden`) VALUES ('house', '0', '0');
INSERT INTO `building_types` (`name`, `is_delete`, `is_hidden`) VALUES ('other', '0', '0');
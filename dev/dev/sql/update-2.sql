ALTER TABLE  `workers` ADD `name_say` VARCHAR( 30 ) NULL AFTER  `staff_code`;
ALTER TABLE  `workers` ADD `name_mei` VARCHAR( 30 ) NULL AFTER  `name_say` ;
    
ALTER TABLE  `users` ADD  `employee_no` VARCHAR( 20 ) NULL AFTER  `company_id` ;

ALTER TABLE  `group_screens` ADD  `can_view` TINYINT( 1 ) NOT NULL DEFAULT  '0' AFTER  `group_id` ;
ALTER TABLE  `group_screens` ADD  `can_insert` TINYINT( 1 ) NOT NULL DEFAULT  '0' AFTER  `can_view` ;
ALTER TABLE  `group_screens` ADD  `can_update` TINYINT( 1 ) NOT NULL DEFAULT  '0' AFTER  `can_insert` ;
ALTER TABLE  `group_screens` ADD  `can_delete` TINYINT( 1 ) NOT NULL DEFAULT  '0' AFTER  `can_update` ;
    
ALTER TABLE  `user_stations` ADD  `priority` TINYINT( 1 ) NOT NULL DEFAULT  '3' AFTER  `station_group_cd` ;
UPDATE user_stations SET priority=1;

CREATE TABLE IF NOT EXISTS `service_statuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,

  `name` varchar(50) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `user_payment_statuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,

  `name` varchar(50) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `worker_payment_statuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,

  `name` varchar(50) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

INSERT INTO `user_payment_statuses` (`name`, `update_by`, `is_delete`, `is_hidden`) VALUES ('Provisional settlement', 'shocola', '0', '0');
INSERT INTO `user_payment_statuses` (`name`, `update_by`, `is_delete`, `is_hidden`) VALUES ('Actual sales', 'shocola', '0', '0');

ALTER TABLE  `workers` DROP  `bank_name`;
ALTER TABLE  `workers` DROP  `branch_name` ;

ALTER TABLE  `workers` ADD  `bank_branch_id` INT NULL AFTER  `prefecture_id` ;
    
ALTER TABLE  `worker_stations` ADD  `priority` TINYINT( 1 ) NOT NULL DEFAULT  '3' AFTER  `station_group_cd` ;
UPDATE worker_stations SET priority=1;

CREATE TABLE IF NOT EXISTS `banks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,

  `name` varchar(50) DEFAULT NULL,
  `bank_code` varchar(4) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `bank_branches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bank_id` int(11) DEFAULT NULL, 

  `name` varchar(50) DEFAULT NULL,
  `branch_code` varchar(3) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

ALTER TABLE  `bank_branches` ADD INDEX (  `bank_id` ) ;
ALTER TABLE  `bank_branches` ADD FOREIGN KEY (  `bank_id` ) REFERENCES  `banks` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

ALTER TABLE  `workers` ADD INDEX (  `bank_branch_id` ) ;
ALTER TABLE  `workers` ADD FOREIGN KEY (  `bank_branch_id` ) REFERENCES  `bank_branches` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

INSERT INTO  `mail_types` (`id`, `name`, `create_date`, `update_date`, `update_by`, `is_delete`, `is_hidden`) VALUES (NULL, 'user_recover_password_changed', NULL, NULL, NULL, '0', '0');
INSERT INTO  `mail_templates` (`id`, `name`, `subject`, `template_url`, `type_id`, `create_date`, `update_date`, `update_by`, `is_delete`, `is_hidden`) VALUES (NULL, 'user_recover_password_changed', 'パスワード変更が完了しました', 'user_recover_password_changed.html', '8', NULL, NULL, NULL, '0', '0');
INSERT INTO  `mail_configs` (`id` ,`domain` ,`port` ,`email_address` ,`display_name` ,`config_password` ,`type_id` ,`create_date` ,`update_date` ,`update_by` ,`is_delete` ,`is_hidden`)VALUES (NULL ,  'gmail',  '587',  'housekeeping.japan@gmail.com',  'ショコラ',  'Qwert54321',  '8', NULL , NULL , NULL ,  '0',  '0');

INSERT INTO  `mail_types` (`id`, `name`, `create_date`, `update_date`, `update_by`, `is_delete`, `is_hidden`) VALUES (NULL, 'worker_recover_password_changed', NULL, NULL, NULL, '0', '0');
INSERT INTO  `mail_templates` (`id`, `name`, `subject`, `template_url`, `type_id`, `create_date`, `update_date`, `update_by`, `is_delete`, `is_hidden`) VALUES (NULL, 'worker_recover_password_changed', 'パスワード変更が完了しました', 'worker_recover_password_changed.html', '9', NULL, NULL, NULL, '0', '0');
INSERT INTO  `mail_configs` (`id` ,`domain` ,`port` ,`email_address` ,`display_name` ,`config_password` ,`type_id` ,`create_date` ,`update_date` ,`update_by` ,`is_delete` ,`is_hidden`)VALUES (NULL ,  'gmail',  '587',  'housekeeping.japan@gmail.com',  'ショコラ',  'Qwert54321',  '9', NULL , NULL , NULL ,  '0',  '0');

UPDATE `mail_templates` SET `subject`='パスワード変更についてのお知らせ' WHERE id=6 ;
UPDATE `mail_templates` SET `subject`='パスワード変更についてのお知らせ' WHERE id=7 ;
UPDATE `mail_templates` SET `subject`='パスワード変更が完了しました' WHERE id=8 ;
UPDATE `mail_templates` SET `subject`='パスワード変更が完了しました' WHERE id=9 ;

UPDATE `mail_configs` SET `domain`='mail.shocola.jp', `port`='25', `email_address`='noreply@shocola.jp', `config_password`='o1qNGWKYAwHs6GrZNrJfvg==';

UPDATE `mail_types` SET `name`='service_register_to_admin' WHERE `id`='4';

ALTER TABLE  `operations` CHANGE  `login_password`  `login_password` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL ;

ALTER TABLE `users` CHANGE COLUMN `building_type` `building_type` INT NULL DEFAULT NULL ;

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


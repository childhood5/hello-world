ALTER TABLE  `mail_types` DROP  `subject` ;

ALTER TABLE  `users` ADD  `recover_password` VARCHAR(20) DEFAULT '0' AFTER  `is_detail_updated` ;
INSERT INTO  `mail_types` (`id`, `name`, `create_date`, `update_date`, `update_by`, `is_delete`, `is_hidden`) VALUES (NULL, 'user_recover_password', NULL, NULL, NULL, '0', '0');
INSERT INTO  `mail_templates` (`id`, `name`, `subject`, `template_url`, `type_id`, `create_date`, `update_date`, `update_by`, `is_delete`, `is_hidden`) VALUES (NULL, 'user_recover_password', 'Recover Password', 'user_recover_password.html', '6', NULL, NULL, NULL, '0', '0');
INSERT INTO  `mail_configs` (`id` ,`domain` ,`port` ,`email_address` ,`display_name` ,`config_password` ,`type_id` ,`create_date` ,`update_date` ,`update_by` ,`is_delete` ,`is_hidden`)VALUES (NULL ,  'gmail',  '587',  'housekeeping.japan@gmail.com',  'ショコラ',  'Qwert54321',  '6', NULL , NULL , NULL ,  '0',  '0');

ALTER TABLE  `workers` ADD  `recover_password` VARCHAR(20) DEFAULT '0' AFTER  `is_receive_notify` ;
INSERT INTO  `mail_types` (`id`, `name`, `create_date`, `update_date`, `update_by`, `is_delete`, `is_hidden`) VALUES (NULL, 'worker_recover_password', NULL, NULL, NULL, '0', '0');
INSERT INTO  `mail_templates` (`id`, `name`, `subject`, `template_url`, `type_id`, `create_date`, `update_date`, `update_by`, `is_delete`, `is_hidden`) VALUES (NULL, 'worker_recover_password', 'Recover Password', 'worker_recover_password.html', '7', NULL, NULL, NULL, '0', '0');
INSERT INTO  `mail_configs` (`id` ,`domain` ,`port` ,`email_address` ,`display_name` ,`config_password` ,`type_id` ,`create_date` ,`update_date` ,`update_by` ,`is_delete` ,`is_hidden`)VALUES (NULL ,  'gmail',  '587',  'housekeeping.japan@gmail.com',  'ショコラ',  'Qwert54321',  '7', NULL , NULL , NULL ,  '0',  '0');


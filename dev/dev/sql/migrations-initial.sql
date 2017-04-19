
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `prefecture_id` varchar(3) DEFAULT NULL,
  `house_id` int(11) DEFAULT NULL,
  `size_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `first_name_kana` varchar(30) DEFAULT NULL,
  `last_name_kana` varchar(30) DEFAULT NULL,
  
  `nickname` varchar(50) DEFAULT NULL,
  `profile_image_url` varchar(500) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  
  `sex` varchar(3) DEFAULT NULL,
  `address1` varchar(100) DEFAULT NULL,
  `address2` varchar(100) DEFAULT NULL,
  `address3` varchar(100) DEFAULT NULL,
  
  `gps_data` varchar(200) DEFAULT NULL,
  `email_address` varchar(50) DEFAULT NULL,  
  `login_password` varchar(20) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,  
  
  `payment_id` varchar(50) DEFAULT NULL,  
  `building_type` tinyint(2) DEFAULT NULL,
  `is_auto_lock` tinyint(2) NOT NULL DEFAULT '0',
  `is_exist_pet` tinyint(2) NOT NULL DEFAULT '0',  
  
  `demain` varchar(1000) DEFAULT NULL,
  
  `sort_order` int(11) NOT NULL DEFAULT '0',
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `user_stations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `user_id` int(11) DEFAULT NULL,
  `station_cd` int(11) DEFAULT NULL,
  `station_group_cd` int(11) DEFAULT NULL,
 
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `bus_stops` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `bus_stop` varchar(50) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `user_bus_stops` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `user_id` int(11) DEFAULT NULL,
  `bus_stop_id` int(11) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `name` varchar(50) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `room_sizes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `size` varchar(50) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `families` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `name` varchar(50) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `name` varchar(50) DEFAULT NULL,
  
  `large_industry_type_id` varchar(10) DEFAULT NULL,  
  `large_industry_type_name` varchar(50) DEFAULT NULL,
  `small_industry_type_id` varchar(10) DEFAULT NULL,  
  `small_industry_type_name` varchar(50) DEFAULT NULL,
  
  `prefecture_id` varchar(3) DEFAULT NULL,
  `status_id` varchar(3) DEFAULT NULL,
 
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `tools` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `name` varchar(50) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `user_tools` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `user_id` int(11) DEFAULT NULL,
  `tool_id` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  
  `sort_order` int(11) NOT NULL DEFAULT '0',
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `service_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `service_category_id` int(11) DEFAULT NULL,
  `service_name` varchar(50) DEFAULT NULL,  
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `workers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `prefecture_id` varchar(3) DEFAULT NULL,
 
  `staff_code` varchar(30) DEFAULT NULL,
  
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `first_name_kana` varchar(30) DEFAULT NULL,
  `last_name_kana` varchar(30) DEFAULT NULL,
  
  `nickname` varchar(50) DEFAULT NULL,
  `profile_image_url` varchar(500) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  
  `sex` varchar(3) DEFAULT NULL,
  `address1` varchar(100) DEFAULT NULL,
  `address2` varchar(100) DEFAULT NULL,
  `address3` varchar(100) DEFAULT NULL,
  
  `gps_data` varchar(200) DEFAULT NULL,
  `email_address` varchar(50) DEFAULT NULL,  
  `login_password` varchar(20) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,  
  
  `payee_type` varchar(50) DEFAULT NULL,  
  `bank_name` varchar(50) DEFAULT NULL,  
  `branch_name` varchar(50) DEFAULT NULL,  
  `account_type` varchar(50) DEFAULT NULL,  
  `account_number` varchar(50) DEFAULT NULL,  
  `account_name` varchar(50) DEFAULT NULL,  
   
  
  `demain` varchar(1000) DEFAULT NULL,
  `profile_comment` varchar(500) DEFAULT NULL,
  
  `sort_order` int(11) NOT NULL DEFAULT '0',
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `worker_stations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `worker_id` int(11) DEFAULT NULL,
  `station_cd` int(11) DEFAULT NULL,
  `station_group_cd` int(11) DEFAULT NULL,
 
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `worker_bus_stops` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `worker_id` int(11) DEFAULT NULL,
  `bus_stop_id` int(11) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `company_statuses` (
  `id` varchar(3) NOT NULL,
  
  `name` varchar(50) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `prefectures` (
  `id` varchar(3) NOT NULL,
  
  `name` varchar(50) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `user_families` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `user_id` int(11) DEFAULT NULL,
  `family_id` int(11) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `station_companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `company_cd` int(11) DEFAULT NULL,
  `rail_cd` int(11) DEFAULT NULL,
  
  `company_name` varchar(200) DEFAULT NULL,
  `company_name_kana` varchar(200) DEFAULT NULL,
  `company_name_official_name` varchar(200) DEFAULT NULL,
  `company_name_abbreviation` varchar(200) DEFAULT NULL,
  
  `company_url` varchar(500) DEFAULT NULL,
  `company_type` int(11) DEFAULT NULL,
  
  
  `status` tinyint(2) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT '0',
 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `station_lines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `company_cd` int(11) DEFAULT NULL,
  `line_cd` int(11) DEFAULT NULL,
  
  `line_name` varchar(200) DEFAULT NULL,
  `line_name_kana` varchar(200) DEFAULT NULL,
  `line_name_official_name` varchar(200) DEFAULT NULL,
  
  `line_color_color` varchar(10) DEFAULT NULL,  
  `line_color_name` varchar(20) DEFAULT NULL,
  `lon` float(20,9) DEFAULT NULL,
  `lat` float(20,9) DEFAULT NULL,
  
  `zoom` int(11) DEFAULT NULL,  
  `status` tinyint(2) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT '0',
 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `stations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `station_cd` int(11) DEFAULT NULL,
  `station_group_cd` int(11) DEFAULT NULL,
  
  `station_name` varchar(200) DEFAULT NULL,
  `line_cd` int(11) DEFAULT NULL,
  `gref_cd` int(11) DEFAULT NULL,
  
  `post` varchar(20) DEFAULT NULL,  
  `address` varchar(500) DEFAULT NULL,
  `lon` float(20,9) DEFAULT NULL,
  `lat` float(20,9) DEFAULT NULL,
  
  `open_date` datetime DEFAULT NULL,  
  `close_date` datetime DEFAULT NULL,
  `status` tinyint(2) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT '0',
 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `station_joins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `line_cd` int(11) DEFAULT NULL,
  `station_cd` int(11) DEFAULT NULL,
  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `operations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `first_name_kana` varchar(30) DEFAULT NULL,
  `last_name_kana` varchar(30) DEFAULT NULL,
  
  `nickname` varchar(50) DEFAULT NULL,
  `profile_image_url` varchar(500) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  
  `sex` varchar(3) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  
  `email_address` varchar(50) DEFAULT NULL,  
  `login_password` varchar(20) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,  
  
  
  `sort_order` int(11) NOT NULL DEFAULT '0',
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `name` varchar(50) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `operation_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `operation_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `screens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `name` varchar(50) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `group_screens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `screen_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

ALTER TABLE  `station_companies` ADD UNIQUE (`company_cd`);

ALTER TABLE  `station_lines` ADD INDEX (  `company_cd` ) ;
ALTER TABLE  `station_lines` ADD UNIQUE (`line_cd`);
ALTER TABLE  `station_lines` ADD FOREIGN KEY (  `company_cd` ) REFERENCES  `station_companies` (`company_cd`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

ALTER TABLE  `stations` ADD UNIQUE (`station_cd`);
ALTER TABLE  `stations` ADD INDEX (  `line_cd` ) ;
ALTER TABLE  `stations` ADD FOREIGN KEY (  `line_cd` ) REFERENCES  `station_lines` (`line_cd`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

ALTER TABLE  `station_joins` ADD INDEX (  `line_cd` ) ;
ALTER TABLE  `station_joins` ADD INDEX (  `station_cd` ) ;
ALTER TABLE  `station_joins` ADD FOREIGN KEY (  `line_cd` ) REFERENCES  `station_lines` (`line_cd`) ON DELETE RESTRICT ON UPDATE RESTRICT ;
ALTER TABLE  `station_joins` ADD FOREIGN KEY (  `station_cd` ) REFERENCES  `stations` (`station_cd`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

ALTER TABLE  `user_stations` ADD INDEX (  `user_id` ) ;
ALTER TABLE  `user_stations` ADD INDEX (  `station_cd` ) ;
ALTER TABLE  `user_stations` ADD FOREIGN KEY (  `user_id` ) REFERENCES  `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;
ALTER TABLE  `user_stations` ADD FOREIGN KEY (  `station_cd` ) REFERENCES  `stations` (`station_cd`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

ALTER TABLE  `worker_stations` ADD INDEX (  `worker_id` ) ;
ALTER TABLE  `worker_stations` ADD INDEX (  `station_cd` ) ;
ALTER TABLE  `worker_stations` ADD FOREIGN KEY (  `worker_id` ) REFERENCES  `workers` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;
ALTER TABLE  `worker_stations` ADD FOREIGN KEY (  `station_cd` ) REFERENCES  `stations` (`station_cd`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

ALTER TABLE  `user_bus_stops` ADD INDEX (  `user_id` ) ;
ALTER TABLE  `user_bus_stops` ADD INDEX (  `bus_stop_id` ) ;
ALTER TABLE  `user_bus_stops` ADD FOREIGN KEY (  `user_id` ) REFERENCES  `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;
ALTER TABLE  `user_bus_stops` ADD FOREIGN KEY (  `bus_stop_id` ) REFERENCES  `bus_stops` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

ALTER TABLE  `worker_bus_stops` ADD INDEX (  `worker_id` ) ;
ALTER TABLE  `worker_bus_stops` ADD INDEX (  `bus_stop_id` ) ;
ALTER TABLE  `worker_bus_stops` ADD FOREIGN KEY (  `worker_id` ) REFERENCES  `workers` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;
ALTER TABLE  `worker_bus_stops` ADD FOREIGN KEY (  `bus_stop_id` ) REFERENCES  `bus_stops` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

ALTER TABLE  `users` ADD INDEX (  `size_id` ) ;
ALTER TABLE  `users` ADD INDEX (  `company_id` ) ;
ALTER TABLE  `users` ADD INDEX (  `prefecture_id` ) ;
ALTER TABLE  `users` ADD FOREIGN KEY (  `size_id` ) REFERENCES  `room_sizes` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;
ALTER TABLE  `users` ADD FOREIGN KEY (  `company_id` ) REFERENCES  `companies` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;
ALTER TABLE  `users` ADD FOREIGN KEY (  `prefecture_id` ) REFERENCES  `prefectures` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

ALTER TABLE  `companies` ADD INDEX (  `prefecture_id` ) ;
ALTER TABLE  `companies` ADD INDEX (  `status_id` ) ;
ALTER TABLE  `companies` ADD FOREIGN KEY (  `prefecture_id` ) REFERENCES  `prefectures` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;
ALTER TABLE  `companies` ADD FOREIGN KEY (  `status_id` ) REFERENCES  `company_statuses` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

ALTER TABLE  `user_families` ADD INDEX (  `user_id` ) ;
ALTER TABLE  `user_families` ADD INDEX (  `family_id` ) ;
ALTER TABLE  `user_families` ADD FOREIGN KEY (  `user_id` ) REFERENCES  `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;
ALTER TABLE  `user_families` ADD FOREIGN KEY (  `family_id` ) REFERENCES  `families` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

ALTER TABLE  `user_tools` ADD INDEX (  `user_id` ) ;
ALTER TABLE  `user_tools` ADD INDEX (  `tool_id` ) ;
ALTER TABLE  `user_tools` ADD FOREIGN KEY (  `user_id` ) REFERENCES  `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;
ALTER TABLE  `user_tools` ADD FOREIGN KEY (  `tool_id` ) REFERENCES  `tools` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

ALTER TABLE  `operation_groups` ADD INDEX (  `operation_id` ) ;
ALTER TABLE  `operation_groups` ADD INDEX (  `group_id` ) ;
ALTER TABLE  `operation_groups` ADD FOREIGN KEY (  `operation_id` ) REFERENCES  `operations` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;
ALTER TABLE  `operation_groups` ADD FOREIGN KEY (  `group_id` ) REFERENCES  `groups` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

ALTER TABLE  `group_screens` ADD INDEX (  `screen_id` ) ;
ALTER TABLE  `group_screens` ADD INDEX (  `group_id` ) ;
ALTER TABLE  `group_screens` ADD FOREIGN KEY (  `screen_id` ) REFERENCES  `screens` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;
ALTER TABLE  `group_screens` ADD FOREIGN KEY (  `group_id` ) REFERENCES  `groups` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

ALTER TABLE  `bus_stops` CHANGE  `bus_stop`  `name` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL ;

CREATE TABLE IF NOT EXISTS `areas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `name` varchar(50) DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `area_limits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `area_id` int(11) DEFAULT NULL,
  `request_time` datetime DEFAULT NULL,
  `request_limit` int(11) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

ALTER TABLE  `area_limits` ADD INDEX (  `area_id` ) ;
ALTER TABLE  `area_limits` ADD FOREIGN KEY (  `area_id` ) REFERENCES  `areas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

ALTER TABLE  `users` ADD  `area_id` INT NULL AFTER  `id` ;
ALTER TABLE  `users` ADD INDEX (  `area_id` ) ;
ALTER TABLE  `users` ADD FOREIGN KEY (  `area_id` ) REFERENCES  `areas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

ALTER TABLE  `workers` ADD  `area_id` INT NULL AFTER  `id` ;
ALTER TABLE  `workers` ADD INDEX (  `area_id` ) ;
ALTER TABLE  `workers` ADD FOREIGN KEY (  `area_id` ) REFERENCES  `areas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;


ALTER TABLE  `workers` ADD INDEX (  `prefecture_id` ) ;
ALTER TABLE  `workers` ADD FOREIGN KEY (  `prefecture_id` ) REFERENCES  `prefectures` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;
ALTER TABLE  `rooms` ADD  `short_name` VARCHAR( 3 ) NULL AFTER  `name` ;


CREATE TABLE IF NOT EXISTS `prices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `name` varchar(50) DEFAULT NULL,
  `price` float(20,6) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `service_detail_prices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `service_id` int(11) DEFAULT NULL,
  `price_id` int(11) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

ALTER TABLE  `service_detail_prices` ADD INDEX (  `service_id` ) ;
ALTER TABLE  `service_detail_prices` ADD INDEX (  `price_id` ) ;
ALTER TABLE  `service_detail_prices` ADD FOREIGN KEY (  `service_id` ) REFERENCES  `service_details` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;
ALTER TABLE  `service_detail_prices` ADD FOREIGN KEY (  `price_id` ) REFERENCES  `prices` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

ALTER TABLE  `workers` CHANGE  `login_password`  `login_password` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL ;
ALTER TABLE  `users` CHANGE  `login_password`  `login_password` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL ;

ALTER TABLE  `area_limits` CHANGE  `request_time`  `request_time` TIME NULL DEFAULT NULL ;

CREATE TABLE IF NOT EXISTS `houses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `name` varchar(50) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

ALTER TABLE  `users` ADD INDEX (  `house_id` ) ;
ALTER TABLE  `users` ADD FOREIGN KEY (  `house_id` ) REFERENCES  `houses` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

CREATE TABLE IF NOT EXISTS `area_adjacents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `area_id1` int(11) DEFAULT NULL,
  `area_id2` int(11) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

ALTER TABLE  `area_adjacents` ADD INDEX (  `area_id1` ) ;
ALTER TABLE  `area_adjacents` ADD INDEX (  `area_id2` ) ;
ALTER TABLE  `area_adjacents` ADD FOREIGN KEY (  `area_id1` ) REFERENCES  `areas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;
ALTER TABLE  `area_adjacents` ADD FOREIGN KEY (  `area_id2` ) REFERENCES  `areas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;


ALTER TABLE  `areas` DROP  `zip_code` ;

CREATE TABLE IF NOT EXISTS `area_addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `area_id` int(11) DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

ALTER TABLE  `area_addresses` ADD INDEX (  `area_id` ) ;
ALTER TABLE  `area_addresses` ADD FOREIGN KEY (  `area_id` ) REFERENCES  `areas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

CREATE TABLE IF NOT EXISTS `area_stations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `area_id` int(11) DEFAULT NULL,
  `station_group_cd` int(11) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

ALTER TABLE  `area_stations` ADD INDEX (  `area_id` ) ;
ALTER TABLE  `area_stations` ADD FOREIGN KEY (  `area_id` ) REFERENCES  `areas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;


CREATE TABLE IF NOT EXISTS `campaigns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `name` varchar(50) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `price_off` float(20,6)  DEFAULT NULL,
  `price_minus` float(20,6)  DEFAULT NULL,
  
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

ALTER TABLE  `service_detail_prices` ADD  `campaign_id` INT(11) NULL AFTER  `price_id` ;
ALTER TABLE  `service_detail_prices` ADD INDEX (  `campaign_id` ) ;
ALTER TABLE  `service_detail_prices` ADD FOREIGN KEY (  `campaign_id` ) REFERENCES  `campaigns` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

CREATE TABLE IF NOT EXISTS `holiday_calendars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `holiday_date` datetime DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `holiday_calendars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `holiday_date` datetime DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `service_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
  `name` varchar(50) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

ALTER TABLE  `service_details` ADD INDEX (  `service_category_id` ) ;
ALTER TABLE  `service_details` ADD FOREIGN KEY (  `service_category_id` ) REFERENCES  `service_categories` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

ALTER TABLE  `users` ADD  `is_detail_updated` TINYINT( 1 ) NULL DEFAULT  '0' AFTER  `demain` ;












CREATE TABLE IF NOT EXISTS `frequencies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,

  `name` varchar(50) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;
ALTER TABLE  `workers` ADD  `frequency_id` INT NULL AFTER  `id` ;
ALTER TABLE  `workers` ADD FOREIGN KEY (  `frequency_id` ) REFERENCES  `frequencies` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

CREATE TABLE IF NOT EXISTS `mail_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,

  `name` varchar(50) DEFAULT NULL,
  `subject` varchar(500) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `mail_templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,

  `name` varchar(50) DEFAULT NULL,
  `subject` varchar(500) DEFAULT NULL,
  `template_url` varchar(255) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `mail_configs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,

  `domain` varchar(50) DEFAULT NULL,
  `port` int(11) DEFAULT NULL,
  `email_address` varchar(50) DEFAULT NULL,
  `display_name` varchar(50) DEFAULT NULL,
  `config_password` varchar(50) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(2) NOT NULL DEFAULT '0',
  `is_hidden` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT  CHARSET=utf8 COLLATE=utf8_unicode_ci  AUTO_INCREMENT=1 ;
ALTER TABLE  `mail_templates` ADD FOREIGN KEY (  `type_id` ) REFERENCES  `mail_types` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;
ALTER TABLE  `mail_configs` ADD FOREIGN KEY (  `type_id` ) REFERENCES  `mail_types` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;





ALTER TABLE  `companies` ADD  `company_auth_id` VARCHAR( 30 ) NULL AFTER  `name` ;
ALTER TABLE  `companies` ADD UNIQUE (`company_auth_id`);

ALTER TABLE  `users`  DROP FOREIGN KEY users_ibfk_3;
ALTER TABLE  `users` DROP  `company_id` ;
ALTER TABLE  `users` ADD   `company_auth_id` VARCHAR( 30 ) NULL AFTER  `size_id` ;
ALTER TABLE  `users` ADD INDEX (  `company_auth_id` ) ;
ALTER TABLE  `users` ADD FOREIGN KEY (  `company_auth_id` ) REFERENCES  `companies` (`company_auth_id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

DROP TABLE `service_detail_prices`;
ALTER TABLE  `prices` DROP COLUMN `name`;
ALTER TABLE  `campaigns` DROP COLUMN `name`;
ALTER TABLE  `prices` ADD `service_id` integer AFTER `id`;
ALTER TABLE  `prices` ADD FOREIGN KEY (  `service_id` ) REFERENCES  `service_details` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;
ALTER TABLE  `prices` ADD `company_id` integer AFTER `id`;
ALTER TABLE  `prices` ADD FOREIGN KEY (  `company_id` ) REFERENCES  `companies` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;
ALTER TABLE  `campaigns` ADD `service_id` integer AFTER `id`;
ALTER TABLE  `campaigns` ADD FOREIGN KEY (  `service_id` ) REFERENCES  `service_details` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;
ALTER TABLE  `campaigns` ADD `company_id` integer AFTER `id`;
ALTER TABLE  `campaigns` ADD FOREIGN KEY (  `company_id` ) REFERENCES  `companies` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;

ALTER TABLE  `users` DROP FOREIGN KEY  `users_ibfk_7` ;
ALTER TABLE  `users` DROP  `company_auth_id` ;
ALTER TABLE  `users` ADD  `company_id` INT( 11 ) NULL AFTER  `size_id` ;
ALTER TABLE  `users` ADD INDEX (  `company_id` ) ;
ALTER TABLE  `users` ADD FOREIGN KEY (  `company_id` ) REFERENCES  `companies` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT ;


ALTER TABLE `workers` ADD UNIQUE(email_address);
ALTER TABLE `workers` ADD UNIQUE(nickname);
ALTER TABLE `workers` ADD UNIQUE(staff_code);
ALTER TABLE `workers` ADD UNIQUE(tel);

ALTER TABLE `users` ADD UNIQUE(email_address);
ALTER TABLE `users` ADD UNIQUE(nickname);
ALTER TABLE `users` ADD UNIQUE(tel);

ALTER TABLE  `service_details` ADD  `is_basic` TINYINT( 1 ) DEFAULT 0 AFTER  `service_name`;
ALTER TABLE  `users` CHANGE COLUMN `payment_id` `customer_id` VARCHAR(50);

ALTER TABLE  `user_bus_stops` DROP FOREIGN KEY  `user_bus_stops_ibfk_1` ;
ALTER TABLE  `user_bus_stops` DROP FOREIGN KEY  `user_bus_stops_ibfk_2` ;
DROP TABLE   `user_bus_stops`;

ALTER TABLE  `worker_bus_stops` DROP FOREIGN KEY  `worker_bus_stops_ibfk_1` ;
ALTER TABLE  `worker_bus_stops` DROP FOREIGN KEY  `worker_bus_stops_ibfk_2` ;
DROP TABLE   `worker_bus_stops`;

DROP TABLE    `bus_stops`;

--2015/06/25

ALTER TABLE `users` ADD `is_receive_notify` TINYINT(2) DEFAULT 1 AFTER `is_exist_pet`;
ALTER TABLE `workers` ADD `is_receive_notify` TINYINT(2) DEFAULT 1 AFTER `profile_comment`;

ALTER TABLE `users` ADD `bus_stop` varchar(50) DEFAULT NULL AFTER `is_exist_pet`;


--2015/07/01
ALTER TABLE `workers` DROP  INDEX `staff_code`;

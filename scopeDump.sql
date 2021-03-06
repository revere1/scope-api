/*
SQLyog Enterprise Trial - MySQL GUI v7.11 
MySQL - 8.0.13 : Database - scope
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`scope` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `scope`;

/*Table structure for table `admin_login` */

DROP TABLE IF EXISTS `admin_login`;

CREATE TABLE `admin_login` (
  `id` int(11) NOT NULL,
  `admin_login_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `admin_login` */

/*Table structure for table `admin_offers` */

DROP TABLE IF EXISTS `admin_offers`;

CREATE TABLE `admin_offers` (
  `id` int(11) NOT NULL,
  `offer_name` varchar(45) DEFAULT NULL,
  `offer_message` varchar(45) DEFAULT NULL,
  `offer_status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `admin_offers` */

/*Table structure for table `booked_services` */

DROP TABLE IF EXISTS `booked_services`;

CREATE TABLE `booked_services` (
  `id_book_services` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) DEFAULT NULL,
  `user_address` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_mobile_number` varchar(45) DEFAULT NULL,
  `payment` varchar(45) DEFAULT NULL,
  `user_emailid` varchar(45) DEFAULT NULL,
  `service_name` varchar(45) DEFAULT NULL,
  `time_slot` varchar(45) DEFAULT NULL,
  `day_slot` timestamp NULL DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_book_services`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `booked_services` */

insert  into `booked_services`(`id_book_services`,`id_user`,`user_address`,`user_mobile_number`,`payment`,`user_emailid`,`service_name`,`time_slot`,`day_slot`,`status`) values (2,1,NULL,'8008169609','0','keshu884@gmail.com','Upto 180CC','9AM-11AM','2019-05-10 00:00:00','Cancelled'),(3,1,NULL,'8008169609','0','keshu884@gmail.com','Upto 180CC','9AM-11AM','2019-05-13 00:00:00','Active'),(4,1,NULL,'8008169609','0','keshu884@gmail.com','Upto 180CC','9AM-11AM','2019-05-13 00:00:00','Active'),(5,1,NULL,'8008169609','0','keshu884@gmail.com','Upto 180CC','9AM-11AM','2019-05-04 00:00:00','InActive'),(6,1,NULL,'8008169609','0','keshu884@gmail.com','More than 180CC','3PM-5PM','2019-05-05 00:00:00','Active'),(7,1,NULL,'8008169609','0','keshu884@gmail.com','More than 180CC','5PM-7PM','2019-05-05 00:00:00','Active');

/*Table structure for table `user_address` */

DROP TABLE IF EXISTS `user_address`;

CREATE TABLE `user_address` (
  `id_user_address` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) DEFAULT NULL,
  `full_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `full_address` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `pincode` int(11) DEFAULT NULL,
  `dob` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_user_address`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `user_address` */

insert  into `user_address`(`id_user_address`,`id_user`,`full_name`,`email`,`full_address`,`city`,`gender`,`pincode`,`dob`,`status`) values (3,2,'subbu',NULL,'Saidabad','Hyderabad',NULL,505199,NULL,'InActive'),(4,2,'subbu',NULL,NULL,NULL,NULL,NULL,NULL,'InActive'),(5,2,'subbu',NULL,NULL,NULL,NULL,NULL,NULL,'InActive'),(6,2,'subbu',NULL,NULL,NULL,NULL,NULL,NULL,'Active'),(7,2,'subbu',NULL,NULL,NULL,NULL,NULL,NULL,'Active'),(14,3,'Ramesh',NULL,'bangalore','Hyder',NULL,505123,NULL,'InActive'),(18,3,'Suresh',NULL,'Bangalore','hyderabad',NULL,505122,NULL,'Active'),(20,1,'Kesava',NULL,'Matham Bazar','Ongole',NULL,523987,NULL,'Active');

/*Table structure for table `user_profile` */

DROP TABLE IF EXISTS `user_profile`;

CREATE TABLE `user_profile` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `mobile_number` varchar(15) DEFAULT NULL,
  `otp` int(6) DEFAULT NULL,
  `full_name` varchar(50) DEFAULT NULL,
  `full_address` varchar(150) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `dob` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `pincode` int(11) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `user_profile` */

insert  into `user_profile`(`id_user`,`mobile_number`,`otp`,`full_name`,`full_address`,`gender`,`dob`,`email`,`pincode`,`city`) values (1,'8008169609',7982,'Kesava D',NULL,'Male','1991-03-18','keshu884@gmail.com',NULL,NULL),(2,'8500225140',9912,'subbu',NULL,'Male','1992-06-06','subbu',NULL,NULL),(3,'9618322612',8148,'Likhitha Teja',NULL,'Female','1992-06-06','m',NULL,NULL),(4,'9885665232',2144,'Vignesh',NULL,'Male','1991-03-31','vignesh@gmail.com',NULL,NULL),(5,'1111111111111',7466,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'789357412322',2555,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,'7893574122',4690,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;

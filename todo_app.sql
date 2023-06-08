-- MySQL dump 10.13  Distrib 8.0.11, for macos10.13 (x86_64)
--
-- Host: localhost    Database: todo_app
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tags` (
  `tag_id` int(11) NOT NULL,
  `tag_text` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo_item`
--

DROP TABLE IF EXISTS `todo_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `todo_item` (
  `todo_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `list_id` int(11) DEFAULT NULL,
  `completion_status` enum('Not Started','In Progress','Completed') DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`todo_id`),
  KEY `user_id` (`user_id`),
  KEY `list_id` (`list_id`),
  CONSTRAINT `list_id` FOREIGN KEY (`list_id`) REFERENCES `todo_list` (`list_id`),
  CONSTRAINT `todo_item_ibfk_1` FOREIGN KEY (`list_id`) REFERENCES `todo_list` (`list_id`) ON DELETE SET NULL,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo_item`
--

LOCK TABLES `todo_item` WRITE;
/*!40000 ALTER TABLE `todo_item` DISABLE KEYS */;
INSERT INTO `todo_item` VALUES (3,1,2,'Completed','2023-11-02 00:00:00',NULL),(4,2,3,'Not Started','2023-12-12 00:00:00',NULL);
/*!40000 ALTER TABLE `todo_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo_list`
--

DROP TABLE IF EXISTS `todo_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `todo_list` (
  `list_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `list_name` varchar(100) DEFAULT NULL,
  `completion_status` enum('Not Started','In Progress','Completed') DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  PRIMARY KEY (`list_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo_list`
--

LOCK TABLES `todo_list` WRITE;
/*!40000 ALTER TABLE `todo_list` DISABLE KEYS */;
INSERT INTO `todo_list` VALUES (2,1,'school','In Progress','2023-09-01 00:00:00'),(3,2,'work','Not Started','2023-12-12 00:00:00');
/*!40000 ALTER TABLE `todo_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo_tags`
--

DROP TABLE IF EXISTS `todo_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `todo_tags` (
  `tag_id` int(11) DEFAULT NULL,
  `todo_id` int(11) DEFAULT NULL,
  KEY `tag_id` (`tag_id`),
  KEY `todo_id` (`todo_id`),
  CONSTRAINT `tag_id` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`),
  CONSTRAINT `todo_id` FOREIGN KEY (`todo_id`) REFERENCES `todo_item` (`todo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo_tags`
--

LOCK TABLES `todo_tags` WRITE;
/*!40000 ALTER TABLE `todo_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `todo_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'FooCoder','abc@gmail.com','todoapp'),(2,'FooCoder2','abc@gmail.com','todoapp2');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-08  7:59:01

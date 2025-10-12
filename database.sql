-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: app_db
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `results`
--

DROP TABLE IF EXISTS `results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int DEFAULT NULL,
  `subject_id` int DEFAULT NULL,
  `marks_obtained` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `results_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`),
  CONSTRAINT `results_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `results`
--

LOCK TABLES `results` WRITE;
/*!40000 ALTER TABLE `results` DISABLE KEYS */;
INSERT INTO `results` VALUES (1,8,1,98),(2,8,2,84),(3,8,3,96),(4,8,4,91),(5,8,5,56),(6,8,6,78),(7,8,7,96),(8,8,8,6),(9,8,1,98),(10,8,2,84),(11,8,3,96),(12,8,4,91),(13,8,5,56),(14,8,6,78),(15,8,7,96),(16,8,8,67),(17,8,1,98),(18,8,2,84),(19,8,3,96),(20,8,4,91),(21,8,5,56),(22,8,6,78),(23,8,7,96),(24,8,8,6),(25,8,1,98),(26,8,2,84),(27,8,3,96),(28,8,4,91),(29,8,5,56),(30,8,6,78),(31,8,7,96),(32,8,8,8),(33,8,1,98),(34,8,2,84),(35,8,3,96),(36,8,4,91),(37,8,5,56),(38,8,6,78),(39,8,7,96),(40,8,8,85),(41,8,1,98),(42,8,2,84),(43,8,3,96),(44,8,4,91),(45,8,5,56),(46,8,6,78),(47,8,7,96),(48,8,8,100),(49,8,1,98),(50,8,2,84),(51,8,3,96),(52,8,4,91),(53,8,5,56),(54,8,6,78),(55,8,7,96),(56,8,8,100),(57,8,1,98),(58,8,2,84),(59,8,3,96),(60,8,4,91),(61,8,5,56),(62,8,6,78),(63,8,7,96),(64,8,8,100),(65,8,9,80),(66,8,10,85),(67,8,11,86),(68,8,12,41),(69,8,13,56),(70,8,14,83),(71,8,15,78),(72,8,16,56),(73,9,9,56),(74,9,10,98),(75,9,11,75),(76,9,12,65),(77,9,13,45),(78,9,14,63),(79,9,15,89),(80,9,16,45),(81,18,9,100),(82,18,10,100),(83,18,11,100),(84,18,12,82),(85,18,13,83),(86,18,14,95),(87,18,15,98),(88,18,16,100),(89,19,17,85),(90,19,18,96),(91,19,19,87),(92,19,20,55),(93,19,21,43),(94,19,22,99),(95,19,23,68),(96,19,24,98),(97,19,1,100),(98,19,2,56),(99,19,3,89),(100,19,4,95),(101,19,5,65),(102,19,6,75),(103,19,7,88),(104,19,8,94),(105,19,9,88),(106,19,10,87),(107,19,11,86),(108,19,12,85),(109,19,13,85),(110,19,14,84),(111,19,15,83),(112,19,16,81),(113,19,25,100),(114,19,26,56),(115,19,27,98),(116,19,28,65),(117,19,29,75),(118,19,30,85),(119,19,31,100),(120,19,32,43),(121,19,33,88),(122,19,34,85),(123,19,35,65),(124,19,36,45),(125,19,37,75),(126,19,38,32),(127,19,39,89),(128,19,40,44),(129,19,41,98),(130,19,42,98),(131,19,43,75),(132,19,44,96),(133,19,45,78),(134,19,46,47),(135,19,47,56),(136,19,48,65),(137,19,49,75),(138,19,50,85),(139,19,51,98),(140,19,52,75),(141,19,53,95),(142,19,54,56),(143,19,55,98),(144,19,56,100),(145,19,57,100),(146,19,58,100),(147,19,59,100),(148,19,60,100),(149,19,61,100),(150,19,62,100),(151,19,63,100),(152,19,64,100),(153,19,56,100),(154,19,57,100),(155,19,58,100),(156,19,59,100),(157,19,60,100),(158,19,61,100),(159,19,62,100),(160,19,63,100),(161,19,64,100),(162,22,1,99),(163,22,2,95),(164,22,3,97),(165,22,4,56),(166,22,5,65),(167,22,6,45),(168,22,7,98),(169,22,8,66),(170,23,33,85),(171,23,34,86),(172,23,35,87),(173,23,36,88),(174,23,37,89),(175,23,38,90),(176,23,39,90),(177,23,40,90),(178,25,9,56),(179,25,10,95),(180,25,11,56),(181,25,12,64),(182,25,13,45),(183,25,14,95),(184,25,15,45),(185,25,16,65);
/*!40000 ALTER TABLE `results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `year` int DEFAULT NULL,
  `semester` int DEFAULT NULL,
  `max_marks` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (1,'Engineering Mathematics - I',1,1,100),(2,'Engineering Physics / Engineering Chemistry',1,1,100),(3,'Basic Electronics Engineering / Basic Electrical Engineering',1,1,100),(4,'Engineering Graphics / Engineering Mechanics',1,1,100),(5,'Fundamentals of Programming Languages',1,1,100),(6,'Professional Communication Skills (AEC)',1,1,100),(7,'Manufacturing Practice Workshop / Design Thinking and Idea Lab (VSE)',1,1,100),(8,'Co-Curricular Course - I (CCC)',1,1,100),(9,'Engineering Mathematics - II',1,2,100),(10,'Engineering Chemistry / Engineering Physics',1,2,100),(11,'Basic Electrical Engineering / Basic Electronics Engineering',1,2,100),(12,'Engineering Mechanics / Engineering Graphics',1,2,100),(13,'Programming and Problem Solving (PCC)',1,2,100),(14,'Indian Knowledge System (IKS)',1,2,100),(15,'Design Thinking and Idea Lab / Manufacturing Practice Workshop (VSE)',1,2,100),(16,'Co-Curricular Course - II (CCC)',1,2,100),(17,'Engineering Mathematics - III',2,1,100),(18,'Electronic Circuits',2,1,100),(19,'Digital Circuits',2,1,100),(20,'Electrical Circuits',2,1,100),(21,'Data Structures',2,1,100),(22,'Electronic Circuit Lab',2,1,100),(23,'Digital Circuits Lab',2,1,100),(24,'Electrical Circuit Lab',2,1,100),(25,'Data Structures Lab',2,2,100),(26,'Electronic Skill Development',2,2,100),(27,'Multidisciplinary Minor / Open Elective',2,2,100),(28,'Signals and Systems',2,2,100),(29,'Control Systems',2,2,100),(30,'Principles of Communication Systems',2,2,100),(31,'Object Oriented Programming',2,2,100),(32,'Signals and Control System Lab',2,2,100),(33,'Principles of Communication Systems Lab',3,1,100),(34,'Object Oriented Programming Lab',3,1,100),(35,'Data Analytics Lab',3,1,100),(36,'Employability Skill Development',3,1,100),(37,'Project-Based Learning (PBL)',3,1,100),(38,'Electromagnetic Waves',3,1,100),(39,'Microcontrollers and Applications',3,1,100),(40,'Digital Signal Processing',3,1,100),(41,'Power Electronics',3,2,100),(42,'Elective - I (Computer Networks, Electronic Measurements, etc.)',3,2,100),(43,'EM Waves and Control System Lab',3,2,100),(44,'Digital Signal Processing Lab',3,2,100),(45,'Elective - I Lab',3,2,100),(46,'Mini-Project - I',3,2,100),(47,'Digital Communication',4,1,100),(48,'Computer Organization and Operating Systems',4,1,100),(49,'Communication Networks',4,1,100),(50,'Elective - II (Digital Image Processing, Embedded Processors, etc.)',4,1,100),(51,'Digital Communication Lab',4,1,100),(52,'Power Devices & Circuits Lab',4,1,100),(53,'Elective - II Lab',4,1,100),(54,'Skill Development Lab',4,1,100),(55,'Mandatory Audit Course',4,1,100),(56,'Radiation and Microwave Theory',4,2,100),(57,'VLSI Design and Technology',4,2,100),(58,'Broadband Communication Systems',4,2,100),(59,'Elective - III (Speech Processing, Embedded & RTOS, etc.)',4,2,100),(60,'Elective - IV (Open Elective/Institute Level)',4,2,100),(61,'Laboratory Practice - III',4,2,100),(62,'Laboratory Practice - IV',4,2,100),(63,'Project Stage - I',4,2,100),(64,'Mandatory Audit Course',4,2,100),(65,'Engineering Mathematics - I',NULL,NULL,NULL),(66,'Engineering Physics / Chemistry',NULL,NULL,NULL),(67,'Basic Electrical Engineering',NULL,NULL,NULL),(68,'Programming for Problem Solving',NULL,NULL,NULL),(69,'Engineering Graphics',NULL,NULL,NULL),(70,'Workshop / Manufacturing Practices',NULL,NULL,NULL),(71,'Engineering Chemistry / Physics',NULL,NULL,NULL),(72,'Engineering Mechanics',NULL,NULL,NULL),(73,'Engineering Mathematics - II',NULL,NULL,NULL),(74,'Basic Electronics Engineering',NULL,NULL,NULL),(75,'Engineering Physics / Chemistry - II',NULL,NULL,NULL),(76,'Programming in C',NULL,NULL,NULL),(77,'Engineering Graphics - II',NULL,NULL,NULL),(78,'Environmental Studies',NULL,NULL,NULL),(79,'Basic Civil and Mechanical Engineering',NULL,NULL,NULL),(80,'Basic Electrical and Electronics Engineering',NULL,NULL,NULL),(81,'Engineering Mathematics - III',NULL,NULL,NULL),(82,'Data Structures and Algorithms',NULL,NULL,NULL),(83,'Digital Electronics',NULL,NULL,NULL),(84,'Computer Organization and Architecture',NULL,NULL,NULL),(85,'Discrete Mathematics',NULL,NULL,NULL),(86,'Object Oriented Programming',NULL,NULL,NULL),(87,'Computer Graphics',NULL,NULL,NULL),(88,'Software Engineering',NULL,NULL,NULL),(89,'Engineering Mathematics - IV',NULL,NULL,NULL),(90,'Operating Systems',NULL,NULL,NULL),(91,'Database Management Systems',NULL,NULL,NULL),(92,'Computer Networks',NULL,NULL,NULL),(93,'Microprocessors and Microcontrollers',NULL,NULL,NULL),(94,'Theory of Computation',NULL,NULL,NULL),(95,'Design and Analysis of Algorithms',NULL,NULL,NULL),(96,'Professional Communication Skills',NULL,NULL,NULL),(97,'Machine Learning',NULL,NULL,NULL),(98,'Compiler Design',NULL,NULL,NULL),(99,'Web Technology',NULL,NULL,NULL),(100,'Artificial Intelligence',NULL,NULL,NULL),(101,'Information Security',NULL,NULL,NULL),(102,'Cloud Computing',NULL,NULL,NULL),(103,'Data Mining',NULL,NULL,NULL),(104,'Internet of Things',NULL,NULL,NULL),(105,'Mobile Application Development',NULL,NULL,NULL),(106,'Software Project Management',NULL,NULL,NULL),(107,'Big Data Analytics',NULL,NULL,NULL),(108,'Deep Learning',NULL,NULL,NULL),(109,'Cyber Security',NULL,NULL,NULL),(110,'Advanced Databases',NULL,NULL,NULL),(111,'Parallel and Distributed Systems',NULL,NULL,NULL),(112,'Natural Language Processing',NULL,NULL,NULL),(113,'Blockchain Technology',NULL,NULL,NULL),(114,'Computer Vision',NULL,NULL,NULL),(115,'DevOps',NULL,NULL,NULL),(116,'Digital Image Processing',NULL,NULL,NULL),(117,'Embedded Systems',NULL,NULL,NULL),(118,'High Performance Computing',NULL,NULL,NULL),(119,'Human Computer Interaction',NULL,NULL,NULL),(120,'AR / VR Systems',NULL,NULL,NULL),(121,'Wireless Sensor Networks',NULL,NULL,NULL),(122,'Quantum Computing',NULL,NULL,NULL),(123,'Edge Computing',NULL,NULL,NULL),(124,'Advanced Web Development',NULL,NULL,NULL),(125,'AI Ethics and Policy',NULL,NULL,NULL),(126,'Software Testing and QA',NULL,NULL,NULL),(127,'Entrepreneurship and Innovation',NULL,NULL,NULL),(128,'Research Methodology',NULL,NULL,NULL),(129,'Final Year Project',NULL,NULL,NULL);
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('student','faculty') NOT NULL,
  `cgpa` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'user1','user1@gmail.com','$2b$10$5FK92aVBSb2h4lg.aDj1w.ZDx89o.pJZt8VPgDPqOZyaUsx3JFImy','student',NULL),(4,'faculty1','faculty1@gmail.com','$2b$10$qWXw.z21wmjtzPrwxjbtN.c7cfygNjEqb/nrs7r7Gbl4gBWPdTWBy','faculty',NULL),(5,'test','test@gmail.com','1234','student',NULL),(8,'Alice Johnson','alice.johnson@gmail.com','$2b$10$abcdefghijk1234567890examplehash','student',8.10),(9,'Bob Smith','bob.smith@gmail.com','$2b$10$abcdefghijk1234567890examplehash','student',6.70),(10,'Charlie Brown','charlie.brown@gmail.com','$2b$10$abcdefghijk1234567890examplehash','student',NULL),(11,'David Williams','david.williams@gmail.com','$2b$10$abcdefghijk1234567890examplehash','student',NULL),(12,'Eva Davis','eva.davis@gmail.com','$2b$10$abcdefghijk1234567890examplehash','student',NULL),(13,'Frank Miller','frank.miller@gmail.com','$2b$10$abcdefghijk1234567890examplehash','student',NULL),(14,'Grace Lee','grace.lee@gmail.com','$2b$10$abcdefghijk1234567890examplehash','student',NULL),(15,'Hannah Wilson','hannah.wilson@gmail.com','$2b$10$abcdefghijk1234567890examplehash','student',NULL),(16,'Ian Thompson','ian.thompson@gmail.com','$2b$10$abcdefghijk1234567890examplehash','student',NULL),(17,'Julia Martinez','julia.martinez@gmail.com','$2b$10$abcdefghijk1234567890examplehash','student',NULL),(18,'rehan','rehan@gmail.com','1234','student',9.47),(19,'Rehan1','rehan1@gmail.com','$2b$10$KR1cmq.O6o9Gz8QU2MYp2eiENlU6ovc6FwtSWFDv3CX4eBVdEfqvW','student',8.14),(20,'shivam','shivam@gmail.com','$2b$10$L0UE2zHLsRsR.9EBXoTyleTeC2OjQUKtAd7JMAHPaD8d2jN1J8n9u','student',NULL),(21,'user3','user3@gmail.com','$2b$10$EIQdOsli0sIp1l5z6zrj7OLA4PBMXHYtq3k3JSBDSH5HwQXXNC0zO','student',NULL),(22,'preet','preet@gmail.com','1234','student',7.76),(23,'preeti','preeti@gmail.com','1234','student',8.81),(25,'shivam','shivam1@gmail.com','$2b$10$XPTH0jc4VkaRMd6r3W0VVeeiLgeQMPYwRUlyyScAvvN.yPJo3KUk.','student',6.51);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-12  8:44:57

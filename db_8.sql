-- Adminer 4.2.2 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `info`;
CREATE TABLE `info` (
  `info` varchar(64) NOT NULL,
  `value` varchar(32) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `info` (`info`, `value`) VALUES
('totalRed',	'97344'),
('totalBlack',	'95748'),
('totalGreen',	'8261'),
('betRed',	'0'),
('betBlack',	'0'),
('betGreen',	'0'),
('siteBank',	'-68.75000000000001'),
('rNum',	'7'),
('total',	'48052'),
('winRed',	'4992'),
('winBlack',	'4037'),
('winGreen',	'409'),
('totalWithdraw',	'69854'),
('76561198165166792',	'43'),
('76561198254133720',	'2');

DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `assetid` bigint(11) NOT NULL,
  `classid` bigint(11) NOT NULL,
  `instanceid` bigint(11) NOT NULL DEFAULT '0',
  `name` varchar(128) NOT NULL,
  `img` varchar(512) NOT NULL,
  `price` int(11) NOT NULL,
  `bot` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `steamid` varchar(64) NOT NULL,
  `name` varchar(128) NOT NULL,
  `img` varchar(512) NOT NULL,
  `tradetoken` varchar(16) NOT NULL DEFAULT 'notoken',
  `bet` varchar(32) NOT NULL DEFAULT 'nobet',
  `betamount` int(11) NOT NULL DEFAULT '0',
  `balance` float NOT NULL DEFAULT '0',
  `totalbets` int(11) NOT NULL DEFAULT '0',
  `refbet` int(11) NOT NULL DEFAULT '0',
  `refearnings` int(11) NOT NULL DEFAULT '0',
  `ref` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  `ref_code` varchar(8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- 2016-02-18 18:21:56

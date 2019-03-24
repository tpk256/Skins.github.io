-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Апр 23 2016 г., 13:07
-- Версия сервера: 5.5.47-0ubuntu0.14.04.1
-- Версия PHP: 5.5.9-1ubuntu4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `csgoarrow`
--

-- --------------------------------------------------------

--
-- Структура таблицы `info`
--

CREATE TABLE IF NOT EXISTS `info` (
  `info` varchar(64) NOT NULL,
  `value` varchar(32) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `info`
--

INSERT INTO `info` (`info`, `value`) VALUES
('totalRed', '3964'),
('totalBlack', '6741'),
('totalGreen', '131'),
('betRed', '0'),
('betBlack', '0'),
('betGreen', '0'),
('siteBank', '5114.35'),
('rNum', '98'),
('total', '1107'),
('winRed', '194'),
('winBlack', '294'),
('winGreen', '29'),
('totalWithdraw', '29'),
('76561198161525740', '2');

-- --------------------------------------------------------

--
-- Структура таблицы `items`
--

CREATE TABLE IF NOT EXISTS `items` (
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `items`
--

INSERT INTO `items` (`id`, `assetid`, `classid`, `instanceid`, `name`, `img`, `price`, `bot`, `status`) VALUES
(1, 5838526349, 1626193522, 188530139, 'Sticker | device | MLG Columbus 2016', '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulReQ0DFSua4xJ2DAgs7Ng1Qib6gPQ5j1r2dd2tBtIm3ltGPlvOtZumElzhT7JIi0-uY89Sn21W1r0VuNjj0J9fAbEZgNqtxCk-w', 63, 0, 0),
(3, 5838525804, 1626194253, 143865972, 'Sticker | Natus Vincere | MLG Columbus 2016', '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulReQ0DFSua4xJ2DAgs7KwVBv_SnKVQ2gfHKIG8WtIjkwdSPxfGjMuLSwjNSv5113u3E8YjxjQO1_xE_fSmtczwXDJqO', 38, 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE IF NOT EXISTS `users` (
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `steamid`, `name`, `img`, `tradetoken`, `bet`, `betamount`, `balance`, `totalbets`, `refbet`, `refearnings`, `ref`, `status`, `ref_code`) VALUES
(1, '76561198208479219', 'Chibaku Tensei', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/cf/cfb0bbdb5ce05e947a3526c1fce3581723389c44_full.jpg', 'RcDV8Mmj', 'nobet', 0, 185.5, 11021, 4913, 0, 2, 0, 'O3kUTB'),
(3, '76561198168642753', 'NYA :3', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/5b/5bae9c7bb26da5f608226ce6c319417d2c365c51_full.jpg', 'notoken', 'nobet', 0, 54, 40, 0, 0, 0, 0, 'KlBK9F'),
(4, '76561198224566048', 'AnimeAvatar', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/6c/6cb74d21559d57af9752bcd833dc79346d21cdea_full.jpg', 'notoken', 'nobet', 0, 0, 0, 0, 0, 0, 0, 'JHyq3E');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

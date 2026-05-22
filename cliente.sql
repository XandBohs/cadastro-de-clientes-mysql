-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 04-Jul-2022 às 23:38
-- Versão do servidor: 8.0.27
-- versão do PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `cliente`
--

USE `cliente`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `dadoscliente`
--

CREATE TABLE IF NOT EXISTS `dadoscliente` (
	`id` int NOT NULL AUTO_INCREMENT,
	`nome` varchar(120) NOT NULL,
	`email` varchar(120) NOT NULL,
	`telefone` varchar(20) NOT NULL,
	`dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `dadoscliente`
--

INSERT INTO `dadoscliente` (`id`, `nome`, `email`, `telefone`, `dt`) VALUES
(1, 'Brunno Henrique Vilas Boas', 'brunnohenrique50@gmail.com', '(62) 99999-9999', '2022-07-04 22:33:43'),
(3, 'Jose Santos Silva', 'teste@gmail.com', '(62) 99888-8888', '2022-07-04 22:38:12'),
(4, 'Matheusaa', 'testematheus@gmail.com', '(62) 99777-7777', '2022-07-04 22:39:41'),
(5, 'Jorge', 'jorgeteste@gmail.com', '(62) 99333-3333', '2022-07-04 22:55:31')
ON DUPLICATE KEY UPDATE
`nome` = VALUES(`nome`),
`email` = VALUES(`email`),
`telefone` = VALUES(`telefone`),
`dt` = VALUES(`dt`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

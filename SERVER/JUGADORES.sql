CREATE TABLE `PLAYERS` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre completo` varchar(50) DEFAULT 'NO RESGISTRADO',
  `Fecha de nacimiento` varchar(20) DEFAULT 'NO RESGISTRADO',
  `Edad` int(3) DEFAULT '0',
  `Lugar de nacimiento` varchar(100) DEFAULT 'NO RESGISTRADO',
  `País de nacimiento` varchar(50) DEFAULT 'NO RESGISTRADO',
  `Demarcación` varchar(20) DEFAULT 'NO RESGISTRADO',
  `Foto` longblob,
  `Equipo` varchar(30) DEFAULT 'NO RESGISTRADO',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2129 DEFAULT CHARSET=utf8
INSERT INTO `users` (`Username`, `Password`, `Name`, `Surname`, `ProfilePic`, `Birthday`, `SignupDate`, `NumberOfPosts`, `NumberOfFriends`) VALUES
('amadeus', '$2y$10$N.RAoMTC/sWahoyzl35DquQYX9xp/f0KwsqunEqT1OgmXVV6AW/ve', 'Amedeo', 'Sebastiani', 'amadeus.jpeg', '1962-09-04', '2023-02-12', 0, 5),
('blanchitobebe', '$2y$10$1FYUSFEqKCjZqdpDR9IwLO8wIE7mLzhXoHiFZGtF5PeL1Zlhjnu5C', 'Blanco', 'Michelangelo', 'blanchitobebe.jpeg', '2003-02-10', '2023-02-12', 2, 1),
('cantodellanima', '$2y$10$NtdwmYVNLY2hO8kmTS6ng.wnDOALLkZj917ks6N8H2cpf5shAe3GK', 'Anna', 'Oxa', 'cantodellanima.jpeg', '1961-04-28', '2023-02-12', 1, 1),
('cugini', '$2y$10$CNJK3Fjr7OzrhYYLvXunXu57x1Ao6A/Rb5pvsvE9wXSJ8kVGaaBlW', 'Cugini', 'Campagna', 'cugini.jpeg', '1970-05-15', '2023-02-13', 0, 2),
('fotodianna', '$2y$10$D7VAy16skzk0lqZuABtxk.5ozkRlsD0.HmhH7cjFL0sw4QqxtMtJ2', 'Gianni', 'Morandi', 'fotodianna.jpeg', '1944-12-11', '2023-02-12', 1, 2),
('lazza', '$2y$10$kDfThbI1d./9p9vuaDfPrOdRPMZNOEr2UHZ.i22pItKuBgWux6RB.', 'Jacopo', 'Lazzarini', 'lazza.jpeg', '1994-08-22', '2023-02-12', 1, 0),
('madame', '$2y$10$Ytx.IiYOXqK03ctx8T9KnOHzEujdQMiEd/IvIWKeZPCaqE8cOUukS', 'Francesca', 'Calearo', 'madame.jpeg', '2002-01-16', '2023-02-12', 0, 2),
('marcomengo', '$2y$10$1hveAyfZW/KWiECtzbUmzumaW/NFMjtla0imLy5Bc1dPzghYA2X5e', 'Marco', 'Mengoni', 'marcomengo.jpeg', '1988-12-25', '2023-02-12', 0, 2),
('polka', '$2y$10$Qmxsvy1/cX3JTFSMG3IuHeNW0pL1ScYovcXn1mmgcyLLxgfpPWDNu', 'Rosa', 'Chemical', 'polka.jpeg', '1998-01-30', '2023-02-12', 1, 3),
('tananai', '$2y$10$8jbiT1OjrpczaIIyRqMckO4LLaryEqFEIwaMmXCuEBkqfqmO99MQ.', 'Alberto', 'Cotta', 'tananai.jpeg', '1995-05-08', '2023-02-12', 1, 3),
('ultimo', '$2y$10$sxZVN4/lbJ..TDcRLH9/Eu7T6pHYTbF3yA.MmgCMlpamZHiEnYCIi', 'Niccolo', 'Moriconi', 'ultimo.jpeg', '1996-01-27', '2023-02-12', 1, 0),
('ziocolla', '$2y$10$EhxwC0BXo86yF0sWRq1p/eFUzKnJMq7lBjOMILXhGpm099kx1bTbe', 'Colla', 'Zio', 'ziocolla.jpeg', '2019-01-01', '2023-02-12', 0, 1);

INSERT INTO `posts` (`PostID`, `Title`, `Content`, `DateAndTime`, `NumberOfComments`, `Writer`) VALUES
(9, 'Made In Italy', 'Voglio morire da italiano!', '2023-02-12 23:20:34', 0, 'polka'),
(10, 'Quinto a sanremo yeeee', 'Piaccio alle mamme', '2023-02-12 23:28:32', 0, 'tananai'),
(11, 'Secondo lesgo', 'Domino la scena italiana', '2023-02-12 23:31:14', 0, 'lazza'),
(12, 'bicchiere gate', 'non ho tirato nessun bicchiere a madame!', '2023-02-12 23:32:36', 0, 'cantodellanima'),
(13, 'sanremo 2022', 'stai andando forte, apri tutte le porte o vai incontro alla morte?', '2023-02-12 23:39:52', 0, 'fotodianna'),
(14, 'quarto uffi', 'gli ultimi non vincono mai :(', '2023-02-12 23:47:29', 0, 'ultimo'),
(15, 'sono pazzo', 'non mi potete dire cosa devo fare, non sentivo e ho spaccato tutto', '2023-02-13 00:05:23', 0, 'blanchitobebe'),
(16, 'Mi scuso...', 'Chiedo scusa al festival e anche ad Ama', '2023-02-13 00:05:50', 0, 'blanchitobebe');

INSERT INTO `favorites` (`User`, `Post`, `DateAndTime`) VALUES
('amadeus', 9, '2023-02-12 23:34:06'),
('cugini', 10, '2023-02-13 00:02:49'),
('cugini', 11, '2023-02-13 00:02:47'),
('cugini', 12, '2023-02-13 00:02:46'),
('fotodianna', 11, '2023-02-12 23:40:04'),
('lazza', 9, '2023-02-12 23:54:11'),
('lazza', 13, '2023-02-12 23:54:32'),
('lazza', 14, '2023-02-12 23:54:09'),
('ziocolla', 9, '2023-02-12 23:43:09');

INSERT INTO `rating_categories` (`Name`, `Description`) VALUES
('thoughtfulness', 'Something that makes you think and see things under a different light'),
('advice', 'Something you can use in everyday life or that can be useful for the future'),
('ideas', 'Something that can spark a change and inspire people to create'),
('humour','Something funny or light-hearted');

INSERT INTO `ratings` (`RatingID`, `DateAndTime`, `Category`, `Rater`, `Post`) VALUES
(45, '2023-02-12 23:34:03', 'thoughtfulness', 'amadeus', 10),
(46, '2023-02-12 23:34:10', 'humour', 'amadeus', 9),
(47, '2023-02-12 23:42:58', 'ideas', 'ziocolla', 12),
(48, '2023-02-12 23:43:05', 'advice', 'ziocolla', 11),
(49, '2023-02-12 23:48:07', 'humour', 'ultimo', 9),
(50, '2023-02-12 23:49:56', 'humour', 'marcomengo', 13),
(51, '2023-02-12 23:50:02', 'thoughtfulness', 'marcomengo', 12),
(52, '2023-02-13 00:02:52', 'advice', 'cugini', 10);

INSERT INTO `points` (`User`, `Category`, `Points`) VALUES
('cantodellanima', 'ideas', 1),
('cantodellanima', 'thoughtfulness', 1),
('fotodianna', 'humour', 1),
('lazza', 'advice', 1),
('polka', 'humour', 2),
('tananai', 'advice', 1),
('tananai', 'thoughtfulness', 1);

INSERT INTO `friendships` (`FriendshipID`, `Requesting_user`, `Requested_user`, `RequestDate`, `FriendsSince`, `FriendsUntil`) VALUES
(40, 'polka', 'madame', '2023-02-12', '2023-02-12', NULL),
(41, 'polka', 'marcomengo', '2023-02-12', '2023-02-12', NULL),
(42, 'polka', 'tananai', '2023-02-12', NULL, NULL),
(44, 'polka', 'amadeus', '2023-02-12', '2023-02-12', NULL),
(45, 'cantodellanima', 'amadeus', '2023-02-12', '2023-02-12', '2023-02-13'),
(46, 'cantodellanima', 'fotodianna', '2023-02-12', '2023-02-13', NULL),
(47, 'tananai', 'ultimo', '2023-02-12', NULL, NULL),
(48, 'tananai', 'amadeus', '2023-02-12', '2023-02-12', NULL),
(49, 'tananai', 'fotodianna', '2023-02-12', '2023-02-12', '2023-02-13'),
(50, 'tananai', 'madame', '2023-02-12', '2023-02-12', NULL),
(51, 'tananai', 'marcomengo', '2023-02-12', '2023-02-12', NULL),
(52, 'tananai', 'lazza', '2023-02-12', '2023-02-12', '2023-02-12'),
(53, 'ziocolla', 'amadeus', '2023-02-12', '2023-02-12', NULL),
(55, 'ziocolla', 'marcomengo', '2023-02-12', NULL, NULL),
(56, 'amadeus', 'ultimo', '2023-02-12', NULL, NULL),
(57, 'blanchitobebe', 'amadeus', '2023-02-12', '2023-02-13', NULL),
(58, 'blanchitobebe', 'lazza', '2023-02-12', NULL, NULL),
(59, 'cugini', 'fotodianna', '2023-02-13', '2023-02-13', NULL),
(60, 'cugini', 'amadeus', '2023-02-13', '2023-02-13', NULL),
(61, 'fotodianna', 'tananai', '2023-02-13', NULL, NULL),
(62, 'fotodianna', 'amadeus', '2023-02-13', NULL, NULL);

INSERT INTO `notifications` (`NotificationID`, `Comment`, `Rating`, `Read`, `Notified_user`) VALUES
(65, NULL, 45, 0, 'tananai'),
(66, NULL, 46, 1, 'polka'),
(67, NULL, 47, 1, 'cantodellanima'),
(68, NULL, 48, 1, 'lazza'),
(69, NULL, 49, 0, 'polka'),
(70, NULL, 50, 1, 'fotodianna'),
(71, NULL, 51, 1, 'cantodellanima'),
(72, NULL, 52, 0, 'tananai');
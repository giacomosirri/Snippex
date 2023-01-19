INSERT INTO `users` (`Username`, `Password`, `Name`, `Surname`, `ProfilePic`, `Birthday`, `SignupDate`, `NumberOfPosts`, `NumberOfFriends`) VALUES
('jaaack', 'jack1', 'Giacomo', 'Sirri', 'jaaack.jpg', '2001-03-09', '2022-12-21', 1, 7),
('zava', 'zavazavatta', 'Andrea', 'Zavatta', 'zava.jpg', '2001-03-31', '2023-01-18', 0, 4),
('paso', 'pasopasini', 'Luca', 'Pasini', 'paso.png', '2001-09-12', '2023-01-18', 0, 5),
('rob', 'bobrob', 'Roberto', 'Sopranzetti', 'rob.png', '2001-07-04', '2023-01-18', 0, 1),
('sergio', 'sergiuu', 'Sergiu', 'Barba', 'sergio.png', '2001-10-06', '2023-01-18', 0, 7),
('lollo', 'loooollo', 'Lorenzo', 'Cassinari', 'lollo.png', '2001-12-04', '2023-01-18', 0, 3),
('giulio', 'giulione', 'Giulio', 'Ceccaroni', 'giulio.jpg', '2001-02-11', '2023-01-18', 0, 3),
('m!shel', 'm?s*el1', 'Mishel', 'Nishku', 'm!shel.png', '2001-09-12', '2023-01-18', 1, 4),
('jenna69', 'jennaortega', 'Jenna', 'Ortega', 'jenna69.png', '2002-09-27', '2023-01-18', 0, 1),
('therock', 'laroccia10', 'Dwayne', 'Johnson', 'therock.jpeg', '1972-05-02', '2023-01-18', 0, 1),
('topg', 'atate', 'Andrew', 'Tate', 'topg.jpg', '1986-12-01', '2023-01-18', 1, 1),
('greta', 'savetheplanet', 'Greta', 'Thunberg', 'greta.png', '2003-01-03', '2023-01-18', 0, 0),
('mark', 'abbondiamolo', 'Marco', 'Antolini', 'mark.png', '2001-12-04', '2023-01-18', 0, 2),
('lorytosi', 'lorenz', 'Lorenzo', 'Tosi', 'lorytosi.jpg', '2001-12-01', '2023-01-18', 1, 0),
('sined', 'riminimerda', 'Denis', 'Caushaj', 'sined.png', '2000-09-08', '2023-01-18', 1, 0),
('angelina', 'angieee', 'Angela', 'Speranza', 'angelina.png', '2002-02-13', '2023-01-18', 0, 1);

INSERT INTO `posts` (`PostID`, `Title`, `Content`, `DateAndTime`, `NumberOfComments`, `Writer`) VALUES
(1, 'you know', 'Fuck greta!', '2023-01-18 14:04:00', 1, 'topg'),
(2, 'la mia storia', 'Il babbo di un mio amico si è suicidato', '2023-01-18 14:05:00', 3, 'm!shel'),
(3, 'jenna ortega fa cagare', 'just speaking facts', '2023-01-18 14:15:00', 6, 'lorytosi'),
(4, 'cani>gatti', 'qualcuno doveva pur dirlo', '2023-01-18 16:02:00', 2, 'jaaack'),
(5, 'ho droppato', 'andate ad ascoltare la mia nuova hit brodies', '2023-01-20 08:25:00', 4, 'sined');

INSERT INTO `comments` (`CommentID`, `Content`, `DateAndTime`, `User`, `Post`) VALUES
(1, 'I agree bro you are the best', '2023-01-18 14:04:55', 'sergio', 1),
(2, 'che cazzo di problemi ha questo qui', '2023-01-18 16:05:10', 'rob', 2),
(3, 'ma chi te lo ha chiesto', '2023-01-18 18:16:10', 'mark', 2),
(4, 'sparati', '2023-01-19 01:02:31', 'angelina', 2),
(5, 'se vabbè', '2023-01-19 00:10:31', 'zava', 3),
(6, 'bro fatti curare hahah', '2023-01-18 15:53:49', 'lollo', 3),
(7, 'ma che cazzo dici', '2023-01-18 19:44:42', 'paso', 3),
(8, 'c\'hai ragione non ascoltarli', '2023-01-19 15:11:12', 'jaaack', 3),
(9, 'I\'m better than that scum', '2023-01-18 22:55:38', 'greta', 3),
(10, 'you wish greta', '2023-01-18 23:11:56', 'topg', 3),
(11, 'NO :<', '2023-01-19 02:25:19', 'angelina', 4),
(12, 'bravo', '2023-01-19 06:51:39', 'giulio', 4),
(13, 'spacca', '2023-01-20 08:26:15', 'mark', 5),
(14, 'bella bro', '2023-01-20 08:55:58', 'lorytosi', 5),
(15, 'tvb', '2023-01-20 08:57:01', 'angelina', 5),
(16, 'ok', '2023-01-20 09:25:25', 'm!shel', 5);

INSERT INTO `favorites` (`User`, `Post`, `DateAndTime`) VALUES
('sergio', 1, '2023-01-18 14:04:58'),
('jaaack', 5, '2023-01-19 15:16:10'),
('zava', 5, '2023-01-19 16:12:52'),
('paso', 5, '2023-01-19 16:32:32');

INSERT INTO `rating_categories` (`Name`, `Description`) VALUES
('thoughtfulness', 'Something that makes you think and see things under a different light'),
('advice', 'Something you can use in everyday life or that can be useful for the future'),
('ideas', 'Something that can spark a change and inspire people to create'),
('humour','Something funny or light-hearted');

INSERT INTO `ratings` (`RatingID`, `DateAndTime`, `Category`, `Rater`, `Post`) VALUES
(1, '2023-01-18 14:05:11', 'thoughtfulness', 'sergio', 1),
(2, '2023-01-20 10:56:42', 'humour', 'paso', 3),
(3, '2023-01-21 15:52:23', 'humour', 'rob', 3),
(4, '2023-01-21 20:18:11', 'thoughtfulness', 'jaaack', 3);

INSERT INTO `points` (`User`, `Category`, `Points`) VALUES
('topg', 'thoughtfulness', 1),
('lorytosi', 'thoughtfulness', 1),
('lorytosi', 'humour', 2);

INSERT INTO `friendships` (`User1`, `User2`, `RequestDate`, `FriendshipDate`) VALUES
('topg', 'sergio', '2023-01-18', '2023-01-18'),
('zava', 'sergio', '2023-01-18', '2023-01-18'),
('paso', 'sergio', '2023-01-18', '2023-01-18'),
('jaaack', 'sergio', '2023-01-18', '2023-01-18'),
('giulio', 'sergio', '2023-01-18', '2023-01-18'),
('lollo', 'sergio', '2023-01-18', '2023-01-18'),
('mark', 'sergio', '2023-01-18', '2023-01-18'),
('zava', 'jaaack', '2023-01-18', '2023-01-18'),
('paso', 'jaaack', '2023-01-18', '2023-01-18'),
('giulio', 'jaaack', '2023-01-18', '2023-01-18'),
('angelina', 'jaaack', '2023-01-18', '2023-01-18'),
('lollo', 'jaaack', '2023-01-18', '2023-01-18'),
('rob', 'jaaack', '2023-01-18', '2023-01-18'),
('zava', 'paso', '2023-01-18', '2023-01-18'),
('paso', 'therock', '2023-01-18', '2023-01-18'),
('paso', 'jenna69', '2023-01-18', '2023-01-18'),
('zava', 'jenna69', '2023-01-18', '2023-01-18'),
('lollo', 'jenna69', '2023-01-18', '2023-01-18'),
('therock', 'jenna69', '2023-01-18', '2023-01-18'),
('mark', 'giulio', '2023-01-18', '2023-01-18');

INSERT INTO `notifications` (`NotificationID`, `Comment`, `Rating`, `Read`, `Notified_user`) VALUES
(1, 1, NULL, FALSE, 'topg'),
(2, 2, NULL, FALSE, 'm!shel'),
(3, 3, NULL, FALSE, 'm!shel'),
(4, 4, NULL, FALSE, 'm!shel'),
(5, 5, NULL, FALSE, 'lorytosi'),
(6, 6, NULL, TRUE, 'lorytosi'),
(7, 7, NULL, FALSE, 'lorytosi'),
(8, 8, NULL, FALSE, 'lorytosi'),
(9, 9, NULL, FALSE, 'lorytosi'),
(10, 10, NULL, FALSE, 'lorytosi'),
(11, 11, NULL, FALSE, 'jaaack'),
(12, 12, NULL, FALSE, 'jaaack'),
(13, 13, NULL, FALSE, 'sined'),
(14, 14, NULL, FALSE, 'sined'),
(15, 15, NULL, FALSE, 'sined'),
(16, 16, NULL, FALSE, 'sined'),
(17, NULL, 1, FALSE, 'sined'),
(18, NULL, 2, FALSE, 'lorytosi'),
(19, NULL, 3, TRUE, 'lorytosi'),
(20, NULL, 4, FALSE, 'lorytosi');
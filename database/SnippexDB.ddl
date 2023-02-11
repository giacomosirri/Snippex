-- *********************************************
-- * SQL MySQL generation                      
-- *--------------------------------------------
-- * DB-MAIN version: 11.0.2              
-- * Generator date: Sep 14 2021              
-- * Generation date: Tue Dec 13 09:28:21 2022 
-- * LUN file: C:\Users\sirri\Desktop\Coding\3-1--WEB\Progetto\SnippexDB.lun 
-- * Schema: Logic/1 
-- ********************************************* 


-- Database Section
-- ________________ 

create database snippex;
use snippex;


-- Tables Section
-- _____________ 

create table comments (
     CommentID int not null auto_increment,
     Content longtext not null,
     DateAndTime datetime not null,
     User char(40) not null,
     Post int not null,
     constraint IDCOMMENT_ID primary key (CommentID));

create table favorites (
     User char(40) not null,
     Post int not null,
     DateAndTime datetime not null,
     constraint IDFAVORITE primary key (User, Post));

create table friendships (
     FriendshipID int not null auto_increment,
     Requesting_user char(40) not null,
     Requested_user char(40) not null,
     RequestDate date not null,
     FriendsSince date,
     FriendsUntil date,
     constraint IDfriendship primary key (FriendshipID));

create table notifications (
     NotificationID int not null auto_increment,
     Comment int,
     Rating int,
     `Read` boolean not null,
     Notified_user char(40) not null,
     constraint IDNOTIFICATION primary key (NotificationID),
     constraint FKabout_ID unique (Comment),
     constraint FKabout_1_ID unique (Rating));

create table points (
     User char(40) not null,
     Category char(50) not null,
     Points int not null,
     constraint IDpoints primary key (User, Category));

create table posts (
     PostID int not null auto_increment,
     Title char(150) not null,
     Content longtext not null,
     DateAndTime datetime not null,
     NumberOfComments int not null,
     Writer char(40) not null,
     constraint IDPOST primary key (PostID));

create table ratings (
     RatingID int not null auto_increment,
     DateAndTime datetime not null,
     Category char(50) not null,
     Rater char(40) not null,
     Post int not null,
     constraint IDRATING_ID primary key (RatingID),
     constraint IDRATING_1 unique (Rater, Post));

create table rating_categories (
     Name char(50) not null,
     Description longtext not null,
     constraint IDRATING_TYPE primary key (Name));

create table users (
     Username char(40) not null,
     Password char(100) not null,
     Name char(80) not null,
     Surname char(80) not null,
     ProfilePic char(200),
     Birthday date not null,
     SignupDate date not null,
     NumberOfPosts int not null,
     NumberOfFriends int not null,
     constraint IDUSER primary key (Username));


-- Constraints Section
-- ___________________ 

alter table comments add constraint FKwrites
     foreign key (User)
     references users (Username);

alter table comments add constraint FKunder
     foreign key (Post)
     references posts (PostID);

-- Not implemented
-- alter table comments add constraint IDCOMMENT_CHK
--     check(exists(select * from NOTIFICATIONS
--                  where NOTIFICATIONS.Comment = CommentID)); 

alter table favorites add constraint FKR_1
     foreign key (Post)
     references posts (PostID);

alter table friendships add constraint FKfri_USE
     foreign key (Requested_user)
     references users (Username);

alter table friendships add constraint FKFRIEND
     foreign key (Requesting_user)
     references users (Username);

alter table notifications add constraint FKreceives
     foreign key (Notified_user)
     references users (Username);

alter table notifications add constraint FKabout_FK
     foreign key (Comment)
     references comments (CommentID);

alter table notifications add constraint FKabout_1_FK
     foreign key (Rating)
     references ratings (RatingID);

alter table points add constraint FKpoi_RAT
     foreign key (Category)
     references rating_categories (Name);

alter table points add constraint FKpoi_USE
     foreign key (User)
     references users (Username);

alter table posts add constraint FKposts
     foreign key (Writer)
     references users (Username);

-- Not implemented
-- alter table ratings add constraint IDRATING_CHK
--     check(exists(select * from NOTIFICATIONS
--                  where NOTIFICATIONS.Rating = RatingID)); 

alter table ratings add constraint FKof
     foreign key (Category)
     references rating_categories (Name);

alter table ratings add constraint FKposts_1
     foreign key (Rater)
     references users (Username);

alter table ratings add constraint FKrelated
     foreign key (Post)
     references posts (PostID);

alter table favorites add constraint FKR
     foreign key (User)
     references posts (Writer);
-- Index Section
-- _____________ 


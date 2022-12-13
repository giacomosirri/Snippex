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

create table COMMENT (
     CommentID int not null,
     Content char(2000) not null,
     DateAndTime date not null,
     User char(40) not null,
     Post int not null,
     constraint IDCOMMENT_ID primary key (CommentID));

create table FAVORITE (
     User char(40) not null,
     Post int not null,
     DateAndTime date not null,
     constraint IDFAVORITE primary key (User, Post));

create table FRIENDSHIP (
     User1 char(40) not null,
     User2 char(40) not null,
     RequestDate date not null,
     FriendshipDate date,
     constraint IDfriendship primary key (User1, User2));

create table NOTIFICATION (
     NotificationID int not null,
     Comment int,
     Rating int,
     `Read` char not null,
     Notified_user char(40) not null,
     constraint IDNOTIFICATION primary key (NotificationID),
     constraint FKabout_ID unique (Comment),
     constraint FKabout_1_ID unique (Rating));

create table POINTS (
     User char(40) not null,
     Category char(50) not null,
     Points int not null,
     constraint IDpoints primary key (User, Category));

create table POST (
     PostID int not null,
     Title char(150) not null,
     Content char(10000) not null,
     DateAndTime date not null,
     NumberOfComments int not null,
     Writer int not null,
     constraint IDPOST primary key (PostID));

create table RATING (
     RatingID int not null,
     DateAndTime date not null,
     Category char(50) not null,
     Rater char(40) not null,
     Post int not null,
     constraint IDRATING_ID primary key (RatingID),
     constraint IDRATING_1 unique (Rater, Post));

create table RATING_CATEGORY (
     Name char(50) not null,
     Description char(1000) not null,
     constraint IDRATING_TYPE primary key (Name));

create table `USER` (
     Username char(40) not null,
     Password char(40) not null,
     Name char(80) not null,
     Surname char(80) not null,
     Birthday date not null,
     SignupDate date not null,
     NumberOfPosts int not null,
     NumberOfFriends int not null,
     constraint IDUSER primary key (Username));


-- Constraints Section
-- ___________________ 

alter table COMMENT add constraint FKwrites
     foreign key (User)
     references USER (Username);

alter table COMMENT add constraint FKunder
     foreign key (Post)
     references POST (PostID);

-- Not implemented
-- alter table COMMENT add constraint IDCOMMENT_CHK
--     check(exists(select * from NOTIFICATION
--                  where NOTIFICATION.Comment = CommentID)); 

alter table FAVORITE add constraint FKR
     foreign key (User)
     references USER (Username);

alter table FAVORITE add constraint FKR_1
     foreign key (Post)
     references POST (PostID);

alter table FRIENDSHIP add constraint FKfri_USE
     foreign key (User2)
     references USER (Username);

alter table FRIENDSHIP add constraint FKFRIEND
     foreign key (User1)
     references USER (Username);

alter table NOTIFICATION add constraint FKreceives
     foreign key (Notified_user)
     references USER (Username);

alter table NOTIFICATION add constraint FKabout_FK
     foreign key (Comment)
     references COMMENT (CommentID);

alter table NOTIFICATION add constraint FKabout_1_FK
     foreign key (Rating)
     references RATING (RatingID);

alter table POINTS add constraint FKpoi_RAT
     foreign key (Category)
     references RATING_CATEGORY (Name);

alter table POINTS add constraint FKpoi_USE
     foreign key (User)
     references USER (Username);

alter table POST add constraint FKposts
     foreign key (Writer)
     references USER (Username);

-- Not implemented
-- alter table RATING add constraint IDRATING_CHK
--     check(exists(select * from NOTIFICATION
--                  where NOTIFICATION.Rating = RatingID)); 

alter table RATING add constraint FKof
     foreign key (Category)
     references RATING_CATEGORY (Name);

alter table RATING add constraint FKposts
     foreign key (Rater)
     references USER (Username);

alter table RATING add constraint FKrelated
     foreign key (Post)
     references POST (PostID);


-- Index Section
-- _____________ 


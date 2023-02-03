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

create table COMMENTS (
     CommentID int not null auto_increment,
     Content longtext not null,
     DateAndTime datetime not null,
     User char(40) not null,
     Post int not null,
     constraint IDCOMMENT_ID primary key (CommentID));

create table FAVORITES (
     User char(40) not null,
     Post int not null,
     DateAndTime datetime not null,
     constraint IDFAVORITE primary key (User, Post));

create table FRIENDSHIPS (
     FriendshipID int not null auto_increment,
     Requesting_user char(40) not null,
     Requested_user char(40) not null,
     RequestDate date not null,
     FriendsSince date,
     FriendsUntil date,
     constraint IDfriendship primary key (FriendshipID));

create table NOTIFICATIONS (
     NotificationID int not null auto_increment,
     Comment int,
     Rating int,
     `Read` boolean not null,
     Notified_user char(40) not null,
     constraint IDNOTIFICATION primary key (NotificationID),
     constraint FKabout_ID unique (Comment),
     constraint FKabout_1_ID unique (Rating));

create table POINTS (
     User char(40) not null,
     Category char(50) not null,
     Points int not null,
     constraint IDpoints primary key (User, Category));

create table POSTS (
     PostID int not null auto_increment,
     Title char(150) not null,
     Content longtext not null,
     DateAndTime datetime not null,
     NumberOfComments int not null,
     Writer char(40) not null,
     constraint IDPOST primary key (PostID));

create table RATINGS (
     RatingID int not null auto_increment,
     DateAndTime datetime not null,
     Category char(50) not null,
     Rater char(40) not null,
     Post int not null,
     constraint IDRATING_ID primary key (RatingID),
     constraint IDRATING_1 unique (Rater, Post));

create table RATING_CATEGORIES (
     Name char(50) not null,
     Description longtext not null,
     constraint IDRATING_TYPE primary key (Name));

create table `USERS` (
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

alter table COMMENTS add constraint FKwrites
     foreign key (User)
     references USERS (Username);

alter table COMMENTS add constraint FKunder
     foreign key (Post)
     references POSTS (PostID);

-- Not implemented
-- alter table COMMENTS add constraint IDCOMMENT_CHK
--     check(exists(select * from NOTIFICATIONS
--                  where NOTIFICATIONS.Comment = CommentID)); 

alter table FAVORITES add constraint FKR
     foreign key (User)
     references USERS (Username);

alter table FAVORITES add constraint FKR_1
     foreign key (Post)
     references POSTS (PostID);

alter table FRIENDSHIPS add constraint FKfri_USE
     foreign key (Requested_user)
     references USERS (Username);

alter table FRIENDSHIPS add constraint FKFRIEND
     foreign key (Requesting_user)
     references USERS (Username);

alter table NOTIFICATIONS add constraint FKreceives
     foreign key (Notified_user)
     references USERS (Username);

alter table NOTIFICATIONS add constraint FKabout_FK
     foreign key (Comment)
     references COMMENTS (CommentID);

alter table NOTIFICATIONS add constraint FKabout_1_FK
     foreign key (Rating)
     references RATINGS (RatingID);

alter table POINTS add constraint FKpoi_RAT
     foreign key (Category)
     references RATING_CATEGORIES (Name);

alter table POINTS add constraint FKpoi_USE
     foreign key (User)
     references USERS (Username);

alter table POSTS add constraint FKposts
     foreign key (Writer)
     references USERS (Username);

-- Not implemented
-- alter table RATINGS add constraint IDRATING_CHK
--     check(exists(select * from NOTIFICATIONS
--                  where NOTIFICATIONS.Rating = RatingID)); 

alter table RATINGS add constraint FKof
     foreign key (Category)
     references RATING_CATEGORIES (Name);

alter table RATINGS add constraint FKposts_1
     foreign key (Rater)
     references USERS (Username);

alter table RATINGS add constraint FKrelated
     foreign key (Post)
     references POSTS (PostID);


-- Index Section
-- _____________ 


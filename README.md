# Snippex
Hey! Welcome to this new social network, designed for creative and thoughtful minds.
Here you can create posts to let other people know what you are feeling.
Then, other users can interact with your post, rating it with the category they prefer.
There are currently four categories:
- You can rate a post with THOUGHTFULNESS if it makes you think and see things under a different light.
- IDEA is for something that can spark a change and inspire people to create.
- ADVICE is perfect for tips that you can use in everyday life or that can be useful for the future.
- If a post makes you laugh or giggle, then you should rate it with HUMOUR.

## RUN IT ##
You can try the website locally, providing you have an updated version of XAMPP installed in your system.
To create a local instance of the database, please run the code in `SnippexDB.ddl`. Then you can populate the
database with `populate_db.sql` ready-made data, so that you can easily understand how to use this website.

If you wish to enable the "change profile pic" option in the profile menu, it is likely that you need to
decommentate the following line (removing the semicolon) in `php.ini` configuration file: <br /><br />
;gd-extension

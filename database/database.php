<?php
class DatabaseHelper {
    private $db;

    public function __construct($servername, $username, $password, $dbname, $port) {
        $this->db = new mysqli($servername, $username, $password, $dbname, $port);
        if ($this->db->connect_error) {
            die("Connection failed: " . $this->db->connect_error);
        }
    }
    public function getUserFromInitials($initials): array
    {
        $stmt = $this->db->prepare("SELECT Username FROM users WHERE Username LIKE ?");
        $str = $initials.'%';
        $stmt->bind_param('s', $str);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserData($username): array {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE Username = ?");
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getRating() {
        $stmt = $this->db->prepare("SELECT * FROM ratings");
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPostFromUser($username) {
        $stmt = $this->db->prepare("SELECT * FROM posts WHERE Writer = ?");
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getCommentFromPost($post_id) {
        $stmt = $this->db->prepare("SELECT * FROM comments WHERE Post = ?");
        $stmt->bind_param('s', $post_id);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getMostVotedPostOfUser($username): array {
        $stmt = $this->db->prepare("SELECT p.PostID, p.Title, p.Content, p.DateAndTime, p.NumberOfComments, p.Writer, COUNT(r.RatingID) AS pts
                                    FROM posts AS p LEFT OUTER JOIN ratings AS r ON p.PostID = r.Post 
                                    WHERE p.Writer=? GROUP BY p.PostID ORDER BY pts DESC limit 1");
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserRatingStats($username): array {
        $stmt = $this->db->prepare("SELECT * FROM points WHERE `User` = ?");
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getCategories(): array {
        $stmt = $this->db->prepare("SELECT Name FROM rating_categories");
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserFriends($username) {
        $stmt1 = $this->db->prepare("SELECT u.* FROM friendships AS f, users AS u WHERE f.User2 = u.Username AND f.User1 = ?
                                     AND f.FriendsSince IS NOT NULL AND f.FriendsUntil IS NULL");
        $stmt1->bind_param('s', $username);
        $stmt1->execute();
        $result = $stmt1->get_result();
        $stmt2 = $this->db->prepare("SELECT u.* FROM friendships AS f, users AS u WHERE f.User1 = u.Username AND f.User2 = ?
                                     AND f.FriendsSince IS NOT NULL AND f.FriendsUntil IS NULL");
        $stmt2->bind_param('s', $username);
        $stmt2->execute();
        $result2 = $stmt2->get_result();
        return array_merge($result->fetch_all(MYSQLI_ASSOC), $result2->fetch_all(MYSQLI_ASSOC));
    }

    public function getFeedPosts($username) {
        $stmt1 = $this->db->prepare("SELECT posts.* FROM users JOIN friendships ON users.Username = friendships.User1 JOIN posts ON friendships.User2 = posts.Writer WHERE users.Username = ? ORDER BY posts.DateAndTime DESC");
        $stmt1->bind_param('s',$username);
        $stmt1->execute();
        $result = $stmt1->get_result();
        $stmt2 = $this->db->prepare("SELECT posts.* FROM users JOIN friendships ON users.Username = friendships.User2 JOIN posts ON friendships.User1 = posts.Writer WHERE users.Username = ? ORDER BY posts.DateAndTime DESC");
        $stmt2->bind_param('s',$username);
        $stmt2->execute();
        $result2 = $stmt2->get_result();
        return array_merge($result->fetch_all(MYSQLI_ASSOC), $result2->fetch_all(MYSQLI_ASSOC));
    }

    public function getExplorePosts($username) {
        $stmt = $this->db->prepare("SELECT posts.* FROM posts WHERE posts.Writer NOT IN (
            SELECT friendships.User2 FROM users JOIN friendships ON users.Username = friendships.User1 WHERE users.Username = ?
        ) AND posts.Writer NOT IN (
            SELECT friendships.User1 FROM users JOIN friendships ON users.Username = friendships.User2 WHERE users.Username = ?
        ) AND posts.Writer != ?
        ORDER BY posts.DateAndTime DESC");
        $stmt->bind_param('sss',$username, $username,$username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPostComments($post_id): array {
        $stmt = $this->db->prepare("SELECT * FROM comments WHERE Post = ? ORDER BY DateAndTime DESC");
        $stmt->bind_param('i', $post_id);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getAllPostsWrittenByUser($username): array {
        $stmt = $this->db->prepare("SELECT * FROM posts WHERE Writer = ?");
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function subscribeUser($username, $name, $surname, $password) {
        $stmt = $this->db->prepare("INSERT INTO users (Username, Name, Surname, Password) VALUES (?, ?, ?, ?)");
        $stmt->bind_param('ssss', $username, $name, $surname, $password);
        $stmt->execute();
    }

    public function checkLogin($username, $password): array {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE Username = ? AND Password = ?");
        $stmt->bind_param('ss', $username, $password);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getProfilePic($username): array {
        $stmt = $this->db->prepare("SELECT ProfilePic FROM users WHERE Username = ?");
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function registerUser($name, $surname, $username, $password, $signup_date) {
        $stmt = $this->db->prepare("INSERT INTO users (Name, Surname, Username, Password, SignupDate) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param('sssss', $name, $surname, $username, $password, $signup_date);
        $stmt->execute();
    }

    public function getHashPasswordFromUsername($username): array {
        $stmt = $this->db->prepare("SELECT Password FROM users WHERE Username = ?");
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getNotificationsOfComments($username): array {
        $stmt = $this->db->prepare("SELECT n.NotificationID, n.Comment, n.Read, c.Content, c.DateAndTime, c.User, 
                                    c.Post AS PostID, p.Title AS PostTitle FROM notifications AS n 
                                    JOIN comments AS c ON n.Comment = c.CommentID 
                                    JOIN posts AS p ON c.Post = p.PostID 
                                    WHERE n.Notified_user = ?");
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getNotificationsOfRatings($username): array {
        $stmt = $this->db->prepare("SELECT n.NotificationID, n.Rating, n.Read, r.DateAndTime, r.Category, r.Rater, 
                                    r.Post AS PostID, p.Title AS PostTitle FROM notifications AS n 
                                    JOIN ratings AS r ON n.Rating = r.RatingID 
                                    JOIN posts AS p ON r.Post = p.PostID 
                                    WHERE n.Notified_user = ?");
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getNotificationsOfFriendships($username): array {
        $stmt = $this->db->prepare("SELECT n.NotificationID, n.Friend, n.Read, f.User1, f.User2, f.RequestDate, f.FriendsSince, f.FriendsUntil 
            FROM notifications AS n JOIN friendships AS f ON n.Friend = f.FriendshipID WHERE n.Notified_user = ?");
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function markNotificationAsRead($notificationID) {
        $stmt = $this->db->prepare("UPDATE notifications AS n SET n.Read = 1 WHERE n.NotificationID = ?");
        $stmt->bind_param('s', $notificationID);
        $stmt->execute();
    }

    public function getPost($post) {
        $stmt = $this->db->prepare("SELECT * FROM posts WHERE PostID = ?");
        $stmt->bind_param('i', $post);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function addComment($comment, $post) {
        $stmt = $this->db->prepare("INSERT INTO comments (Content, DateAndTime, User, Post) VALUES (?, ?, ?, ?)");
        $date = date("Y-m-d H:i:s");
        $stmt->bind_param('sssi', $comment, $date, $_SESSION['LoggedUser'], $post);
        $stmt->execute();
    }

    public function addPost($title, $content) {
        $stmt = $this->db->prepare("INSERT INTO posts (Title, Content, DateAndTime, Writer) VALUES (?, ?, ?, ?)");
        $date = date("Y-m-d H:i:s");
        $stmt->bind_param('ssss', $title, $content, $date, $_SESSION['LoggedUser']);
        $stmt->execute();
    }

    public function addFriendshipRequest($user1, $user2) {
        $stmt = $this->db->prepare("INSERT INTO friendships (User1, User2, RequestDate) VALUES (?, ?, ?)");
        $date = date("Y-m-d");
        $stmt->bind_param('sss', $user1, $user2, $date);
        $stmt->execute();
    }
}
?>

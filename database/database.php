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

    public function getFeedPosts($username) {
        $stmt1 = $this->db->prepare("SELECT p.* FROM users AS u JOIN friendships AS f ON u.Username = f.Requesting_user JOIN posts AS p ON f.Requested_user = p.Writer WHERE u.Username = ? ORDER BY p.DateAndTime DESC");
        $stmt1->bind_param('s',$username);
        $stmt1->execute();
        $result = $stmt1->get_result();
        $stmt2 = $this->db->prepare("SELECT p.* FROM users AS u JOIN friendships AS f ON u.Username = f.Requested_user JOIN posts AS p ON f.Requesting_user = p.Writer WHERE u.Username = ? ORDER BY p.DateAndTime DESC");
        $stmt2->bind_param('s',$username);
        $stmt2->execute();
        $result2 = $stmt2->get_result();
        return array_merge($result->fetch_all(MYSQLI_ASSOC), $result2->fetch_all(MYSQLI_ASSOC));
    }

    public function getExplorePosts($username): array {
        $stmt = $this->db->prepare("SELECT p.* FROM posts AS p WHERE p.Writer NOT IN (
            SELECT f.Requested_user FROM users AS u JOIN friendships AS f ON u.Username = f.Requesting_user WHERE u.Username = ?
        ) AND p.Writer NOT IN (
            SELECT f.Requesting_user FROM users AS u JOIN friendships AS f ON u.Username = f.Requested_user WHERE u.Username = ?
        ) AND p.Writer != ? ORDER BY p.DateAndTime DESC");
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

    public function registerUser($name, $surname, $username, $birthday, $password, $signup_date) {
        $stmt = $this->db->prepare("INSERT INTO users (Name, Surname, Username, Birthday, Password, SignupDate) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param('ssssss', $name, $surname, $username, $birthday, $password, $signup_date);
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
        $stmt = $this->db->prepare("SELECT n.NotificationID, n.Comment, c.Content, c.DateAndTime, c.User, 
                                    c.Post AS PostID, p.Title AS PostTitle FROM notifications AS n 
                                    JOIN comments AS c ON n.Comment = c.CommentID 
                                    JOIN posts AS p ON c.Post = p.PostID 
                                    WHERE n.Notified_user = ? AND n.Read = 0");
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getNotificationsOfRatings($username): array {
        $stmt = $this->db->prepare("SELECT n.NotificationID, n.Rating, r.DateAndTime, r.Category, r.Rater, 
                                    r.Post AS PostID, p.Title AS PostTitle FROM notifications AS n 
                                    JOIN ratings AS r ON n.Rating = r.RatingID 
                                    JOIN posts AS p ON r.Post = p.PostID 
                                    WHERE n.Notified_user = ? AND n.Read = 0");
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function markNotificationAsRead($notificationID) {
        $stmt = $this->db->prepare("UPDATE notifications AS n SET n.Read = 1 WHERE n.NotificationID = ?");
        $stmt->bind_param('i', $notificationID);
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
        $stmt = $this->db->prepare("UPDATE posts SET NumberOfComments = NumberOfComments + 1 WHERE PostID = ?");
        $stmt->bind_param('i', $post);
        $stmt->execute();
    }

    public function addPost($title, $content) {
        $stmt = $this->db->prepare("INSERT INTO posts (Title, Content, DateAndTime, Writer) VALUES (?, ?, ?, ?)");
        $date = date("Y-m-d H:i:s");
        $stmt->bind_param('ssss', $title, $content, $date, $_SESSION['LoggedUser']);
        $stmt->execute();
        $stmt = $this->db->prepare("UPDATE users SET NumberOfPosts = NumberOfPosts + 1 WHERE Username = ?");
        $stmt->bind_param('s', $_SESSION['LoggedUser']);
        $stmt->execute();
    }

    public function addFriendshipRequest($requesting, $requested) {
        $stmt = $this->db->prepare("INSERT INTO friendships (Requesting_user, Requested_user, RequestDate) VALUES (?, ?, ?)");
        $date = date("Y-m-d");
        $stmt->bind_param('sss', $requesting, $requested, $date);
        $stmt->execute();
    }

    public function getUserCurrentFriendships($username) {
        $stmt1 = $this->db->prepare("SELECT u.*, f.FriendshipID FROM friendships AS f, users AS u WHERE f.Requested_user = u.Username AND f.Requesting_user = ?
                                     AND f.FriendsSince IS NOT NULL AND f.FriendsUntil IS NULL");
        $stmt1->bind_param('s', $username);
        $stmt1->execute();
        $result = $stmt1->get_result();
        $stmt2 = $this->db->prepare("SELECT u.*, f.FriendshipID FROM friendships AS f, users AS u WHERE f.Requesting_user = u.Username AND f.Requested_user = ?
                                     AND f.FriendsSince IS NOT NULL AND f.FriendsUntil IS NULL");
        $stmt2->bind_param('s', $username);
        $stmt2->execute();
        $result2 = $stmt2->get_result();
        return array_merge($result->fetch_all(MYSQLI_ASSOC), $result2->fetch_all(MYSQLI_ASSOC));
    }

    public function getUserIncomingRequestsOfFriendship($username): array {
        $stmt = $this->db->prepare("SELECT u.Username, f.FriendshipID FROM friendships AS f JOIN users AS u ON u.Username = f.Requesting_user 
                                    WHERE f.Requested_user = ? AND f.FriendsSince IS NULL AND f.FriendsUntil IS NULL");
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserSentRequestsOfFriendships($username): array {
        $stmt = $this->db->prepare("SELECT u.Username, f.FriendshipID FROM friendships AS f JOIN users AS u ON u.Username = f.Requested_user 
                                    WHERE f.Requesting_user = ? AND f.FriendsSince IS NULL AND f.FriendsUntil IS NULL");
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserPastFriendships($username): array {
        $stmt1 = $this->db->prepare("SELECT u.*, f.FriendshipID FROM friendships AS f, users AS u WHERE f.Requested_user = u.Username AND f.Requesting_user = ?
                                     AND f.FriendsSince IS NOT NULL AND f.FriendsUntil IS NOT NULL");
        $stmt1->bind_param('s', $username);
        $stmt1->execute();
        $result = $stmt1->get_result();
        $stmt2 = $this->db->prepare("SELECT u.*, f.FriendshipID FROM friendships AS f, users AS u WHERE f.Requesting_user = u.Username AND f.Requested_user = ?
                                     AND f.FriendsSince IS NOT NULL AND f.FriendsUntil IS NOT NULL");
        $stmt2->bind_param('s', $username);
        $stmt2->execute();
        $result2 = $stmt2->get_result();
        return array_merge($result->fetch_all(MYSQLI_ASSOC), $result2->fetch_all(MYSQLI_ASSOC));
    }

    public function addNewCommentNotification($ID, $Notified) {
    }

    public function addNewRatingNotification($ID, $Notified) {
    }

    public function addFriendshipAcceptance($friendshipId) {
        $stmt = $this->db->prepare("UPDATE friendships SET FriendsSince = ? WHERE FriendshipID = ?");
        $date = date("Y-m-d");
        $stmt->bind_param('si', $date, $friendshipId);
        $stmt->execute();
        $stmt = $this->db->prepare("UPDATE users SET NumberOfFriends = NumberOfFriends + 1 
                                    WHERE Username = (SELECT Requesting_user FROM friendships WHERE FriendshipID = ?) 
                                    OR Username = (SELECT Requested_user FROM friendships WHERE FriendshipID = ?)");
        $stmt->bind_param('ii', $friendshipId, $friendshipId);
        $stmt->execute();
    }

    public function deleteFriendship($friendshipId) {
        $stmt = $this->db->prepare("UPDATE users SET NumberOfFriends = NumberOfFriends - 1 
                                    WHERE Username = (SELECT Requesting_user FROM friendships WHERE FriendshipID = ?) 
                                    OR Username = (SELECT Requested_user FROM friendships WHERE FriendshipID = ?)");
        $stmt->bind_param('ii', $friendshipId, $friendshipId);
        $stmt->execute();
        $stmt = $this->db->prepare("DELETE FROM friendships WHERE FriendshipID = ?");
        $stmt->bind_param('i', $friendshipId);
        $stmt->execute();
    }

    public function terminateFriendship($friendshipID) {
        $stmt = $this->db->prepare("UPDATE friendships SET FriendsUntil = ? WHERE FriendshipID = ?");
        $date = date("Y-m-d");
        $stmt->bind_param('ss', $date, $friendshipID);
        $stmt->execute();
    }

    public function getPostsFromKeyword($keyword): array {
        $stmt1 = $this->db->prepare("SELECT * FROM posts WHERE Title LIKE ? ORDER BY DateAndTime DESC");
        $stmt2 = $this->db->prepare("SELECT * FROM posts WHERE Content LIKE ? AND PostID NOT IN (
                                            SELECT PostID FROM posts WHERE Title LIKE ? ORDER BY DateAndTime DESC)
                                            ORDER BY DateAndTime DESC");
        $keyword = '%' . $keyword . '%';
        $stmt1->bind_param('s', $keyword);
        $stmt2->bind_param('ss', $keyword, $keyword);
        $stmt1->execute();
        $result1 = $stmt1->get_result();
        $stmt2->execute();
        $result2 = $stmt2->get_result();
        return array_merge($result1->fetch_all(MYSQLI_ASSOC), $result2->fetch_all(MYSQLI_ASSOC));
    }

    public function updateUserProfilePic($username, string $file) {
        $stmt = $this->db->prepare("UPDATE users SET ProfilePic = ? WHERE Username = ?");
        $stmt->bind_param('ss', $file, $username);
        $stmt->execute();
    }

    public function addRating($rating, $post) {
        $stmt = $this->db->prepare("INSERT INTO ratings (DateAndTime, Category, Rater, Post) VALUES (?, ?, ?, ?)");
        $date = date("Y-m-d H:i:s");
        $rater = $_SESSION['LoggedUser'];
        $stmt->bind_param('sssi',$date , $rating, $rater, $post);
        $stmt->execute();
        $stmt = $this->db->prepare("SELECT Writer FROM posts WHERE PostID = ?");
        $stmt->bind_param('i', $post);
        $stmt->execute();
        $writer = $stmt->get_result()->fetch_assoc()['Writer'];
        $stmt = $this->db->prepare("SELECT COUNT(*) FROM points WHERE User = ? AND Category = ?");
        $stmt->bind_param('ss', $writer, $rating);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_assoc()['COUNT(*)'];
        if ($result == 0) {
            $stmt = $this->db->prepare("INSERT INTO points (User, Category, Points) VALUES (?, ?, 1)");
            $stmt->bind_param('ss', $writer, $rating);
        } else {
            $stmt = $this->db->prepare("UPDATE points SET Points = Points + 1 WHERE User = ? AND Category = ?");
            $stmt->bind_param('ss', $writer, $rating);
        }
        $stmt->execute();
    }

    public function verifyRating($post) {
        $stmt = $this->db->prepare("SELECT COUNT(*) FROM ratings WHERE Post = ? AND Rater = ?");
        $rater = $_SESSION['LoggedUser'];
        $stmt->bind_param('is', $post, $rater);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_assoc()['COUNT(*)'];
        if ($result > 0) {
            $stmt = $this->db->prepare("SELECT Category FROM ratings WHERE Post = ? AND Rater = ?");
            $stmt->bind_param('is', $post, $rater);
            $stmt->execute();
            $result = $stmt->get_result()->fetch_assoc()['Category'];
        } else {
            $result = null;
        }
        return $result;
    }

    public function deleteComment($id) {
        $stmt = $this->db->prepare("DELETE FROM notifications WHERE Comment = ?");
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $stmt = $this->db->prepare("DELETE FROM comments WHERE CommentID = ?");
        $stmt->bind_param('i', $id);
        $stmt->execute();
    }

    public function editComment($id, $text) {
        $stmt = $this->db->prepare("UPDATE comments SET Content = ? WHERE CommentID = ?");
        $stmt->bind_param('si', $text, $id);
        $stmt->execute();
    }

}
?>

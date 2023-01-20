<?php
class DatabaseHelper {
    private $db;

    public function __construct($servername, $username, $password, $dbname, $port) {
        $this->db = new mysqli($servername, $username, $password, $dbname, $port);
        if ($this->db->connect_error) {
            die("Connection failed: " . $this->db->connect_error);
        }
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
        $stmt1 = $this->db->prepare("SELECT u.* FROM friendships AS f, users AS u WHERE f.User2 = u.Username AND f.User1 = ?");
        $stmt1->bind_param('s', $username);
        $stmt1->execute();
        $result = $stmt1->get_result();
        $stmt2 = $this->db->prepare("SELECT u.* FROM friendships AS f, users AS u WHERE f.User1 = u.Username AND f.User2 = ?");
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
}
?>

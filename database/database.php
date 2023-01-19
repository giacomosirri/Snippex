<?php
class DatabaseHelper {
    private $db;

    public function __construct($servername, $username, $password, $dbname, $port)
    {
        $this->db = new mysqli($servername, $username, $password, $dbname, $port);
        if ($this->db->connect_error) {
            die("Connection failed: " . $this->db->connect_error);
        }
    }

    public function getUserData($username) {
        $stmt = $this->db->prepare("SELECT * FROM user WHERE Username = ?");
        $stmt->bind_param('s',$username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getRating() {
        $stmt = $this->db->prepare("SELECT * FROM rating");
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPostFromUser($username) {
        $stmt = $this->db->prepare("SELECT * FROM post WHERE Writer = ?");
        $stmt->bind_param('s',$username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getCommentFromPost($post_id) {
        $stmt = $this->db->prepare("SELECT * FROM comment WHERE Post = ?");
        $stmt->bind_param('s',$post_id);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getMostVotedPostOfUser($username) {
        $stmt = $this->db->prepare("SELECT p.PostID, p.Title, p.Content, p.DateAndTime, p.NumberOfComments, p.Writer, 
                                    COUNT(*) AS c FROM post AS p, rating AS r WHERE p.PostID = r.Post AND p.Writer = ? 
                                    GROUP BY r.Post ORDER BY c DESC limit 1");
        $stmt->bind_param('s',$username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserRatingStats($username) {
        $stmt = $this->db->prepare("SELECT * FROM points WHERE `User` = ?");
        $stmt->bind_param('s',$username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getCategories() {
        $stmt = $this->db->prepare("SELECT Name FROM rating_category");
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }
}
?>

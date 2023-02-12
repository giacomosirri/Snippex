<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <?php if(isset($templateParams["title"])) { ?>
            <title><?php global $templateParams; echo $templateParams["title"] ?></title>
        <?php } ?>
        <link rel="icon" type="image/x-icon" href="../icons/logo.png">
        <!--Bootstrap: Latest compiled and minified CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <!-- Latest compiled JavaScript -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Latest compiled Axios -->
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <!--CSS-->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="../assets/style.css">
        <!-- Common javascript code -->
        <script type="text/javascript" src="../javascript/functions.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    </head>
    <body>
        <?php
            if(isset($templateParams["page"])) {
            require $templateParams["page"];
        } ?>
        <nav id="main-menu">
            <ul class="d-flex justify-content-between text-center">
                <li></li>
                <li id="nav-logo">Snippex</li>
                <li><a href="./feed.php"><img src="../icons/home_icon.png" alt="home"></a></li>
                <li><a href="./explore.php"><img src="../icons/search_icon.png" alt="explore"></a></li>
                <li><a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal"><img src="../icons/write_icon.png" alt="write"></a></li>
                <li><a href="./searchusers.php"><img src="../icons/users_icon.png" alt="search users"></a></li>
                <li><a href="./profile.php"><img id="menu-profile-pic" src="" alt="my profile"></a></li>
                <li></li>
            </ul>
        </nav>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">New post</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="recipient-title" class="col-form-label">Title:</label>
                                <input type="text" class="form-control" id="recipient-title">
                            </div>
                            <div class="mb-3">
                                <label for="message-text" class="col-form-label">Content:</label>
                                <textarea class="form-control" rows="4" id="message-text"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="close" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" id="post-button" class="btn btn-primary">Post</button>
                    </div>
                </div>
            </div>
        </div>
    </body>
    <script type="text/javascript">
        const session_user = "<?php echo $_SESSION['LoggedUser'] ?>";

        function addImage(image) {
            document.getElementById("menu-profile-pic").src = image;
        }
        getUserProfilePic(session_user).then(image => addImage(image));
    </script>
    <?php
    if(isset($templateParams["js"])):
        foreach($templateParams["js"] as $script):?>
            <script type="text/javascript" src="<?php echo $script; ?>"></script>
        <?php
        endforeach;
    endif;
    ?>
</html>
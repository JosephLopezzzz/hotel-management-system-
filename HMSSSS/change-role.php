<?php
session_start();

if (isset($_POST['role'])) {
    $_SESSION['user_role'] = $_POST['role'];
}

// Redirect back to the current page
$redirect_page = isset($_POST['current_page']) ? $_POST['current_page'] : 'dashboard';
header("Location: index.php?page=$redirect_page");
exit;
?>
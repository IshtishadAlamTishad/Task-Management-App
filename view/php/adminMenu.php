<?php
session_start();
require_once('../../model/db.php');

if(empty($_SESSION['status']) || empty($_SESSION['email'])) {
    header('Location: ../view/html/loginPage.html');
    exit;
}

$conn = getConnection();
if(!$conn) {
    die("Database connection failed!");
}

$email = $_SESSION['email'];

$sql = "SELECT firstname, lastname, selfImage FROM userinfos WHERE email = ?";
$stmt = $conn->prepare($sql);

if(!$stmt) {
    die("Prepare failed: " . $conn->error);
}

$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if($result && $result->num_rows > 0) {
    $user = $result->fetch_assoc();
    $profileImage = !empty($user['selfImage']) ? '../../' . $user['selfImage'] : "../../asset/imgs/defaultImg.png";
    $_SESSION['profile_Image'] = $profileImage;
    $_SESSION['name'] = trim($user['firstname'] . ' ' . $user['lastname']);
} else {
    header('Location: ../view/html/loginPage.html');
    exit;
}

$stmt->close();
$conn->close();
?>

<!DOCTYPE html>
<html>
  <head>
      <title>Menu | TM</title>
      <link rel="stylesheet" href="../../asset/css/adminMenuStyle.css" />
      <link rel="icon" type="image/png" href="../../asset/imgs/icon.png" />
  </head>

  <body>
      <header class="topBar">
          <div class="userHeadInfo">
            
              <img alt="Profile Image" class="profileImg" src="<?php echo $_SESSION['profile_Image']; ?>" height="50" width=auto />
              <span class="profileName"><?php echo $_SESSION['name']; ?></span>
          </div>
          <button class="logoutBtn" onclick="logout()">Logout</button>
      </header>

      <div class="layout">
          <aside class="sidebar" id="sidebar">
              <button class="toggle-btn" onclick="toggleSidebar()">☰</button>
              <nav class="nav-buttons">
                  <button onclick="showContent('../html/dashboard.html')">Dashboard</button>
                  <button onclick="showContent('../html/profile.html')">Profile</button>
                  <button onclick="showContent('../html/taskcreation.html')">Create Task</button>
                  <button onclick="showContent('../html/progressTrackPage.html')">Progress Tracker</button>
                  <button onclick="showContent('../html/searchFilterPage.html')">Search & Filter</button>
                  <button onclick="showContent('../html/activityHistoryPage.html')">Activity History</button>
                  <button onclick="showContent('../html/subTaskPage.html')">Subtask</button>
                  <button onclick="showContent('../html/notifications.html')">Notifications</button>
                  <button onclick="showContent('../html/roleBasePage.html')">Change User roles</button>
                  <button onclick="showContent('../html/dueDatePage.html')">Due Dates</button>
                  <button onclick="showContent('../html/calenderView.html')">Calendar View</button>
              </nav>
          </aside>

          <main class="main-content">
              <iframe id="contentFrame" src="../html/dashboard.html" frameborder="0"></iframe>
          </main>
      </div>

      <script src="../../asset/js/adminMenu.js"></script>
  </body>
</html>
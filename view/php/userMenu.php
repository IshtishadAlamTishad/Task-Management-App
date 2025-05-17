<?php
    session_start();
    if(isset($_SESSION['status'])){
?>

<!DOCTYPE html>
<html>

  <head>
    <title>Menu | TM</title>
    <link rel="stylesheet" href="../../asset/css/userMenuStyle.css" />
    <link rel="icon" type="image/png" href="../../asset/imgs/icon.png">
  </head>
  
  <body>
    
    <header class="top-bar">
      <div class="user-header-info">
        <img src="../../asset/imgs/cr7.png" alt="ProfilePic" class="profileImg">
        <h2>Cristiano Ronaldo</h2>
      </div>
      <button class="logout-btn" onclick="logout()">Logout</button>
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
          <button onclick="showContent('../html/roleBasePage.html')">Role Base</button>
          <button onclick="showContent('../html/dueDatePage.html')">Due Dates</button>
          <button onclick="showContent('../html/calenderView.html')">Calendar View</button>
        
        </nav>
      </aside>

      <main class="main-content">
        <iframe id="contentFrame" src="dashboard.html"></iframe>
      </main>
    
    </div>

    <script src="../../asset/js/userMenu.js"></script>
  
  </body>

</html>

<?php
    }else{
        header('location: loginPage.html');
    }

?>
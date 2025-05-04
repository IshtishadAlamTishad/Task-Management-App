document.addEventListener('DOMContentLoaded', function() {
    const notificationBell = document.getElementById('notificationBell');
    const settingsButton = document.getElementById('settingsButton');
    const backButton = document.getElementById('backButton');
    const notificationCenter = document.getElementById('notificationCenter');
    const notificationSettings = document.getElementById('notificationSettings');
    const unreadCount = document.getElementById('unreadCount');
    
    // Show notification center by default
    notificationCenter.style.display = 'block';
    notificationSettings.style.display = 'none';
    
    // Toggle between views
    notificationBell.addEventListener('click', function() {
        notificationCenter.style.display = 'block';
        notificationSettings.style.display = 'none';
    });
    
    settingsButton.addEventListener('click', function() {
        notificationCenter.style.display = 'none';
        notificationSettings.style.display = 'block';
    });
    
    backButton.addEventListener('click', function() {
        notificationCenter.style.display = 'block';
        notificationSettings.style.display = 'none';
    });
    
    // Mark as read functionality
    document.querySelectorAll('.mark-read').forEach(button => {
        button.addEventListener('click', function() {
            const notification = this.closest('.notification-item');
            if (notification.classList.contains('unread')) {
                notification.classList.remove('unread');
                updateUnreadCount();
            }
        });
    });
    
    // Update unread count
    function updateUnreadCount() {
        const count = document.querySelectorAll('.notification-item.unread').length;
        unreadCount.textContent = count;
        unreadCount.style.display = count > 0 ? 'flex' : 'none';
    }
    
    // Save settings
    document.getElementById('settingsForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Settings saved!');
    });
    
    // Initialize
    updateUnreadCount();
});
# Task Management App

### Overview
    A simple web application designed to help users manage their tasks efficiently. 
    This project includes features like task creation, validation and management 
    built using HTML, CSS, JavaScript and PHP.

### Features
    Task Creation: Users can add new tasks with title, description, and due date.
    Task Update/Delete: Tasks can be updated or removed.
    Form Validation: Client-side and server-side validation for data integrity.
    Responsive: Optimized for desktop

### Technologies Used
    Frontend:
    HTML: Structure of the web application.
    CSS: Styling for the user interface.
    JavaScript: Validating user inputs and others variable fields.

    Backend:
    PHP : Manages server-side logic,processes form submissions and interacts with the database.

### Installation

    Follow these steps to set up the app locally:

    1. Clone the repository
    Clone this repository to your local machine:
    git clone https://github.com/yourusername/task-management-app.git

    2. Set up the local development environment
    Ensure you have a local server running (like XAMPP, WAMP, or MAMP) to handle PHP and MySQL (if required).

    3. Move the project files
    Move the cloned project folder into the web directory of your server setup:

    XAMPP: htdocs

    4. Start the server
    Launch your local server and open the project in your browser by navigating to:

    http://localhost/task-management-app/

### How to Use
    Access the Application: Open http://localhost/task-management-app/ in your web browser.
    Create a Task: Fill out the form with the task title, description, and due date, and click "Submit."
    View Tasks: Your created tasks will be displayed on the page with options to edit or delete them.
    Edit or Delete: Modify or remove tasks by clicking the corresponding buttons next to each task.

### Project Structure
    The following is the directory structure of the project:

    Task-Management-App/
    ├── asset/
    │   └── [Static assets such as CSS, JavaScript, and images]
    │   └── css [contains .css files]
    │   └── js [contains .js files]
    │   └── Database [contains DB tables]
    │   └── imgs [contains images/icons]
    │   └── upload
    │       └──profilePic [contains user's profile image]
    │
    ├── controller/
    │   └── [PHP files handling business logic and request processing .php]
    │
    ├── model/
    │   └── [PHP files managing data structures and database interactions .php]
    │
    ├── view/
    │   └── [HTML files rendering the structure .HTML]
    │   └── [PHP files rendering the user interface .php]
    │
    ├── index.php
    ├── README.md
    └── LICENSE

### Contributors
    Mohammed Istishad Alam Tishad,22-46130-1,CSE,FST,AIUB
    Rakibul Riyel,22-461-1,CSE,FST,AIUB

### Fork the repository.
    Create a new branch (git checkout -b feature-branch).
    Commit your changes (git commit -am 'Add new feature').
    Push to the branch (git push origin feature-branch).
    Create a pull request describing your changes.

### License
    This project is licensed under the GNU General Public License v3.0 –> see the [LICENSE] file for details
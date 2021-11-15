# Overview of ``./client``

```
.
│   .gitignore
│   package-lock.json
│   package.json
│   README.md
│   
├── public
│       favicon.ico
│       index.html
│       logo192.png
│       logo512.png
│       main.js
│       manifest.json
│       preload.js
│       robots.txt
│       
└── src
    │   App.js
    │   config.js
    │   index.css
    │   index.js
    │   reportWebVitals.js
    │   
    ├── Actions
    │       ArticleActions.js
    │       ChatActions.js
    │       ImageActions.js
    │       UserActions.js
    │       
    ├── Components
    │   ├── Article
    │   │   ├── Article
    │   │   │       Article.css
    │   │   │       Article.jsx
    │   │   │       
    │   │   ├── Comment
    │   │   │       Comment.css
    │   │   │       Comment.jsx
    │   │   │       
    │   │   ├── Department
    │   │   │       Department.css
    │   │   │       Department.jsx
    │   │   │       
    │   │   └── Subject
    │   │           Subject.css
    │   │           Subject.jsx
    │   │           
    │   ├── Chat
    │   │   ├── Messenger
    │   │   │   │   Messenger.css
    │   │   │   │   Messenger.jsx
    │   │   │   │   
    │   │   │   ├── Message
    │   │   │   │       Message.css
    │   │   │   │       Message.jsx
    │   │   │   │       
    │   │   │   ├── SendMessage
    │   │   │   │       SendMessage.css
    │   │   │   │       SendMessage.jsx
    │   │   │   │       
    │   │   │   └── Topbar
    │   │   │           Topbar.css
    │   │   │           Topbar.jsx
    │   │   │           
    │   │   └── Sidebar
    │   │       │   Sidebar.css
    │   │       │   Sidebar.jsx
    │   │       │   
    │   │       └── Conversation
    │   │               ConversationItem.css
    │   │               ConversationItem.jsx
    │   │               
    │   ├── Navbar
    │   │       Navbar.css
    │   │       Navbar.jsx
    │   │
    │   ├── Topbar
    │   │       Topbar.css
    │   │       Topbar.jsx
    │   │       
    │   └── User
    │       │   UserNotFound.jsx
    │       │   
    │       ├── Login
    │       │       LoginFalse.jsx
    │       │       LoginTrue.jsx
    │       │       
    │       └── ProfileData
    │               profileData.css
    │               ProfileData.jsx
    │               
    ├── Hooks
    │       useLocalStorage.js
    │       
    ├── Pages
    │   │   Home.jsx
    │   │   
    │   ├── Article
    │   │       AllArticles.jsx
    │   │       AllDept.jsx
    │   │       AllSubjects.jsx
    │   │       general.css
    │   │       ShowArticle.jsx
    │   │       
    │   ├── Chat
    │   │       Chat.css
    │   │       Chat.jsx
    │   │       
    │   └── User
    │           auth.css
    │           EditProfile.jsx
    │           Forgot.jsx
    │           Login.jsx
    │           Profile.jsx
    │           Register.jsx
    │           
    └── SVG
            Article.svg
            Department.svg
            Edit.svg
            Forgot.svg
            Hello.svg
            LoginFalse.svg
            LoginTrue.svg
            Profile.svg
            Subject.svg
            User404.svg
            Welcome.svg
```
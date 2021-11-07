# Overview of ``./server``

```
.
│   App.js
│   config.js
│   package-lock.json
│   package.json
│   README.md
│   
├── Controllers
│   ├── Article
│   │       DeleteControllers.js
│   │       EditControllers.js
│   │       FindingFunctions.js
│   │       NewControllers.js
│   │       ViewControllers.js
│   │       
│   ├── Chat
│   │       NewControllers.js
│   │       ViewControllers.js
│   │       
│   └── User
│           AuthControllers.js
│           UserControllers.js
│           userExportController.js
│           
├── Models
│       ArticleModel.js
│       CommentModel.js
│       ConversationModel.js
│       DeptModel.js
│       MessageModel.js
│       SubjectModel.js
│       UserModel.js
│       
├── Public
│   └── Pictures
│           no-profile-picture.png
│           
└── Routes
    ├── Article
    │       ArticleRoute.js
    │       DeleteRoute.js
    │       EditRoute.js
    │       NewRoute.js
    │       ViewRoute.js
    │       
    ├── Chat
    │       ChatRoute.js
    │       NewRoute.js
    │       ViewRoute.js
    │       
    └── User
            AuthRoute.js
            UserRoute.js
```
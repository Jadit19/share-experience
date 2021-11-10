# Share Experiences (MERN Stack Build)

## Requirements

In order to see the project in it's full glory, you'll have to install <a href='https://nodejs.org/en/'>NodeJS</a> on your system and have a local or online <a href='https://www.mongodb.com/'>MongoDB</a> server ready.

## About the project

- This project was concieved as a platform where the students of a college or university can help each other in various academic related areas.<br />
- Students will be able to interact via nicely structured forum pages categorized by the forum's Department and Subject (or Course). Open conversations can also be held in every forum's comment section.<br />
- For privacy, students can directly chat with each other as well using the ``Chat`` option available as a form of Instant Messaging. A feature of 'Group Chat' is in the works and hopefully will be completed soon.
- This application can be run on a browser or as an OS-independent Desktop App.
<!-- - The 'Admins' of the website will be able to censor the unrequired posts as well. -->

## Architecture of the project ``./share-experience-``

```html
.
│   .gitignore
│   README.md
│
├── client/
├── server/
└── socket/
```

## How to run it on your local machine
- Create a ``.env`` file in all three directories.
- In ``./socket/.env``, type in the following:
```html
SOCKET_PORT = <insert socket port here>
CLIENT_PORT = 3000
```
- In ``./server/.env``, type in the following:
```html
SERVER_PORT = <insert server port here>
MONGO_URL = <insert mongodb link here>
MAIL_ID = <insert server email ID here>
MAIL_PASSWORD = <insert server email password here>
MAIL_PROVIDER = <insert server email provider's name here>
```
- In ``./client/.env``, type in the following:
```html
SOCKET_PORT = <insert socket port here>
SERVER_PORT = <insert server port here>
```
- Now, open three terminals in the cloned directory.
- In the first one, run the following commands: (may ask for system password)
```sh
$ cd server
$ npm install
$ sudo service mongod start
$ npm start
```
- In the next one, run the following commands:
```sh
$ cd socket
$ npm install
$ npm start
```
- In the last one, run the following commands:
```sh
$ cd client
$ npm install
$ npm start
```
- In-case you want to run a Desktop app version of it, instead of running "npm start" in the client, you can run:
```sh
$ npm run electron-dev
```
- CAUTION: Start the back-end and socket-io before starting the front end. Or, obviously, no API request will be able to proceed..
<!-- - If you want, you can change the port and mongo DB url in the appropriate locations. -->
<br />

## Happy Hacking!
In case any error or bug is found, do let us know! :)<br />
Suggestions are welcomed with open arms.<br />
This product is still in it's development and testing phase.<br /><br />
Original Idea: <a href='https://github.com/dinesh-cpu' target='_blank'>Dinesh Ram</a><br />
Dev Team: <a href='https://github.com/Jadit19' target = '_blank'>Adit jain</a>


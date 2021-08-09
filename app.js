const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;


//! For mongodb to be connected, type in:
//!>>--------------------------------------------<<
//!         sudo service mongod start
//!>>--------------------------------------------<<
//! in the terminal for mongodb application to start varna connection error dikhaayega..


mongoose.connect('mongodb://localhost:27017/trial4A', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connected Successfully!!');
}).catch((err) => {
    console.log('Oh no! Error:');
    console.log(err);
})

//! Static files..
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//! Set Template Engine to ejs..
app.set('views', './src/views');
app.set('view engine', 'ejs');

//! Routes..
const loginRouter = require("./src/routes/loginBackend");
const articleRouter = require("./src/routes/articleBackend");
app.use('/user', loginRouter);
app.use('/articles', articleRouter);

app.get('/', (req,res) => {
    res.render('home');
})
app.get('/error', (req,res) => {
    res.render('error');
})

//! Listening on port..
app.listen(port, () => {
    console.log(`Listening on port #${port}..`);
})
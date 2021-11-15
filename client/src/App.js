import React from 'react'
import { BrowserRouter as Router, Switch, Route } from  'react-router-dom'
import useLocalStorage from './Hooks/useLocalStorage';

import { isDesktopApp } from './config';

import Topbar from './Components/Topbar/Topbar';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home';
import LoginTrue from './Components/User/Login/LoginTrue';
import LoginFalse from './Components/User/Login/LoginFalse';

import Register from './Pages/User/Register';
import Login from './Pages/User/Login';
import Forgot from './Pages/User/Forgot';
import Profile from './Pages/User/Profile'
import EditProfile from './Pages/User/EditProfile';

import AllDept from './Pages/Article/AllDept';
import AllSubjects from './Pages/Article/AllSubjects';
import AllArticles from './Pages/Article/AllArticles';
import ShowArticle from './Pages/Article/ShowArticle';

import Chat from './Pages/Chat/Chat'

function App() {
    const [user, setUser] = useLocalStorage('user', null)

    return (
        <div className='app'>
        {
            isDesktopApp ? <Topbar /> : null
        }
            <Navbar user={user} />
            <div className='main__container' style={{ marginTop: isDesktopApp ? '80px' : '50px', minHeight: isDesktopApp ? 'calc(100vh - 80px)' : 'calc(100vh - 50px)' }}>
                <Router>
                    <Switch>
                        <Route exact path='/'><Home /></Route>

                        {/* user routes */}
                        <Route exact path='/user/register'>{ user ? <LoginTrue user={user} /> : <Register setUser={setUser} /> }</Route>
                        <Route exact path='/user/login'>{ user ? <LoginTrue user={user} /> : <Login setUser={setUser} /> }</Route>
                        <Route exact path='/user/forgot'>{ user ? <LoginTrue user={user} /> : <Forgot /> }</Route>
                        <Route exact path='/user/profile/:userName'>{ user ? <Profile user={user} /> : <LoginFalse /> }</Route>
                        <Route exact path='/user/editProfile'>{ user ? <EditProfile user={user} setUser={setUser} /> : <LoginFalse /> }</Route>

                        {/* article routes */}
                        <Route exact path='/article'>{ user ? <AllDept user={user} /> : <LoginFalse /> }</Route>
                        <Route exact path='/article/:deptSlug'>{ user ? <AllSubjects user={user} /> : <LoginFalse /> }</Route>
                        <Route exact path='/article/:deptSlug/:subjectSlug'>{ user ? <AllArticles user={user} /> : <LoginFalse /> }</Route>
                        <Route exact path='/article/:deptSlug/:subjectSlug/:articleSlug'>{ user ? <ShowArticle user={user} /> : <LoginFalse /> }</Route>
                        
                        <Route exact path='/chat'>{ user ? <Chat user={user} /> : <LoginFalse /> }</Route>
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default App;

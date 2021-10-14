import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './pages/Home/Home';
import Login from './pages/User/Login/Login';
import SignUp from './pages/User/SignUp/SignUp';
import Profile from './pages/User/Profile/Profile';
import ChangePass from './pages/User/ChangePass/ChangePass';
import ForgotPass from './pages/User/ForgotPass/ForgotPass';

import AllDept from './pages/Article/AllDept/AllDept';
import NewDept from './pages/Article/NewDept/NewDept';
import AllSubject from './pages/Article/AllSubject/AllSubject';
import NewSubject from './pages/Article/NewSubject/NewSubject';
import AllArticle from './pages/Article/AllArticle/AllArticle';
import NewArticle from './pages/Article/NewArticle/NewArticle';
import ShowArticle from './pages/Article/ShowArticle/ShowArticle';
import EditArticle from './pages/Article/EditArticle/EditArticle';

import Navbar from './components/Navbar/Navbar';
import './App.css';

function App() {
  // const user = JSON.parse(localStorage.getItem('profile'))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  
  return (
    <div className="App">
      <Navbar user={user} />

      <div className='jff'>
        <div className='main__container'>
          <Router>
            <Switch>
              <Route exact path='/'><Home /></Route>
              <Route exact path='/user/login'><Login saveUser={setUser} /></Route>
              <Route exact path='/user/signUp'><SignUp /></Route>
              <Route exact path='/user/profile'><Profile user={user} /></Route>
              <Route exact path='/user/changePassword'><ChangePass user={user} /></Route>
              <Route exact path='/user/forgotPassword'><ForgotPass /></Route>

              <Route exact path='/article'><AllDept user={user} /></Route>
              <Route exact path='/article/newDept'><NewDept user={user} /></Route>
              <Route exact path='/article/:deptSlug'><AllSubject user={user} /></Route>
              <Route exact path='/article/:deptSlug/newSubject'><NewSubject user={user} /></Route>
              <Route exact path='/article/:deptSlug/:subjectSlug'><AllArticle user={user} /></Route>
              <Route exact path='/article/:deptSlug/:subjectSlug/newArticle'><NewArticle user={user} /></Route>
              <Route exact path='/article/:deptSlug/:subjectSlug/:articleSlug'><ShowArticle user={user} /></Route>
              <Route exact path='/article/:deptSlug/:subjectSlug/:articleSlug/edit'><EditArticle user={user} /></Route>
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;

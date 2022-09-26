import React, { useState } from "react";
import {Redirect, Route, Switch} from "react-router-dom"
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

function Main(props) {

    const { isLoggedIn, handleLoggedIn } = props;

    //login
    //  case1: already logged in => home
    //  case2: hasn't logged in => Login
    //Reference from https://v5.reactrouter.com/web/api/Route func
    const showLogin = () =>{
        return isLoggedIn ? 
            <Redirect to = "/home"/> 
          : <Login handleLoggedIn = {handleLoggedIn} />
    }

    //home
    // case1: already logged in => home
    // case2: hasn't logged in => Login
    const showHome = () => {
        return isLoggedIn ? 
            <Home /> 
          : <Redirect to = "/login"/>
    }

    return (
        <div className="main">
            <Switch>
            <Route exact path="/" render={showLogin}/>
            <Route path="/login" render={showLogin}/>
            <Route path="/register" component={Register}/>
            <Route path="/home" render={showHome}/>
            </Switch>
        </div>
    );
}

export default Main;

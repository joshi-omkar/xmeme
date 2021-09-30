import React from "react";
import Nav from '../nav/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch,  Route} from "react-router-dom";


import './postmeme.css';
import Form from "./form"
import Home from '../xmeme/home'

const Postmeme = () => {
    return (
      <Router>
        <Nav/>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/addmeme' component={Form} />
        </Switch>
      </Router>
        
    )
}
export default Postmeme;

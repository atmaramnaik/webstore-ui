/**
 * Created by atmaramn on 7/11/17.
 */
import React from 'react'
import './App.css'
import Header from './Header'
import RegisterForm from './RegisterForm'
import Login from './Login'
import { Switch, Route} from 'react-router-dom'
import {Home} from './Home'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
const App = () => {
    return (<main>
        <div className="header">
            <Header/>
        </div>

        <Switch>
           <Route exact path='/register' component={RegisterForm} />
           <Route exact path='/login' component={Login} />
           <Route path='/' component={()=>{return (<Home/>)}}/>
        </Switch>
       </main>)}
export default App
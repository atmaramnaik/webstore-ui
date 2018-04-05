/**
 * Created by atmaramn on 10/4/17.
 */
import React,{ Component } from 'react'

import { Provider } from 'react-redux'
import App from './App'
import store, { history } from '../store'
import { ConnectedRouter } from 'react-router-redux'
export default class Init extends Component{
    componentWillMount() {
        // Creating the socket-client instance will automatically connect to the server.

        // this.socket.on('Group.58',data=>{console.log(data)})
    }
    render(){
        return (<Provider store={store}>
            <ConnectedRouter history={history}>
                <div>
                    <App/>
                </div>
            </ConnectedRouter>
        </Provider>)
    }
}
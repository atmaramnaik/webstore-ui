/**
 * Created by atmaramn on 6/21/17.
 */
/**
 * Created by atmaramn on 6/21/17.
 */
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import mmApp from './reducers'
export const history = createHistory({basename: '/ui'})
const initialState = {}
const enhancers = []
const middleware = [
    thunk,
    routerMiddleware(history)

]

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
)

const store = createStore(
    mmApp,
    initialState,
    composedEnhancers
)

export default store

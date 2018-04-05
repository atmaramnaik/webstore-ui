import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import products from './products'
import user from './user'
const mmApp = combineReducers({
    form: formReducer,
    products,
    user
})

export default mmApp

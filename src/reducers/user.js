/**
 * Created by atmaramn on 7/13/17.
 */
import {REGISTRATION_SUCCESS,LOGIN_SUCCESS,LOGOUT_SUCCESS,UNREGISTER_SUCCESS,ROLES_SUCCESS} from '../constants/actions/auth'
export default function user(state ={}, action) {
    switch (action.type) {
        case REGISTRATION_SUCCESS:
            return Object.assign({},state,{isLoggedIn:true});
        case LOGIN_SUCCESS:
            return Object.assign({},state,{isLoggedIn:true});
        case UNREGISTER_SUCCESS:
        case LOGOUT_SUCCESS:
            return Object.assign({},{isLoggedIn:false});
        case ROLES_SUCCESS:
            return Object.assign({},state,{roles:action.data});
        default:
            return Object.assign({},state,{isLoggedIn:localStorage["jwt"]?true:false});

    }
}
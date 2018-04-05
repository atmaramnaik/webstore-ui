/**
 * Created by atmaramn on 7/13/17.
 */
import {public_post,user_delete,user_get} from '../api/core'
import {REGISTRATION_SUCCESS,LOGIN_SUCCESS,LOGOUT_SUCCESS,UNREGISTER_SUCCESS,ROLES_SUCCESS} from '../constants/actions/auth'
const SERVICE_URL=process.env.REACT_APP_REGISTRATION_SERVICE
export function register(body){
    delete body.confirm_password;
    return function (dispatch) {
        return public_post(SERVICE_URL,'/auth/register',body).then((res)=> {
            localStorage.setItem("jwt",res.headers['authorization'])
            dispatch({type: REGISTRATION_SUCCESS})

        })
    }
}
export function unregister(){
    return function (dispatch) {
        return user_delete('/unregister').then((res) =>{
            localStorage.clear()
            dispatch({type: UNREGISTER_SUCCESS})
        })
    }
}
export function login(body){
    return function (dispatch) {
        return public_post(SERVICE_URL,'/auth/login',body).then((res) =>{
            localStorage.setItem("jwt",res.headers['authorization'])
            dispatch({type: LOGIN_SUCCESS})
        })
    }
}
export function roles(){
    return function (dispatch) {
        return user_get(SERVICE_URL,'/auth/roles').then((res) =>{
            dispatch({type: ROLES_SUCCESS,data:res.body})
        })
    }
}
export function logout(){
    return function (dispatch) {
        localStorage.clear();
        dispatch({type: LOGOUT_SUCCESS})
    }
}
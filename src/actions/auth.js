/**
 * Created by atmaramn on 7/13/17.
 */
import {public_post,user_delete,user_get} from '../api/core'
import {REGISTRATION_SUCCESS,LOGIN_SUCCESS,LOGOUT_SUCCESS,UNREGISTER_SUCCESS,ROLES_SUCCESS,PROFILE_SUCCESS} from '../constants/actions/auth'
function serviceURL() {
    if(process.env.NODE_ENV=='development'){
        return 'http://localhost' + process.env.REACT_APP_REGISTRATION_SERVICE
    }
    else{
        return 'http://'+window.location.host + process.env.REACT_APP_REGISTRATION_SERVICE
    }

}
export function register(body){
    delete body.confirm_password;
    return function (dispatch) {
        return public_post(serviceURL(),'/auth/register',body).then((res)=> {
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
        return public_post(serviceURL(),'/auth/login',body).then((res) =>{
            localStorage.setItem("jwt",res.headers['authorization'])
            dispatch({type: LOGIN_SUCCESS})
        })
    }
}
export function roles(){
    return function (dispatch) {
        return user_get(serviceURL(),'/auth/roles').then((res) =>{
            dispatch({type: ROLES_SUCCESS,data:res.body})
        })
    }
}
export function profile(){
    return function (dispatch) {
        return user_get(serviceURL(),'/auth/profile').then((res) =>{
            dispatch({type: PROFILE_SUCCESS,data:res.body})
        })
    }
}
export function logout(){
    return function (dispatch) {
        localStorage.clear();
        dispatch({type: LOGOUT_SUCCESS})
    }
}
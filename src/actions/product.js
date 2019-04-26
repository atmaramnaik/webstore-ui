/**
 * Created by atmaramn on 7/19/17.
 */
import {user_get,user_post} from '../api/core'
import {PRODUCTS_LOAD_SUCCESS,PRODUCT_STOCK_LOAD_SUCCESS,PRODUCT_BUY_SUCCESS} from '../constants/actions/product'
const SERVICE_URL=process.env.REACT_APP_PRODUCT_SERVICE

export function load_products(){
    return function (dispatch) {
        return user_get(SERVICE_URL,'/product/all').then((res)=>{
                dispatch({
                type: PRODUCTS_LOAD_SUCCESS, data: res.body
                })
            },(fail) => {
        })
    }
}
export function load_stock(id){
    return function (dispatch) {
        return user_get(SERVICE_URL,'/product/'+id+"/stock").then((res)=>{
            dispatch({
                type: PRODUCT_STOCK_LOAD_SUCCESS, key:id,data: res.body
            })
        },(fail) => {

        })
    }
}
export function place_order(product,body){
    return function (dispatch) {
        return user_post(SERVICE_URL,'/product/'+product+"/buy",body).then((res)=>{
            dispatch({
                type: PRODUCT_BUY_SUCCESS, key:product,data: res.body
            });
            dispatch(load_stock(product));
        },(fail) => {

        })
    }
}
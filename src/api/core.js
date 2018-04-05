/**
 * Created by atmaramn on 7/13/17.
 */

import request from 'superagent'
export function public_get(service_url,end_point){
    return request
        .get(service_url+end_point)
        .on('request',ajaxStart)
        .on('response', ajaxEnd)
}
export function public_post(service_url,end_point,body){
    return request
        .post(service_url+end_point)
        .send(body)
        .on('request',ajaxStart)
        .on('response', ajaxEnd)
}
export function user_get(service_url,end_point){
    return request
        .get(service_url+end_point)
        .set('Authorization',localStorage['jwt'])
        .on('request',ajaxStart)
        .on('response', ajaxEnd)
}
export function user_post(service_url,end_point,body){
    return request
        .post(service_url+end_point)
        .send(body)
        .set('Authorization',localStorage['jwt'])
        .on('request',ajaxStart)
        .on('response', ajaxEnd)
}
export function user_delete(service_url,end_point){
    return request
        .delete(service_url+end_point)
        .set('Authorization',localStorage['jwt'])
        .on('request',ajaxStart)
        .on('response', ajaxEnd)
}
function ajaxStart(req){
    if(!window.loading){
        window.loading=0;
    }
    window.loading++;
}
function ajaxEnd(resp){
    window.loading--;
}
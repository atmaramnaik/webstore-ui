/**
 * Created by atmaramn on 7/24/17.
 */
import {PRODUCTS_LOAD_SUCCESS,PRODUCT_STOCK_LOAD_SUCCESS} from '../constants/actions/product'
import {LOGOUT_SUCCESS} from '../constants/actions/auth'
import update from 'react-addons-update'
export default function products(state ={loaded:false,data:[]}, action) {
    switch (action.type) {
        case PRODUCTS_LOAD_SUCCESS:
            return update(state,{loaded:{'$set':true},data:{'$set':action.data}});
        case PRODUCT_STOCK_LOAD_SUCCESS:
            var index=state.data.findIndex((product)=>{return product.id===action.key})
            return update(state,{loaded:{'$set':true},data:{[index]:{stock:{"$set":action.data}}}});
        case LOGOUT_SUCCESS:
            return {loaded:false,data:[]};
        default:
            return state;
    }
}
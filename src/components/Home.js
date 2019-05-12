/**
 * Created by atmaramn on 7/13/17.
 */
import React,{ Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Redirect} from 'react-router-dom'
import {load_products,load_stock} from '../actions/product'
import {roles,profile} from '../actions/auth'
import {Panel} from 'react-bootstrap'
import {Product} from './Product'

export class Home extends Component{

    componentDidUpdate(prevProps,state){

    }
    render() {
        if (!this.props.isLoggedIn) {
            return <Redirect to="/login"/>
        }
        var products= <div>Loading</div>
        if (!this.props.products.loaded) {
            this.props.load_products();

        } else {
            this.props.products.data.forEach((product)=>{
                if(!product.stock && product.stock!==0)
                    this.props.load_stock(product.id);
                return true;
            });
            products = this.props.products.data.map((product, index) => {
                return (<Product data={product}/>)
            })
        }


        return (<Panel>{products}</Panel>)
    }
}
Home.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    products:PropTypes.object,
    roles:PropTypes.array
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn:state.user.isLoggedIn,
        products:state.products,
        roles:state.user.roles,
        profile:state.user.profile,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        load_roles:()=> dispatch(roles()),
        load_profile:()=> dispatch(profile()),
        load_products: () => dispatch(load_products()),
        load_stock: (id) => dispatch(load_stock(id))
    };
};
Home = connect(mapStateToProps,mapDispatchToProps)(Home)
export default Home;
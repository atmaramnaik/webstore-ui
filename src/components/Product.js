import React,{Component} from "react";
import {Order} from './Order'
export class Product extends Component{
    render(){
        if(this.props.data){
            return (<div id={"Product#"+this.props.data.id} className="product">
                Name: <span className="product-name">{this.props.data.name}</span><br/>
                Price: <span className="product-price">{this.props.data.price}</span><br/>
                Stock: <span className="product-stock">{this.props.data.stock}</span>
                <div className="product-buy"><Order product={this.props.data.id} stock={this.props.data.stock}/></div>
            </div>);
        }

    }
}
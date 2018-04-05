/**
 * Created by atmaramn on 7/25/17.
 */
import React, { Component } from 'react'
import './Infinite.css'
import ReactDOM from 'react-dom';
class Infinite extends Component{
    componentWillMount(){
        this.delta=0;
    }
    componentDidMount(){
        ReactDOM.findDOMNode(this.refs.root).addEventListener("scroll", this.scrollFunction.bind(this), true);
    }
    componentWillUpdate(nextProps,state){
        if(this.props.items.length!=nextProps.items.length)
            if(this.props.items.length==0){
                this.delta=0;
            } else {
                this.delta = (nextProps.items.length - this.props.items.length);
            }
    }
    componentDidUpdate(prevProps,state){
        if(prevProps.scroll!=this.props.scroll){
            ReactDOM.findDOMNode(this.refs.root).scrollTop=1000000;
        }
    }
    scrollFunction(){
        if(this.refs.root && ReactDOM.findDOMNode(this.refs.root).scrollTop==0){
            if(this.props.hasMore)
            {
                this.props.load();
                ReactDOM.findDOMNode(this.refs.pointer).scrollIntoView()
            }

        }
    }
    render(){
        return (<div ref="root" className="infinite">
            {React.Children.map(this.props.items, (element, index) => {
                if(index==this.delta){
                    return React.cloneElement(element, { ref: 'pointer' });
                } else
                {
                    return element;
                }

            })}
        </div>)
    }
}
export default Infinite;

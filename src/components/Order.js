import React,{Component} from "react";
import ReactDOM from "react-dom"
import {place_order} from "../actions/product";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Form,FormGroup,Col,FormControl,Button,Overlay} from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'

export class Order extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleToggle = this.handleToggle.bind(this);

        this.state = {
            show: false
        };
    }

    handleToggle() {
        this.setState({ show: !this.state.show });
    }
    renderField({input, label,id, type, meta: { touched, error, warning }}){
        return (<FormGroup>
            <Col sm={2}>
                {label}
            </Col>
            <Col sm={10}>
                <FormControl id={id} {...input} placeholder={label} type={type} />
                {touched &&
                ((error &&
                    <span>
            {error}
          </span>) ||
                    (warning &&
                        <span>
              {warning}
            </span>))}
            </Col>
        </FormGroup>)
    }
    submit(values,dispatch){
        if(values.quantity>this.props.stock){

        } else {
            this.props.place_order(this.props.product,values);
            this.setState({ show: !this.state.show });
        }


    }
    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <div style={{ height: 100, position: 'relative' }}>
                <Button
                    ref={button => {
                        this.target = button;
                    }}
                    onClick={this.handleToggle}
                    id="buy"
                >
                    Buy
                </Button>

                <Overlay
                    show={this.state.show}
                    onHide={() => this.setState({ show: false })}
                    placement="right"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.target)}
                >
                    <div
                        style={{
                            position: 'absolute',
                            backgroundColor: '#EEE',
                            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
                            border: '1px solid #CCC',
                            borderRadius: 3,
                            marginLeft: -5,
                            marginTop: 5,
                            padding: 10
                        }}
                    >
                        <Form onSubmit={ handleSubmit(this.submit.bind(this)) } horizontal>
                            <Field name="quantity" type="text" component={this.renderField} id="quantity"/>
                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button id="order" type="submit" disabled={submitting}>
                                        Submit
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </Overlay>
            </div>
        );
    }
}
Order = reduxForm({
    form: 'order'
})(Order);

Order.propTypes = {
    product: PropTypes.number,
    show:PropTypes.bool,
    stock:PropTypes.number
};

const mapStateToProps = (state,ownProps) => {
    return {
        show:ownProps.show,
        product:ownProps.product,
        stock:ownProps.stock
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        place_order:(product,quantity)=> dispatch(place_order(product,quantity))
    };
};
Order = connect(mapStateToProps,mapDispatchToProps)(Order)
export default Order;
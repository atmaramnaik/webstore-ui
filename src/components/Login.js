/**
 * Created by atmaramn on 7/14/17.
 */
import React, { Component }from 'react'
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import {login} from '../actions/auth'
import { connect } from 'react-redux'
import { Redirect} from 'react-router-dom'
import {Panel} from 'react-bootstrap'
import {Form,FormGroup,Col,FormControl,Button} from 'react-bootstrap'
class LoginForm extends Component{
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
        dispatch(login(values));
    }
    render(){
        if(this.props.isLoggedIn){
            return (<Redirect to='/'/>)
        }
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <Panel><Form onSubmit={ handleSubmit(this.submit) } horizontal>
                <Field name="email" type="email" component={this.renderField} label="Email" id="username"/>
                <Field name="password" type="password" component={this.renderField} label="Password" id="password"/>
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button id="loginButton" type="submit" disabled={submitting}>
                            Submit
                        </Button>
                        <Button type="button" disabled={pristine || submitting} onClick={reset}>
                            Clear Values
                        </Button>
                    </Col>
                </FormGroup>
            </Form></Panel>
        )
    }

}

LoginForm = reduxForm({
    form: 'login'
})(LoginForm)

LoginForm.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn:state.user.isLoggedIn
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
    };
};
LoginForm = connect(mapStateToProps,mapDispatchToProps)(LoginForm)
export default LoginForm;
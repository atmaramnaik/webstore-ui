/**
 * Created by atmaramn on 7/13/17.
 */
import React, { Component }from 'react'
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import {register} from '../actions/auth'
import { connect } from 'react-redux'
import { Redirect} from 'react-router-dom'
import {Panel} from 'react-bootstrap'
import {Form,FormGroup,Col,FormControl,Button} from 'react-bootstrap'
const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Required'
    } else if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if(values.password!==values.confirm_password){
        errors.confirm_password='Password and Confirm Password Should match'
    }
    return errors
}
const warn = values => {
    const warnings = {}
    return warnings
}

class  RegisterForm extends Component{
    submit(values,dispatch){
        dispatch(register(values));
    }
    renderField({input, label, type, meta: { touched, error, warning }}){
        return (<FormGroup>
            <Col sm={2}>
                {label}
            </Col>
            <Col sm={10}>
                <FormControl {...input} placeholder={label} type={type} />
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
    render() {
        if(this.props.isLoggedIn){
            return (<Redirect to="/"/>)
        }
        const { handleSubmit, pristine, reset, submitting } = this.props
        return (
            <Panel><Form onSubmit={ handleSubmit(this.submit) } horizontal>
                <Field name="name" type="test" component={this.renderField} label="Name" />
                <Field name="email" type="email" component={this.renderField} label="Email" />
                <Field name="password" type="password" component={this.renderField} label="Password" />
                <Field name="confirm_password" type="password" component={this.renderField} label="Confirm Password" />
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button type="submit" disabled={submitting}>
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

RegisterForm = reduxForm({
    form: 'register',
    validate,
    warn
})(RegisterForm)
RegisterForm.propTypes = {
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
RegisterForm = connect(mapStateToProps,mapDispatchToProps)(RegisterForm)
export default RegisterForm;
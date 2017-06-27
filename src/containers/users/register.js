import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {register} from '../../actions/authAction';
import {validateUserForm as validate, renderUserForm} from '../../components/form';
import {showAlert} from '../../components/alert';


class SignUp extends Component {

	constructor(props) {
		super(props);
		this.state = {errorMessage: ''};
	}

	onSubmit(values) {
		this.props.register(values.email, values.password, {displayName: values.username}, () => {
			this.props.history.goBack();
			showAlert('You have successfully created an account.');
		}, (error) => {
			this.setState({errorMessage: error});
		});
	}


	render() {
		const that = this;
		const btn = "Register";
		const {errorMessage} = this.state;
		
		return (
			<div className="user-form">
				{errorMessage && <div className="error-message">{errorMessage}</div>}
				{renderUserForm("register", that, this.onSubmit, btn)}
			</div>

		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}


export default reduxForm({
	form: 'RegisterForm',
	validate
})(connect(mapStateToProps, {register})(SignUp));
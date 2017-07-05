import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {login} from '../../actions/authAction';
import {validateUserForm as validate, renderUserForm} from '../../components/form/forms';
import {showAlert} from '../../components/alert';

class SignUp extends Component {

	constructor(props) {
		super(props);
		this.state = {errorMessage: ''};
	}

	onSubmit(values) {
		this.props.login(values.email, values.password, () => {
			this.props.history.push("/");
			showAlert('You have signed in successfully.');
		}, (error) => {
			this.setState({errorMessage: error});
		});
		
	}

	render() {
		const that = this;
		const btn = "Log In";
		const {errorMessage} = this.state;

		return (
			<div className="user-form">
				{errorMessage && <div className="error-message">{errorMessage}</div>}
				{renderUserForm("login", that, this.onSubmit, btn)}
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
	form: 'LoginForm',
	validate
})(connect(mapStateToProps, {login})(SignUp));
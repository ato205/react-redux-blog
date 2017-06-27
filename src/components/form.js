import React from 'react';
import {Field, Form} from 'redux-form';

export function renderInputField(field) {
	const {meta: {touched, error}} = field;
	return (
		<div className="form-group">
			<label>{field.label}</label>
			<input 
				className="form-control" 
				type={field.type}
				placeholder={field.placeholder}
				{...field.input} />
			{touched && error ? 
				<div className="form-error"><i className="fa fa-warning"></i>{error}</div> : ''}
		</div>
	);
}

export function renderTextareaField(field) {
	const {meta: {touched, error}} = field;
	return (
		<div className="form-group">
			<label>{field.label}</label>
			<textarea 
				cols="30" rows="10" 
				className="form-control"
				placeholder={field.placeholder}
				{...field.input}
			></textarea> 
			{touched && error ? 
				<div className="form-error"><i className="fa fa-warning"></i>{error}</div> : ''}
		</div>
	);
}

export function renderUserForm(formType, that, onSubmit, btn) {
	const {handleSubmit} = that.props;

	const username = (formType === 'register') ?
					<Field 
						label="Username"
						name="username"
						placeholder="Enter Your Username"
						type="username"
						component={renderInputField}
					/>
					: '';
	
	return (
		<Form onSubmit={handleSubmit(onSubmit.bind(that))}>

			{username}

			<Field 
				label="Email"
				name="email"
				placeholder="Enter Your Email"
				type="email"
				component={renderInputField}
			/>

			<Field 
				label="Password"
				name="password"
				placeholder="Enter Your Password"
				type="password"
				component={renderInputField}
			/>
			<div className="bottom-button">
				<button className="btn btn-primary">{btn}</button>
			</div>
		</Form>
	);
}

export function renderPostForm(that, onSubmit, btn1, btn2, onClick) {
	const {handleSubmit} = that.props;

	return (
		<Form onSubmit={handleSubmit(onSubmit.bind(that))}>
			<Field 
				label="Title"
				name="title"
				type="text"
				placeholder="Enter Post Title"
				component={renderInputField}
			/>
			
			<Field 
				label="Post Content"
				name="content"
				placeholder="Enter Post Content"
				component={renderTextareaField}
			/>
			<div className="form-buttons">
				<button type="submit" className="btn btn-primary">{btn1}</button>
				<button type="button" className="btn btn-secondary" onClick={onClick}>{btn2}</button>
			</div>
		</Form>
	);
}

export function validatePostForm(values) {
	const errors = {};
	if (!values.title)
		errors.title = 'Required';
	
	if (!values.content)
		errors.content = 'Required';

	return errors;
}

export function validateUserForm(values) {
	const errors = {};
	if (!values.username)
		errors.username = "Required";
	else if (values.username.length < 2)
		errors.username = 'Must be at least 2 characters';
	else if (values.username.length > 20)
		errors.username = 'Must be less than 20 characters';
	if (!values.email)
		errors.email = "Required";
	else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
		errors.email = "Invalid email address";

	if (!values.password)
		errors.password = "Required";
	else if (values.password.length < 6)
		errors.password = "Must be at least 6 characters";

	return errors;
}

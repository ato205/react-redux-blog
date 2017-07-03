import React from 'react';
import {Field, Form} from 'redux-form';
import PropTypes from 'prop-types';
import {renderInputField, renderTextareaField} from './forms';

const PostForm = (props) => {
	const {onSubmit, formType} = props;
	return (
		<Form onSubmit={onSubmit}>
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
				rows="10"
				placeholder="Enter Post Content"
				component={renderTextareaField}
			/>
			
			<div className="bottom-button">
				<button type="submit" className="btn btn-primary">{formType === 'edit' ? 'Save' : 'Create'}</button>
			</div>
		</Form>
	);
}

export default PostForm;

PostForm.propTyps = {
	onSubmit: PropTypes.func.isRequired,
	formType: PropTypes.oneOf(['edit'])
};
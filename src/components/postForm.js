import React from 'react';
import {Field, Form} from 'redux-form';
import {renderInputField, renderTextareaField} from './form';

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
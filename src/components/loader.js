import React from 'react';
import Halogen from 'halogen';

const Loader = (props) => {
	return (
		<div className="loader">
			<Halogen.PulseLoader color="#26A65B" size="10px" />
		</div>
	);
}

export default Loader;
import React from 'react';
import _ from 'lodash';

const Pagination = (props) => {
	const {pageNumbers, currentPage, handlePaginationClick, handlePrevNextClick} = props;
	
	const lastPage = _.last(pageNumbers);
	let start = 1, end = lastPage;
	
	// There are 3 or less pages
	if (pageNumbers.length < 4) {
		start = 1;
		end = lastPage;
	}
	// current page is 1
	else if (currentPage == 1) {
		start = 1;
		end = 3;
	}
	// current page is 2
	else if (currentPage == 2) {
		start = 1;
		end = 4; 
	}
	// current page is the second to last page
	else if (lastPage - currentPage == 1) {
		start = lastPage - 3;
		end = lastPage;
	}
	// current page is the last page
	else if (lastPage == currentPage) {
		start = lastPage - 2;
		end = lastPage;
	}
	// other cases
	else {
		start = currentPage - 2;
		end = Number(currentPage) + 2;
	}
	// get only the page numbers that need to be displayed
	const pages = _.slice(pageNumbers, start-1, end);
	const prevBtnClassName = (currentPage == 1) ? "page-item disabled" : "page-item";
	const nextBtnClassName = (currentPage == lastPage) ? " page-item disabled" : "page-item";

	return (
		<ul className="pagination justify-content-center">
			<li className={prevBtnClassName}>
		        <a className="page-link" aria-label="Previous"
		        	id="Prev" 
		        	onClick={(e) => handlePrevNextClick(e, pages, currentPage)} 
		        >&laquo;</a>
		    </li>
			{pages.map(number => {
				return (
					<li className={(number == currentPage) ? "page-item active" : "page-item"} key={number}>
						<a 
							className="page-link"
							id={number}
							onClick={handlePaginationClick}
						>{number}</a>
					</li>
				);
			})}
			<li className={nextBtnClassName}>
		        <a className="page-link" aria-label="Next"
		        	id="Next"
		        	onClick={(e) => handlePrevNextClick(e, pages, currentPage)} 
		        >&raquo;</a>
		    </li>
		</ul>
	);
}

export default Pagination;
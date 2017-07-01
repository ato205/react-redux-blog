import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {logout} from '../actions/authAction';


class Navbar extends Component {

	onLogout() {
		this.props.logout(() => {
			this.props.history.push("/");
		});
	}

	renderNavbar() {
		const {auth} = this.props;

		if (auth.isAuthenticated) {
			return (
				<ul className="navbar-nav ml-auto">
					<li className="nav-item">
						<NavLink 
							exact={true} activeClassName="active" 
							to="/users/profile" className="nav-link"><i className="fa fa-user-circle"></i>{auth.user}</NavLink>
					</li>
					<li className="nav-item">
						<button 
							className="nav-link logout-btn" 
							onClick={this.onLogout.bind(this)}><i className="fa fa-sign-out"></i>Logout</button>
					</li>
				</ul>
			);
		}
		else 
			return (
				<ul className="navbar-nav ml-auto">
					<li className="nav-item">
						<NavLink 
							exact={true} activeClassName="active" 
							to="/users/login" className="nav-link"><i className="fa fa-sign-in"></i>Log In</NavLink>
					</li>
					<li className="nav-item">
						<NavLink 
							exact={true} activeClassName="active" 
							to="/users/register" className="nav-link"><i className="fa fa-user-plus"></i>Register</NavLink>
					</li>
				</ul>
			);
	}

	render() {
		return (
			<nav className="navbar navbar-toggleable-md navbar-light bg-faded">
				<div className="container">
					<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<NavLink to="/posts" className="navbar-brand">Simple Blog</NavLink>
					<div className="collapse navbar-collapse" id="navigation">
						<ul className="navbar-nav">
							<li className="nav-item">
								<NavLink 
									exact={true} activeClassName="active" 
									to="/posts" className="nav-link"><i className="fa fa-home"></i>Home</NavLink>
							</li>
							<li className="nav-item">
								<NavLink 
									exact={true} activeClassName="active" 
									to="/posts/create" className="nav-link"><i className="fa fa-plus-circle"></i>New Post</NavLink>
							</li>
						</ul>
						
						{this.renderNavbar()}
						
					</div>
				</div>
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

export default withRouter(connect(mapStateToProps, {logout})(Navbar));
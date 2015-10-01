import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';


export default class SearchBox extends Component {
	static propTypes = {
	}

	componentDidUpdate = () => {
		console.log(this.props.loc.pathname)
	}

	render() {
		const { loc } = this.props;
		const searchIcon = require('../assets/SearchIcon.png');
		return(
			<div className="input-button-group predictive-search">
				<button className="button button-inline button-with-icon iconisInNav">
					<img className="search-icon svg-icon" src={searchIcon}></img>
				</button>
				<input className="text-input search-input input-rounded"
					   placeholder="Search"
				/>
				{ String(loc.pathname) !== '/createset' &&
					<Link className="button button-primary create-set-button" to="/createset">
						Create a study set					
					</Link>
				}				
			</div>
		);
	}
}
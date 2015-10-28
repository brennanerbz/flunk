import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class SignPosts extends Component {
	static propTypes = {

	}
	
	render() {
		const { current_slot, slots } = this.props;
		const count = slots.length;
		const signs = Array.apply(null, Array(count + 1).join('0').split('')).map((x, i) => {

			const className = classnames('material-icons md-18 sign_circle', 
			{ 'active_sign': current_slot.order - 1 === i}, {'complete_sign': slots[i].completed == true }
			);
			return (

				<li key={i} className='sign_post_item'>
					<i className={className}>brightness_1</i>
				</li>
			);
		});
		return (
			
			<ul className="sign_posting_list">
				{signs}
			</ul>
		);
	}
}
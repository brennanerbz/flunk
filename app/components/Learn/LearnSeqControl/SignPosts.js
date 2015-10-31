import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class SignPosts extends Component {
	static propTypes = {

	}
	
	render() {
		const { current_slot, slots, slot_index, current_miniseq, isUpdatingState } = this.props,
				count = current_miniseq.slots !== undefined ? current_miniseq.slots.length : 0,
				signs = Array.apply(null, Array(count)).map((x, i) => {
					const className = classnames('material-icons md-18 sign_circle', 
					{ 'active_sign': slot_index === i}, 
					{ 'complete_sign': current_miniseq.slots !== undefined
								     ? current_miniseq.slots[i].completed
								     : null });
					return (
						<li key={i} className='sign_post_item'>
							<i className={className}>brightness_1</i>
						</li>
					);
				});
		return (
			
			<ul className="sign_posting_list">
				{	
					signs
				}
			</ul>
		);
	}
}
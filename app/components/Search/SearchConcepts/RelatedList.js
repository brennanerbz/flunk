import React, { Component, PropTypes } from 'react';
import RelatedItem from './RelatedItem';

export default class RelatedList extends Component {
	static propTypes = {
	}

	render() {
		const { related } = this.props;
		return(
			<div className="related_container">
				{
					related !== undefined && related.length > 0
					?
					<div>
						<p className="search_label">Related terms:</p>
						<ul className="related_list">
							{
								related.map((item, i) => {
									return <RelatedItem key={i} index={i} item={item} {...this.props}/>
								})
							}
						</ul>
					</div>
					: null
				}
				
			</div>
		);
	}
}
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TermContent from '../TermContent/TermContent';

export default class TermRow extends Component {
	static propTypes = {
		deleteRow: PropTypes.func,
		setMousePos: PropTypes.func,
		index: PropTypes.number,
		lastIndex: PropTypes.number,
		isMouseOver: PropTypes.bool
	}

	state = {
		isMouseOver: false
	}

	handleDelete = () => {
		const { index, deleteRow, asc_id, associations } = this.props,
			    association = asc_id !== null && associations !== undefined ? associations[asc_id] : null
 		deleteRow(index, association)
	}	

	render() {
		const { asc_id, 
				index,
				items,
				associations } = this.props,

				association = asc_id !== null && associations !== undefined 
				? associations[asc_id]
				: null,

				item = association !== null && items !== undefined
				? items[association.item_id]
				: null
				// onMouseLeave={() => this.props.setMousePos(-1)}
		return (
			<div className="TermRow" 
				onFocus={()=> this.props.setMousePos(index)}
				onMouseOver={() => this.setState({isMouseOver: true})}
				onMouseLeave={() => this.setState({isMouseOver: false})}
				>
				<a className="TermRow-counter">
					{index + 1}
				</a>
				<div className="TermRow-content">
					<TermContent
						item={item}
						association={association}			
						{...this.props}
					/>
				</div>
				<div className="TermRow-operations">	
					{	
						this.state.isMouseOver 
						&& this.props.lastIndex > 1
						&&
						<a className="TermRow-control material-icons"
					   		onClick={this.handleDelete}>
							clear
						</a>
					}
				</div>
			</div>
		);
	}
}


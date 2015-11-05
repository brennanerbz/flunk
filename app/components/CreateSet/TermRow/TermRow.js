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

	handleDelete = () => {
		const { row, deleteRow } = this.props;
 		deleteRow(row)
	}	

	render() {
		const { row, 
				index,
				items,
				associations } = this.props,
				association = associations.length !== 0 ? associations[index] : undefined,
				item = association !== undefined ? items[association.item_id] : undefined;
		return(
			<div className="TermRow" 
				onFocus={()=> this.props.setMousePos(row)}
				onMouseOver={() => this.props.setMousePos(row)}
				onMouseLeave={() => this.props.setMousePos(null)}>
				<a className="TermRow-counter">
					{index}
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
						this.props.isMouseOver 
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


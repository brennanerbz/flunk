import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TermContent from '../TermContent/TermContent';

export default class TermRow extends Component {
	static propTypes = {
		deleteRow: PropTypes.func,
		setMousePos: PropTypes.func,
		term: PropTypes.object,
		index: PropTypes.number,
		lastIndex: PropTypes.number,
		isMouseOver: PropTypes.bool
	}

	handleDelete = () => {
		const { term, deleteRow } = this.props;
 		deleteRow(term.id)
	}	

	render() {
		const { term, index } = this.props;
		return(
		<div className="TermRow"
			 onFocus={()=> this.props.setMousePos(term.id)}
			 onMouseOver={() => this.props.setMousePos(term.id)}
			 onMouseLeave={() => this.props.setMousePos(0)}>
			<a className="TermRow-counter">
				{index}
			</a>
			<div className="TermRow-content">
				<TermContent			
					{...this.props}/>
			</div>
			<div className="TermRow-operations">	
			{this.props.isMouseOver && this.props.lastIndex > 2 &&
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
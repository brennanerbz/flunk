import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TermContent from '../TermContent/TermContent';

export default class TermRow extends Component {
	static propTypes = {
		deleteRow: PropTypes.func,
		item: PropTypes.object,
		association: PropTypes.object,
		index: PropTypes.number,
		totalCount: PropTypes.number,
		isMouseOver: PropTypes.bool
	}

	state = {
		isMouseOver: false,
		item: null,
		association: null,
		association_id: null,
		index: null
	}

	componentDidMount() {
		this.setState({
			index: this.props.index
		});
	}

	componentWillReceiveProps() {
		if(this.state.association !== null) return;
		const { index, asc_id, items, associations } = this.props;
		if(asc_id !== null  && associations !== undefined) {
			let association = associations[asc_id]
			this.setState({ 
				item: items[association.item_id],
				association: association,
				association_id: asc_id
			});
		}
	}

	handleDelete = () => {
 		deleteRow(this.state.index, this.state.association)
	}	

	render() {
		return (
			<div className="TermRow" 
				onFocus={()=> this.props.setMousePos(index)}
				onMouseOver={() => this.setState({isMouseOver: true})}
				onMouseLeave={() => this.setState({isMouseOver: false})}>
				<a className="TermRow-counter">
					{this.state.index + 1}
				</a>
				<div className="TermRow-content">
					<TermContent
						item={this.state.item}
						association={this.state.association}			
						{...this.props}/>
				</div>
				<div className="TermRow-operations">	
					{	
						this.state.isMouseOver 
						&& this.props.totalCount > 1 &&
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


import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TermContent from '../TermContent/TermContent';

export default class TermRow extends Component {
	static propTypes = {
		/* TODO: Fill in propTypes */
	}

	state = {
		is_mouse_over: false, 
		active_row: false,
		active_side: 0, /* 0 = 'term' & 1 = 'definition' */
		total_count: 2,
		terms: null,	
		definitions: null,
		index: null,
		locked_in: false
	}

	sparkNewRow(index, total_count) {
		if(this.state.total_count !== total_count && index == total_count - 1) {
			this.setState({ 
				active_row: true,
				active_side: 0
			})
		}
	}

	componentWillMount() {
		const { association, item, index, total_count, able_to_spark } = this.props;
		this.setState({
			index: index,
			total_count: total_count,
			association: association,
			item: item !== undefined ? item : null
		});
		if(total_count > 2 && able_to_spark) {
			this.sparkNewRow(index, total_count)
		}
	}

	componentWillReceiveProps(nextProps) {
		if(document.activeElement == document.body) this.setState({ active_row: false })
	}

	saveTerm = (term) => { 
	    const { createItem, updateItem, index, item } = this.props;
	    if(item == null && !this.state.locked_in) {
	    	createItem(index, { name: 'target', prop: term })
	    	this.setState({
	    		locked_in: true
	    	})
	    	return;
	    }
	    if(item == null && this.state.locked_in) {
	    	setTimeout(() => {
	    		this.saveTerm(term)
	    	}, 500)
	    	return;
	    }
	    if(item !== null 
	    	&& (item.target == null || item.target.toLowerCase().trim() !== term.toLowerCase().trim() )
	    	&& item.finalized == null) {
	    	updateItem(item, {name: 'target', prop: term})
	    	return;
	    }
	    if(item !== null
	    	&& item.target.toLowerCase().trim() !== term.toLowerCase().trim()
	    	&& item.finalized) {
	    	createItem(index, {name: 'child', prop: item}, {name: 'target', prop: term})
	    }
	}

	saveDefinition = (def) => { 
	    const { createItem, updateItem, index, item } = this.props;
	    if(item == null && !this.state.locked_in) {
	    	createItem(index, { name: 'cue', prop: def })
	    	this.setState({
	    		locked_in: true
	    	})
	    	return;
	    }
	    if(item == null && this.state.locked_in) {
	    	setTimeout(() => {
	    		this.saveDefinition(def)
	    	}, 500)
	    	return;
	    }
	    if(item !== null 
	    	&& (item.cue == null || item.cue.toLowerCase().trim() !== def.toLowerCase().trim())
	    	&& item.finalized == null) {
	    	updateItem(item, {name: 'cue', prop: def})
	    	return;
	    }
	    if(item !== null
	    	&& item.cue.toLowerCase().trim() !== def.toLowerCase().trim()
	    	&& item.finalized) {
	    	createItem(index, {name: 'child', prop: item}, {name: 'cue', prop: def})
	    }
	}

	handleDelete = () => {
 		this.props.deleteRow(this.props.index, this.props.association, this.props.asc_id)
	}	

	render() {
		console.log(this.props.total_count)
		return (
			<div className="TermRow" 
				 onMouseOver={() => this.setState({is_mouse_over: true})}
				 onMouseLeave={() => this.setState({is_mouse_over: false})}>
				<a className="TermRow-counter">
					{this.state.index + 1}
				</a>
				<TermContent className="TermRow-content"
							 item={this.props.item}
							 association={this.props.association}
						     index={this.props.index}
						     total_count={this.props.total_count}
						     active_row={this.state.active_row}
						     active_side={this.state.active_side}
						     activateRow={() => this.setState({ active_row: true })}
						     deactivateRow={() => this.setState({ active_row: false })}
						     focusSide={(value) => this.setState({ active_side: value })}
						     saveTerm={this.saveTerm}
						     saveDefinition={this.saveDefinition}
						     addRow={this.props.addRow}	
						     resizing={this.props.resizing}	
						     rendered={this.props.rendered}
						     finishedRendering={this.props.finishedRendering}
				/>
				<div className="TermRow-operations">	
					{	
						this.state.is_mouse_over 
						&& this.props.total_count > 2 
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


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
		is_mouse_over: PropTypes.bool
	}

	state = {
		is_mouse_over: false, 
		active_row: false,
		active_side: 0, /* 0 = 'term' & 1 = 'definition' */
		terms: null,	
		definitions: null,
		item: null,
		association: null,
		association_id: null,
		index: null
	}

	componentDidMount() {
		const { index } = this.props;
		this.setState({
			index: index
		});
	}

	loadData(asc_id, associations, items) {
		if(asc_id !== null  && associations !== undefined) {
			let association = associations[asc_id]
			this.setState({ 
				item: items[association.item_id],
				association: association,
				association_id: asc_id
			});
		}
	}

	componentDidMount() {
		const { index, asc_id, items, associations } = this.props;
		this.setState({index: index})
		this.loadData(asc_id, associations, items)
	}

	componentWillReceiveProps() {
		if(document.activeElement == document.body) this.setState({ active_row: false })
		if(this.state.association !== null) return;
		const { index, asc_id, items, associations } = this.props;
		this.loadData(asc_id, associations, items)
	}

	saveTerm = (term) => { 
	    const { association, item, createItem, updateItem, setFlag, flag, user } = this.props;
	    let index = this.state.index;
	    setFlag(true)
	    this.setState({ term: term })
	    if(item == null && term !== null) {
	        if (term.length > 0) {
	            createItem(index, { name: 'target', prop: term })
	            return;
	        }
	    }
	    if(item !== null && item.target !== undefined) {
	        if(item.target == null || 
	        (item.target !== null 
	        && item.target.toLowerCase().trim() !== term.toLowerCase().trim()
	        && item.finalized == null)) {
	            updateItem(item, { name: 'target', prop: term })
	            return;
	    }
	    if(item.target !== null 
	        && item.target.toLowerCase().trim() !== term.toLowerCase().trim()
	        && item.finalized) { 
	            createItem(index, {name: 'child', prop: item}, { name: 'target', prop: term })
	        }
	    }
	}

	saveDefinition = (def) => { 
	    const { association, item, items, createItem, updateItem, setFlag, user } = this.props;
	    let index = this.state.index;
	    setFlag(false)
	    this.setState({ def: def })
	    if(item == null && def !== null) {
	        if (def.length > 0 && def !== null) {
	            createItem(index, { name: 'cue', prop: def })
	            return;
	        }
	    }
	    if(item !== null && item.cue !== undefined) {
	        if(item.cue == null || 
	        (item.cue !== null 
	        && item.cue.toLowerCase().trim() !== def.toLowerCase().trim()
	        && item.finalized == null )) {
	            updateItem(item, { name: 'cue', prop: def })
	            return;
	        }
	        if(item.cue !== null 
	        && item.cue.toLowerCase().trim() !== def.toLowerCase().trim()
	        && item.finalized) { 
	            createItem(index, {name: 'child', prop: item}, { name: 'cue', prop: def })
	        }
	    }
	}

	handleDelete = () => {
 		deleteRow(this.state.index, this.state.association)
	}	

	render() {
		return (
			<div className="TermRow" 
				 onMouseOver={() => this.setState({is_mouse_over: true})}
				 onMouseLeave={() => this.setState({is_mouse_over: false})}>
				<a className="TermRow-counter">
					{this.state.index + 1}
				</a>
				<TermContent className="TermRow-content"
							 item={this.state.item}
						     index={this.state.index}
						     total_count={this.props.total_count}
						     active_row={this.state.active_row}
						     active_side={this.state.active_side}
						     activateRow={() => this.setState({ active_row: true })}
						     deactivateRow={() => this.setState({ active_row: false })}
						     focusSide={(value) => this.setState({ active_side: value })}
						     enterTerm={(term) => this.setState({ term: term}) }
						     saveTerm={this.saveTerm}
						     enterDefinition={(def) => this.setState({definition: def})}
						     saveDefinition={this.saveDefinition}
						     addRow={this.props.addRow}			
				/>
				<div className="TermRow-operations">	
					{	
						this.state.is_mouse_over 
						&& this.props.totalCount > 2 &&
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


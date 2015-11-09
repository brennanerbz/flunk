
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import Autocomplete from '../Autocomplete/Autocomplete';
import { getStates,
		 matchStateToTerm,
		 sortStates,
		 styles,
		 fakeRequest } from '../Autocomplete/Utils';

export default class DefSide extends Component {
	static propTypes = {	
		onBlur: PropTypes.func,
		onChange: PropTypes.func,
		onFocus: PropTypes.func,
		flipActiveSide: PropTypes.func,		
		placeholder: PropTypes.string,
		activeSide: PropTypes.string,
	}

	constructor(props) {
	  super(props);
	  this.state = {
	    defs: [],
	    loading: false
	  }
	}

	handleClick = () => {

	}

	switchToDef = () => {
		const { activeSide, flipActiveSide } = this.props;
		if (activeSide === 'word') {
			flipActiveSide()
		}
	}

	autoFocus = () => {
		const { index } = this.props;
		this.refs['autocomplete' + index].focusSide()
	}

	render() {
		const { index, 
				def_choices, 
				getDefSuggestions, 
				updateAssociation,
				item, 
				association,
				subjects } = this.props;
		return(
			<div className="DefSide">
				<div className="DefSide-textarea">
					<Autocomplete
				      {...this.props}
				      // debug={true}
				      switchToDef={this.switchToDef}
					  className="AutoExpandTextArea-textarea"
			          ref={`autocomplete${index}`}
	                  items={def_choices !== undefined ? def_choices : []}
	                  getItemValue={(_item) => _item.cue}
	                  onSelect={(value, _item) => {
	                     this.setState({ defs: [ _item.cue ]})
	                     updateAssociation(association, 
	                     				  {name: 'item', prop: _item}, 
	                     				  {name: 'item_id', prop: _item.id },
	                     				  {name: 'adopted'})
	                  }}
	                  onInput={(event, value) => value}
	                  onFocus={(event, value) => {
	                     if(subjects !== undefined && subjects.length > 0 && item !== null) {
	         				this.setState({loading: true})
	         				getDefSuggestions(item.id)
	         			}
	                   }}
	                  renderItem={(_item, isHighlighted) => (
	                     <div
	                       style={isHighlighted ? styles.highlightedItem : styles._item}
	                       key={_item.abbr}
	                       id={_item.abbr}>
	                       {_item.cue}
	                     </div>
	                   )}					          
			        />
				</div>
			</div>
		);
	}
}
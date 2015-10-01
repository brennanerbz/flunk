
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
		term: PropTypes.object,
		placeholder: PropTypes.string,
		activeSide: PropTypes.string,
	}

	constructor(props) {
	  super(props);
	  this.state = {
	    unitedStates: getStates(),
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
		const { term } = this.props;
		this.refs['autocomplete' + term.id].focus()
	}

	render() {
		const { term } = this.props;
		return(
			<div className="DefSide">
				<div className="DefSide-textarea">
					<Autocomplete
				      {...this.props}
				      // debug={true}
				      switchToDef={this.switchToDef}
					  className="AutoExpandTextArea-textarea"
			          ref={`autocomplete${term.id}`}
			          items={this.state.unitedStates}
			          getItemValue={(item) => item.name}
			          onSelect={(value, item) => {
			            
			            this.setState({ unitedStates: [ item ] })							           
			          }}
			          onInput={(event, value) => {
			            this.setState({loading: true})
			            fakeRequest(value, (items) => {
			              this.setState({ unitedStates: items, loading: false })
			            })
			          }}
			          renderItem={(item, isHighlighted) => (
			            <div
			              style={isHighlighted ? styles.highlightedItem : styles.item}
			              key={item.abbr}
			              id={item.abbr}
			            >{item.name}</div>
			          )}					          
			        />
				</div>
			</div>
		);
	}
}
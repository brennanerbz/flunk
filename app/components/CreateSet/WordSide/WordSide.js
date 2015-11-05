import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import AutoexpandTextarea from '../AutoexpandTextarea/AutoexpandTextarea';
import Autocomplete from '../Autocomplete/Autocomplete';

import { getStates,
		 matchStateToTerm,
		 sortStates,
		 styles,
		 fakeRequest } from '../Autocomplete/Utils';

export default class WordSide extends Component {
	static propTypes = {	
		onBlur: PropTypes.func,
		onChange: PropTypes.func,
		onFocus: PropTypes.func,
		flipActiveSide: PropTypes.func,		
		placeholder: PropTypes.string,
		activeSide: PropTypes.string,
	}

	constructor(props) {
		super(props)
		this.state = {
			terms: [],
			loading: false
		}
	}

	switchToWord = () => {
		const { activeSide, flipActiveSide } = this.props;
		if (activeSide === 'def') {
			flipActiveSide()
		}
	}
	autoFocus = () => {
		const { row } = this.props;
		this.refs['autocomplete' + row].focusSide()
	}
	
	render() {
		const { row, term_choices, subjects, getTermSuggestions } = this.props;

		return(
		<div className="WordSide">
			<div className="WordSide-textarea">				
				<div className="AutoExpandTextArea">
					<div className="AutoExpandTextArea-wrapper">
							<Autocomplete
						      {...this.props}
						      switchToWord={this.switchToWord}
							  className="AutoExpandTextArea-textarea"
					          ref={`autocomplete${row}`}
					          items={term_choices !== undefined ? term_choices : []}
					          getItemValue={(item) => item}
					          onSelect={(value, item) => {
					            this.setState({ terms: [ item ] })							           
					          }}
					          onInput={(event, value) => {
					            if(subjects !== undefined && subjects.length > 0) {
									this.setState({loading: true})
									getTermSuggestions(value, (items) => {
									  this.setState({ terms: items, loading: false })
									})
								}
					          }}
					          renderItem={(item, isHighlighted) => (
					            <div
					              style={isHighlighted ? styles.highlightedItem : styles.item}
					              key={item.abbr}
					              id={item.abbr}
					            >{item}</div>
					          )}
					          
					        />
						</div>
						<div>
						</div>
					</div>
				</div>
			</div>
			
		);
	}
}
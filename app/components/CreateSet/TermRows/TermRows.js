import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import _ from 'lodash';

import * as actionCreators from '../../../actions/createset';

import TermRow from '../TermRow/TermRow';

@connect(
	state => ({
		activeContext: state.createset.activeContext,
		activeRow: state.createset.activeRow,
		resizing: state.createset.resizing,
		/* New state */
		row_length: state.createset.row_length
	}),
	dispatch => ({
		...bindActionCreators({
		  ...actionCreators
		}, dispatch)
	})
)
export default class TermRows extends Component {
	static propTypes = {
		dispatch: PropTypes.func,
		addRow: PropTypes.func,
		resize: PropTypes.func,
		adjustScroll: PropTypes.func,
		activateRow: PropTypes.func,
		activeRow: PropTypes.number,
		mousePos: PropTypes.number,
		activeContext: PropTypes.bool
	}

	constructor(props) {
		super(props)
		this.state = {
			activeSide: this.props.activeContext ? 'word' : 'def'
		}
	}

	componentDidMount = () => {
	  window.addEventListener('resize', this.handleResize); 
	}

	componentWillUnmount = () => {
	  window.removeEventListener('resize', this.handleResize)
	}

	componentWillReceiveProps = (nextProps) => {
	  const { activeContext, setFlag, flag, activeRow } = this.props;
	  this.setState({
	    activeSide: nextProps.activeContext ? 'word' : 'def'
	  });
	  if(document.activeElement == document.body) {
	  	if(flag)setFlag(false)
	  }
	}

	componentDidUpdate = (prevProps, prevState) => {
		const { row_length } = this.props;
		if(prevProps.row_length !== row_length) this.scrollToBottom()
	}

	handleResize = () => {
	  this.props.resize()
	}

	scrollToBottom = () => {
	  const node = document.body;
	  node.scrollTop = node.scrollHeight;
	} 

	deactivateRow = () => {
	  let { activateRow, setFlag, flag } = this.props;
	  if(document.activeElement == document.body) {
	  	activateRow(-1)
	  	if(flag)setFlag(false)
	  }
	}

	render() {
	  const { rows, activeRow, addRow, row_length } = this.props;
	  return(
				<div className="TermRows"
					 ref="term_rows"
			         onBlur={this.deactivateRow}>
				      <div className="TermRow">
				        <div className="TermRow-content row-labels">
				          <div className="TermContent">
				            <div className="TermContent-wrap">
				              <div className="TermContent-side word-side">
				                <p>Terms</p>
				              </div>
				              <div className="TermContent-side def-side">
				                <p>Definitions</p>
				              </div>
				            </div>
				          </div>
				        </div>
				      </div>
			        {     
			            rows.map((id, i) => {
			              return (
			                <TermRow
			                  asc_id={id}
			                  ref={`row${i}`}                    
			                  activeRow={activeRow}
			                  activeSide={this.state.activeSide}
			                  totalCount={row_length}
			                  index={i}
			                  key={`row${i}`}
			                  termLuid={`row${i}`}
			                  {...this.props}
			                />
			            )})	          
			        }
			        <div className="TermRow add_row"
			        	 ref="add_row"
			        	 onClick={() => addRow()}
			        	 title="Add a row">
			        	<span className="add_icon">+</span>
			        </div>
			    </div>
		);
	}
}

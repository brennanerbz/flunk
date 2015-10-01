import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import _ from 'lodash';

import * as actionCreators from '../../../actions/createset';

import TermRow from '../TermRow/TermRow';

@connect(
	state => ({
		terms: state.createset.terms,
		activeContext: state.createset.activeContext,
		activeRow: state.createset.activeRow,
		mousePos: state.createset.mousePos,
		resizing: state.createset.resizing,
		scrolling: state.createset.scrolling
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
		terms: PropTypes.array,
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
	  window.addEventListener('scroll', this.handleScroll);
	}
	componentWillUnmount = () => {
	  window.removeEventListener('resize', this.handleResize)
	  window.removeEventListener('scroll', this.handleScroll);
	}

	componentWillReceiveProps = (nextProps) => {
	  const { activeContext } = this.props;
	  this.setState({
	    activeSide: nextProps.activeContext ? 'word' : 'def'
	  });
	}

	componentDidUpdate = (prevProps, prevState) => {
	  const { activeRow, terms: terms } = this.props;
	  if (prevProps.activeRow !== this.props.activeRow && activeRow === terms.length) {
	    this.scrollToBottom()
	  }
	}

	handleResize = () => {
	  this.props.resize()
	}

	scrollToBottom = () => {
	  const node = document.body;
	  node.scrollTop = node.scrollHeight;
	} 

	handleScroll = () => {
	  this.props.adjustScroll()
	}

	deactivateRow = () => {
	  const { activateRow } = this.props;
	  activateRow(0)
	}

	render() {
	  //---Props
	  const { terms: terms, activeRow, addRow } = this.props;
	  //--- Calculation props    

	  const length = terms.length;
		return(
			<div className="TermRows"
	         onBlur={this.deactivateRow}
	    >
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
	            terms.map((term, i) => {
	              return (
	                <TermRow
	                  isMouseOver={term.id === this.props.mousePos}
	                  ref={`term${term.id}`}                    
	                  activeRow={activeRow}
	                  activeSide={this.state.activeSide}
	                  lastIndex={Number(length)}
	                  totalCount={length}
	                  index={i + 1}
	                  term={term}
	                  key={`term${term.id}`}
	                  termLuid={`term${term.id}`}
	                  {...this.props}
	                />
	              )
	            })
	          
	        }
	        <i className={classnames("material-icons md-36", "icon-cursor")}
	           ref="addButton"
	           onClick={() => addRow()}>
	          add_circle_outline
	        </i>
	      </div>
		);
	}
}
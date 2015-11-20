import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import TermRow from '../TermRow/TermRow';

export default class TermRows extends Component {
	static propTypes = {
		dispatch: PropTypes.func,
		addRow: PropTypes.func,
		resize: PropTypes.func,
		adjustScroll: PropTypes.func,
	}

	componentDidMount = () => {
	  window.addEventListener('resize', this.handleResize); 
	}

	componentWillUnmount = () => {
	  window.removeEventListener('resize', this.handleResize)
	}

	componentDidUpdate = (prevProps, prevState) => {
		const { row_length } = this.props;
		if(prevProps.row_length < row_length) this.scrollToBottom()
	}

	handleResize = () => {
	  this.props.resize()
	}

	scrollToBottom = () => {
	  const node = document.body;
	  node.scrollTop = node.scrollHeight;
	} 

	render() {
	  const { rows } = this.props;
	  console.log(rows)
	  return(
				<div className="TermRows"
					 ref="term_rows">
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
							let association, item;
							if(id !== null && this.props.associations !== undefined) {
								association = this.props.associations[id] 
								item = association !== undefined  
								? this.props.items[association.item_id] 
								: null
							} else if (id == null) {
								association = null
								item = null
							}
							return (
								<TermRow
									asc_id={id}
									ref={`row${i}`}                    
									total_count={this.props.row_length}
									index={i}
									key={`row${i}`}
									id={this.props.id}
									association={association}
									item={item}
									rows={this.props.rows}
									createItem={this.props.createItem}
									updateItem={this.props.updateItem}
									deleteRow={this.props.deleteRow}
									addRow={this.props.addRow}
									resizing={this.props.resizing}
									editing={this.props.editing}
									able_to_spark={this.props.able_to_spark}
									rendered={this.props.rendered}
									finishedRendering={this.props.finishedRendering}
								/>
							)})	          
						}
			        <div className="TermRow add_row"
			        	 ref="add_row"
			        	 onClick={() => this.props.addRow()}
			        	 title="Add a row">
			        	<span className="add_icon">+</span>
			        </div>
			    </div>
		);
	}
}

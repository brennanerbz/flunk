import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import WordSide from '../WordSide/WordSide';
import DefSide from '../DefSide/DefSide';

export default class TermContent extends Component {
	static propTypes = {
		editRow: PropTypes.func,
		actions: PropTypes.object,
		activeSide: PropTypes.string,
		lastIndex: PropTypes.number
	}

  constructor(props) {
    super(props);
    this.state = {
      word: '',
      def: ''
    }
  }
  
  computeStyle = () => {
    const {row, activeSide } = this.props;
    let node;
    if (activeSide === 'word') {
      node = this.refs['termContentWord' + row];
    } else {
      node = this.refs['termContentDef' + row];
    }
    const rect = node.getBoundingClientRect();
    return rect;
  }

  handleSaveWord = (word) => {
    // TODO: get term && association props
    const { row, 
            createItem,
            updateItem,
            index } = this.props;
    if(this.state.word.length === 0 && word.length > 0) {
      this.setState({
        word: word
      })
      createItem(index, {name: 'target', prop: word})
      return;
    }
    if(this.state.word !== (undefined && word)) {
      console.log("update item")
    }
  }
  
  handleLogDef = (def) => {
    const { row, editRow } = this.props;
    this.setState({
      def: def
    })
    editRow(row, this.state.word, def)
  }

  focusThatWord = () => {
    const { row } = this.props;
    this.refs['word' + row].autoFocus()
  }
  focusThatDef = () => {
    const { row } = this.props;
    this.refs['def' + row].autoFocus()
  }

  render() {
    const { activeRow, row, lastIndex } = this.props;
  	return(
		<div className={classnames(
                   {"TermContent-focus": activeRow === row ,
                   "TermContent": activeRow !== row} )}>
	        <div className="TermContent-wrap">          
	          <div className={classnames(
                           "TermContent-side",
                           {"word-side-focus": activeRow === row,
                            "word-side": activeRow !== row})}
                 ref={`termContentWord${row}`}
                 onClick={this.focusThatWord}>
	            <WordSide
                saveWord={(word) => this.handleSaveWord(word)}
                rect={() => this.computeStyle()}
                wordSide={true}
                ref={`word${row}`}          
                // tabIndex={3}
                {...this.props}
	            />
	          </div>
	          <div className="TermContent-side def-side"
                 ref={`termContentDef${row}`}
                 onClick={this.focusThatDef}>
	          	<DefSide
                logDef={(def) => this.handleLogDef(def)}
                rect={() => this.computeStyle()}
                defSide={true}
                ref={`def${row}`}          
                // tabIndex={3}
                {...this.props}
	          	/>
	          </div>
	        </div>
      	</div>
  	);
  }
}
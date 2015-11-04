import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import WordSide from '../WordSide/WordSide';
import DefSide from '../DefSide/DefSide';

export default class TermContent extends Component {
	static propTypes = {
		editRow: PropTypes.func,
		term: PropTypes.object,
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
    const {term, activeSide } = this.props;
    let node;
    if (activeSide === 'word') {
      node = this.refs['termContentWord' + term.id];
    } else {
      node = this.refs['termContentDef' + term.id];
    }
    const rect = node.getBoundingClientRect();
    return rect;
  }

  handleLogWord = (word) => {
    const { term, 
            editRow, 
            createItem,
            index } = this.props;
    this.setState({
      word: word
    })
    console.log("---")
    console.log("create item")
    createItem(index, {name: 'target', prop: word})
    editRow(term.id, word, this.state.def)
  }
  
  handleLogDef = (def) => {
    const { term, editRow } = this.props;
    this.setState({
      def: def
    })
    editRow(term.id, this.state.word, def)
  }

  focusThatWord = () => {
    const { term } = this.props;
    this.refs['word' + term.id].autoFocus()
  }
  focusThatDef = () => {
    const { term } = this.props;
    this.refs['def' + term.id].autoFocus()
  }

  render() {
    const { activeRow, term, lastIndex } = this.props;
  	return(
		<div className={classnames(
                   {"TermContent-focus": activeRow === term.id ,
                   "TermContent": activeRow !== term.id} )}>
	        <div className="TermContent-wrap">          
	          <div className={classnames(
                           "TermContent-side",
                           {"word-side-focus": activeRow === term.id,
                            "word-side": activeRow !== term.id})}
                 ref={`termContentWord${term.id}`}
                 onClick={this.focusThatWord}>
	            <WordSide
                logWord={(word) => this.handleLogWord(word)}
                rect={() => this.computeStyle()}
                wordSide={true}
                ref={`word${term.id}`}          
                tabIndex={3}
                {...this.props}
	            />
	          </div>
	          <div className="TermContent-side def-side"
                 ref={`termContentDef${term.id}`}
                 onClick={this.focusThatDef}>
	          	<DefSide
                logDef={(def) => this.handleLogDef(def)}
                rect={() => this.computeStyle()}
                defSide={true}
                ref={`def${term.id}`}          
                tabIndex={3}
                {...this.props}
	          	/>
	          </div>
	        </div>
      	</div>
  	);
  }
}
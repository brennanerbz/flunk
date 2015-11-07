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
    const {row, activeSide, subjects } = this.props;
    let node;
    if(subjects == (undefined || null)) {
      return;
    }
    if (activeSide === 'word') {
      node = this.refs['termContentWord' + row];
    } else {
      node = this.refs['termContentDef' + row];
    }
    const rect = node.getBoundingClientRect();
    return rect;
  }

  handleSaveWord = (word) => { // word blur()
    const { row,
            association, 
            item, 
            createItem,
            updateItem,
            index,
            setFlag,
            flag,
            activeRow } = this.props;
    setFlag(true)

    if((item !== undefined || null) && item.target !== null) {
      if(def.toLowerCase().trim() == item.target.toLowerCase().trim()) return;
    }

    if(this.state.word.length === 0 && word.length > 0 
      && item == undefined) {
      this.setState({
        word: word
      })
      createItem(index, {name: 'target', prop: word})
      return;
    }
    if((item && association) !== (undefined && null)
      && word.toLowerCase().trim() !== this.state.word.toLowerCase().trim()) {
      this.setState({
        word: word
      });
      createItem(index, {name: 'child', prop: item}, {name: 'target', prop: word})
    }
  }
  
  handleSaveDef = (def) => { // def blur()
    const { 
      row,
      association,
      item,
      items,
      createItem,
      updateItem,
      index,
      setFlag,
      user
    } = this.props;
    setFlag(false)

    if((item !== undefined || null) && item.cue !== null) {
      if(def.toLowerCase().trim() == item.cue.toLowerCase().trim()) return;
    }
    
    if(this.state.def.length === 0 && def.length > 0
     && (item && association) == undefined) {
      this.setState({
        def: def
      }); 
      createItem(index, {name: 'cue', prop: def})
      return;
    } 

    if((item && association) !== (undefined && null) 
      && def.toLowerCase().trim() !== this.state.def.toLowerCase().trim()) {
      this.setState({
        def: def
      });
      createItem(index, {name: 'child', prop: item}, {name: 'cue', prop: def})
      return;
    }

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
    const { activeRow, 
            row, 
            lastIndex, 
            item,
            subjects } = this.props;
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
                shouldsuggest={subjects !== undefined 
                              && subjects !== null
                              && subjects.length > 0 
                              ? true : false}
                saveWord={(word) => this.handleSaveWord(word)}
                rect={() => this.computeStyle()}
                wordSide={true}
                ref={`word${row}`}          
                tabIndex={2}
                {...this.props}
	            />
	          </div>
	          <div className="TermContent-side def-side"
                 ref={`termContentDef${row}`}
                 onClick={this.focusThatDef}>
	          	<DefSide
                shouldsuggest={item !== undefined 
                              && subjects !== undefined
                              && subjects !== null
                              && subjects.length > 0 
                              ? true : false}
                saveDef={(def) => this.handleSaveDef(def)}
                rect={() => this.computeStyle()}
                defSide={true}
                ref={`def${row}`}          
                tabIndex={2}
                {...this.props}
	          	/>
	          </div>
	        </div>
      	</div>
  	);
  }
}
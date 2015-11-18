import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import WordSide from '../WordSide/WordSide';
import DefSide from '../DefSide/DefSide';

export default class TermContent extends Component {
	static propTypes = {
		editRow: PropTypes.func,
		actions: PropTypes.object,
		activeSide: PropTypes.string,
		totalCount: PropTypes.number
	}

  constructor(props) {
    super(props);
    this.state = {
      word: null,
      def: null
    }
  }
  
  // computeStyle = () => {
  //   const { asc_id, 
  //           index, 
  //           activeSide, 
  //           subjects } = this.props;

  //   let node, rect;

  //   if(subjects == (undefined || null)) {
  //     return;
  //   }
  //   if (activeSide === 'word') {
  //     node = this.refs['termContentWord' + index];
  //   } else {
  //     node = this.refs['termContentDef' + index];
  //   }
  //   rect = node.getBoundingClientRect();
  //   return rect;
  // }

  handleSaveWord = (word) => { // word blur()
    const { asc_id,
            index,
            association, 
            item, 
            createItem,
            updateItem,
            setFlag,
            flag,
            user,
            activeRow } = this.props;

    setFlag(true)

    this.setState({ word: word })

    if(item == null) {
      if (word.length > 0) {
        createItem(index, { name: 'target', prop: word })
        return;
      }
    }
    if(item !== null) {
      if(item.target == null || 
        (item.target !== null 
        && item.target.toLowerCase().trim() !== word.toLowerCase().trim()
        && item.finalized == null)) {
        updateItem(item, { name: 'target', prop: word })
        return;
      }
      if(item.target !== null 
        && item.target.toLowerCase().trim() !== word.toLowerCase().trim()
        && item.finalized) { 
        createItem(index, {name: 'child', prop: item}, { name: 'target', prop: word })
      }
    }
  }
  
  handleSaveDef = (def) => { // def blur()
    const { asc_id,
            index,
            association,
            item,
            items,
            createItem,
            updateItem,
            setFlag,
            user } = this.props;

    setFlag(false)

    this.setState({ def: def })

    if(item == null) {
      if (def.length > 0) {
        createItem(index, { name: 'cue', prop: def })
        return;
      }
    }
    if(item !== null) {
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

  focusThatWord = () => {
    const { index } = this.props;
    this.refs['word' + index].autoFocus()
  }
  focusThatDef = () => {
    const { index } = this.props;
    this.refs['def' + index].autoFocus()
  }

  render() {
    const { activeRow, 
            asc_id,
            index, 
            item,
            subjects } = this.props;
  	return (
        		<div className={classnames(
                           {"TermContent-focus": activeRow === index ,
                           "TermContent": activeRow !== index} )}>
        	        <div className="TermContent-wrap">          
        	          <div className={classnames(
                                   "TermContent-side",
                                   {"word-side-focus": activeRow === index,
                                    "word-side": activeRow !== index})}
                         ref={`termContentWord${index}`}
                         onClick={this.focusThatWord}>
        	            <WordSide
                        // shouldsuggest={subjects !== undefined 
                        //               && subjects !== null
                        //               && subjects.length > 0 
                        //               ? true : false}
                        saveWord={(word) => this.handleSaveWord(word)}
                        // rect={() => this.computeStyle()}
                        wordSide={true}
                        ref={`word${index}`}          
                        tabIndex={2}
                        {...this.props}
                      />
        	          </div>
        	          <div className="TermContent-side def-side"
                         ref={`termContentDef${index}`}
                         onClick={this.focusThatDef}>
        	          	<DefSide
                        // shouldsuggest={item !== undefined 
                        //               && subjects !== undefined
                        //               && subjects !== null
                        //               && subjects.length > 0 
                        //               ? true : false}
                        saveDef={(def) => this.handleSaveDef(def)}
                        // rect={() => this.computeStyle()}
                        defSide={true}
                        ref={`def${index}`}          
                        tabIndex={2}
                        {...this.props}
                      />
        	          </div>
        	        </div>
          	</div>
  	);
  }
}

             

              //               
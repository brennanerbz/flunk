import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Autocomplete from '../Autocomplete/Autocomplete';

export default class TermContent extends Component {
	static propTypes = {
		
	}

    computeStyle = () => {
        let { index, activeSide, subjects } = this.props,
              node, rect;
        if(subjects == (undefined || null)) return;

        if (activeSide === 'word') { node = this.refs['termContentWord' + index] } 
        else { node = this.refs['termContentDef' + index] }

        rect = node.getBoundingClientRect();
        return rect;
    }

    handleSaveWord = (word) => { 
        const { index, association, item, createItem, updateItem, setFlag, flag, user } = this.props;

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
  
    handleSaveDef = (def) => { 
        const { index, association, item, items, createItem, updateItem, setFlag, user } = this.props;

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

    render() {
        const { activeRow, index, item, subjects } = this.props;
      	return (
            <div className={classnames({"TermContent-focus": activeRow === index, "TermContent": activeRow !== index} )}>
                <div className="TermContent-wrap">          
                    <div className="TermContent-side word-side" ref={`termContentWord${index}`}>
                        <div className="WordSide">
                            <div className="WordSide-textarea">  
                                <textarea className="AutoExpandTextArea-textarea"/>
                            </div>
                        </div>
                    </div>
                    <div className="TermContent-side def-side" ref={`termContentDef${index}`}>
                        <div className="DefSide">
                            <div className="DefSide-textarea">
                                <textarea className="AutoExpandTextArea-textarea"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  	    );
    }
}

/*           
<Autocomplete
    {...this.props}
    rect={() => this.computeStyle()}
    tabIndex={2}
    switchToWord={this.switchToWord}
    className="AutoExpandTextArea-textarea"
    ref={`autocomplete${index}`}
/>
*/

/*
<Autocomplete
    {...this.props}
    rect={() => this.computeStyle()}
    tabIndex={2}
    switchToDef={this.switchToDef}
    className="AutoExpandTextArea-textarea"
    ref={`autocomplete${index}`}
/>
*/

/*  --------- Definition ------------

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
renderItem={(term, isHighlighted, index) => (
    <div className={classnames({ 'first_item': index == 0 })}
         style={isHighlighted ? styles.highlightedItem : styles.item}
         key={term.abbr}
         id={term.abbr}>
         {term}
    </div>
)}
---------------------- ---------*/


/*  --------- Definition ------------
items={def_choices !== undefined ? def_choices : []}
getItemValue={(_item) => _item.cue}
onSelect={(value, _item) => {
    this.setState({ defs: [ _item.cue ]})
    updateAssociation(association, 
    {name: 'item', prop: _item}, 
    {name: 'item_id', prop: _item.id },
    {name: 'item_adopted', prop: true})
}}
onInput={(event, value) => value}
onFocus={(event, value) => {
    if(subjects !== undefined && subjects.length > 0 && item !== null) {
        this.setState({loading: true})
        getDefSuggestions(item.id)
        setTimeout(() => {
            getDefSuggestions(item.id)
        }, 250)
    }
}}
renderItem={(_item, isHighlighted, index) => (
    <div className={classnames({ 'first_item': index == 0 })}
         style={isHighlighted ? styles.highlightedItem : styles.item}
         key={_item.abbr}
         id={_item.abbr}>
         {_item.cue}
    </div>
)}
---------------------- ---------*/
             
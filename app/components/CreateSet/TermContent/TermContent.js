import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
// import Autocomplete from '../Autocomplete/Autocomplete';

export default class TermContent extends Component {
	static propTypes = {
		
	}

    state = {
        term: null,
        definition: null
    }

    loadItem(item) {
        if(item !== undefined && item !== null) {
            if(item.target !== null) this.setState({term: item.target})
            if(item.cue !== null) this.setState({definition: item.cue})
        }
    }

    componentDidMount() {
        const { item } = this.props;
        this.loadItem(item)
    }

    componentWillReceiveProps() {
        const { item } = this.props;
        this.loadItem(item)
    }

    // computeStyle = () => {
    //     let { index, active_side, subjects } = this.props,
    //           node, rect;
    //     if(subjects == (undefined || null)) return;

    //     if (active_side === 0) { node = this.refs['termContentWord' + index] } 
    //     else { node = this.refs['termContentDef' + index] }

    //     rect = node.getBoundingClientRect();
    //     return rect;
    // }

    render() {
        const { active_row, index } = this.props;
      	return (
            <div className={classnames({"TermContent-focus": active_row, "TermContent": !active_row} )}>
                <div className="TermContent-wrap">          
                    <div className="TermContent-side word-side" ref={`termContentWord${index}`}>
                        <div className="WordSide">
                            <div className="WordSide-textarea"> 
                                <div className="Autocomplete-textarea"> 
                                    <textarea
                                        className="AutoExpandTextArea-textarea"
                                        ref={`autocomplete${index}`}
                                        // rect={() => this.computeStyle()}
                                        tabIndex={2}
                                        rows="1"
                                        onFocus={() => { 
                                            this.props.activateRow()
                                            this.props.focusSide(0) 
                                        }}
                                        onKeyDown={(e) => {

                                        }}
                                        onKeyUp={() => {}}
                                        onChange={(e) =>{
                                            this.setState({term: e.target.value});
                                        }}
                                        onBlur={() => {
                                            this.props.saveTerm(this.state.term)
                                            this.props.deactivateRow()
                                        }}
                                        onClick={() => {}} 
                                        onSelect={() => {}}
                                        onInput={() => {}}
                                        value={ this.state.term }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="TermContent-side def-side" ref={`termContentDef${index}`}>
                        <div className="DefSide">
                            <div className="DefSide-textarea">
                                <div className="Autocomplete-textarea"> 
                                    <textarea
                                        className="AutoExpandTextArea-textarea"
                                        ref={`autocomplete${index}`}
                                        // rect={() => this.computeStyle()}
                                        tabIndex={2}
                                        rows="1"
                                        onFocus={() => {
                                            this.props.activateRow()
                                            this.props.focusSide(1) 
                                        }}
                                        onKeyDown={(e) => {
                                            if(this.props.index == this.props.total_count - 1 && e.which == 9) 
                                                this.props.addRow()
                                        }}
                                        onKeyUp={() => {}}
                                        onChange={(e) =>{
                                            this.setState({definition: e.target.value});
                                        }}
                                        onBlur={() => {
                                            this.props.saveDefinition(this.state.definition)
                                            this.props.deactivateRow()
                                        }}
                                        onClick={() => {}}
                                        onSelect={() => {}}
                                        onInput={() => {}}
                                        value={ this.state.definition }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  	    );
    }
}

/*           

*/

/*

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
             
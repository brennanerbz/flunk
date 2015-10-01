import React, { Component, PropTypes } from 'react';
import autosize from 'autosize';

const UPDATE = 'autosize:update',
      DESTROY = 'autosize:destroy',
      RESIZED = 'autosize:resized';

export default class TextareaAutosize extends Component {
	static propTypes = {
		onResize: PropTypes.func,
		addRow: PropTypes.func,
		activeRow: PropTypes.number,
		lastIndex: PropTypes.number,
		tabIndex: PropTypes.number,
		activeSide: PropTypes.string,
		wordSide: PropTypes.bool,
		defSide: PropTypes.bool
	}

	static defaultProps = {
		rows: 1
	}

	componentDidMount() {
	  const { tabIndex } = this.props;
	  const node = this.refs["textarea" + tabIndex];
	  autosize(node);
	  if (this.props.onResize) {
	    node.addEventListener(RESIZED, this.props.onResize);
	  }	  
	}
	

	componentWillReceiveProps(nextProps) {
	  if (this.getValue(nextProps) !== this.getValue(this.props)) {
	    this.dispatchEvent(UPDATE, true);
	  }
	}

	componentWillUnmount() {
	  const {tabIndex} = this.props;
	  const node = this.refs["textarea" + tabIndex];
	  if (this.props.onResize) {
	    node.removeEventListener(RESIZED);
	  }
	  this.dispatchEvent(DESTROY);
	}

	dispatchEvent(EVENT_TYPE, defer) {
	  const {tabIndex} = this.props;
	  const event = document.createEvent('Event');
	  const node = this.refs["textarea" + tabIndex];
	  event.initEvent(EVENT_TYPE, true, false);
	  const dispatch = () => node.dispatchEvent(event);
	  if (defer) {
	    setTimeout(dispatch);
	  } else {
	    dispatch();
	  }
	}

	getValue(props) {
	  if (props) {
	    return props.valueLink ? props.valueLink.value : props.value;
	  }
	}

	render() {
	  const { tabIndex, defSide } = this.props;    
	  return (
	    <div>
	      <textarea {...this.props}
	              onKeyDown={this.handleKeyDown} 
	              tabIndex={tabIndex}
	              ref={`textarea${tabIndex}`}>
	              {this.props.children}
	      </textarea>
	    </div>
	  );
	}
}






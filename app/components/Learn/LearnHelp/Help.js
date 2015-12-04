import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

/* Child components */
import Related from './Related';
import MultipleChoice from './MultipleChoice';
import Target from './Target';

export default class Help extends Component {
	static propTypes = {
	}

	renderHelp() {
		const { current_slot } = this.props;
		
		// recall | pic | related | augN | nonemc | mc | stem | peek | copy
		switch(current_slot.format) {
			case 'recall':
				return;
			case 'related':
				return;
			case 'nonemc':
			case 'mc':
			 	return (
			 		<MultipleChoice choices={current_slot.mc !== undefined ? current_slot.mc : null}/>
			 	) 
			case 'stem':
			case 'peek':
			case 'copy':
				return (
					<Target diff={current_slot.format} stem={current_slot.stem} target={current_slot.item.target}/>
				)
			case 'aug':
			default:
				break;
		}
	}

	render() {
		const { current_slot } = this.props;
		return(
			<li className="bot">
				<div className="message help">
					<div className="">
						<p className={classnames("diff_label", {'mc_label': current_slot.format == 'mc' || current_slot.format == 'nonemc'  })}>
						{ 
							current_slot.format == 'mc' || current_slot.format == 'nonemc'
							? "Multiple Choice:"
							: null
						}
						{
							current_slot.format == 'stem'
							? "Fill in the blank:"
							: null
						}
						{
							current_slot.format == 'copy' || current_slot.format == 'peek'
							? 'Correct answer:'
							: null
						}
						</p>
					</div>
					{
						current_slot.completion == null
						? ::this.renderHelp()
						: null
					}
				</div>
			</li>
		);
	}
}
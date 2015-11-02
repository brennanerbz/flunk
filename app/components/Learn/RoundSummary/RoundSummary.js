import React, { Component, PropTypes } from 'react';
require('./RoundSummary.scss');


export default class RoundSummary extends Component {
	static propTypes = {
	}

	shouldComponentUpdate(nextProps) {
		return this.props.cmi == nextProps.cmi || nextProps.isShowingCompletedMiniSeq
	}

	renderSlotItems(slot, format, i) {
		if(format !== slot.format) {
			return ( 
				<td key={i} className="slot_item">
					&nbsp;
				</td>
			)
		}
		return (
			<td key={i} className="slot_item">
				{slot.item.target}
			</td>
		)
	}

	render() {
		let { current_miniseq, cmi} = this.props,
			  slots = current_miniseq.slots;
		return(
			<div className="summary">
				<h3 className="table_header">Round {cmi + 1}</h3>
				<table className="summary_table">
					<tbody>
						<tr className="recall_row">
							<td className="recall row_label">
								Define 
							</td>
								{
									slots.map((slot, i)=> {
										return (::this.renderSlotItems(slot, "recall", i))
									})
								}
							<td className="count">
								{(slots.filter(slot => slot.format == 'recall').length / 5) / 100 * 10000} % 
							</td>
						</tr>
						<tr className="mc_row">
							<td className="mc row_label">
								Multiple Choice
							</td>
							{
								slots.map((slot, i)=> {
									return (::this.renderSlotItems(slot, "mc", i))
								})
							}
							<td className="count">
								{(slots.filter(slot => slot.format == 'mc').length / 5) / 100 * 10000}  %
							</td>
						</tr>
						<tr className="fb_row">
							<td className="fb row_label">
								 Fill in the Blank
							</td>
							{
								slots.map((slot, i)=> {
									return (::this.renderSlotItems(slot, "stem", i))
								})
							}
							<td className="count">
								{(slots.filter(slot => slot.format == 'stem').length / 5) / 100 * 10000 } % 
							</td>
						</tr>
						<tr className="copy_row">
							<td className="copy row_label">
								Copy Answer
							</td>
							{
								slots.map((slot, i)=> {
									return (::this.renderSlotItems(slot, "copy", i))
								})
							}
							<td className="count">
								{(slots.filter(slot => slot.format == 'copy').length / 5) / 100 * 10000 } %  
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}


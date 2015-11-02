import React, { Component, PropTypes } from 'react';
require('./RoundSummary.scss');


export default class RoundSummary extends Component {
	static propTypes = {
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
		let items = Array.apply(null, Array(5)),
			{ current_miniseq } = this.props,
			slots = current_miniseq.slots;
			console.log(slots)
		return(
			<table className="round_table">
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
							{0} / 5 
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
							{0} / 5 
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
							{0} / 5 
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
							{0} / 5 
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
}


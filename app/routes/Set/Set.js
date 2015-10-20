import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
require('./Set.scss')

/* Components */
import SetHeader from '../../components/SetView/SetHeader/SetHeader';
import SetInfo from '../../components/SetView/SetInfo/SetInfo';
import ItemList from '../../components/SetView/ItemList/ItemList';
import QuickPractice from '../../components/SetView/QuickPractice/QuickPractice';

var set = {
	title: 		 'Cognitive Science',
	description: 'A brief overview about the core concepts in cognitive science',
	subjects: 	['psychology', 'cognitive psychology', 'science'],
	author: 	 'Nathan Lomeli',
	creation: 	 '2015-10-14 23:49:37.892450',
	items: [
		{
			target: 'open',
			cue: 	'the process of associating a file in secondary memory with a variable in a program through which the file can be manipulated.'
		}, 
		{
			target: 'object oriented design',
			cue: 	'object-based design or programming that includes characteristics of polymorphism and inheritance.'
		}, 
		{
			target: 'amygdala',
			cue: 	'the region of the brain that processes fear'
		},
		{
			target: 'marginal utility',
			cue: 	'as prices rise, consumers will replace more costly items with less expensive'
		},
		{
			target: 'open',
			cue: 	'the process of associating a file in secondary memory with a variable in a program through which the file can be manipulated.'
		}, 
		{
			target: 'object oriented design',
			cue: 	'object-based design or programming that includes characteristics of polymorphism and inheritance.'
		}, 
		{
			target: 'amygdala',
			cue: 	'the region of the brain that processes fear'
		},
		{
			target: 'marginal utility',
			cue: 	'as prices rise, consumers will replace more costly items with less expensive'
		}
	],
	item_count: 8,
	member_count: 5
}

export default class Set extends Component {
	static propTypes = {
		params: PropTypes.object
	}

	render() {
		return(
			<div className="set_view main_content">
				<div className="row">
					<div className="col-sm-9 col-md-8 col-lg-8">
						<SetHeader set={set} />
						<QuickPractice set={set}  />
						<ItemList set={set} />	
					</div>
					<div className="col-md-4 col-lg-4">
						<SetInfo set={set}/>
					</div>
				</div>
			</div>
		);
	}
}



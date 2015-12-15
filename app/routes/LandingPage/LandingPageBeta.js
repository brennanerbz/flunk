import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
require('./LandingPage.scss')
import SignUpForm from './SignUpForm';
// import { validator } from 'validator';


export default class LandingPage extends Component {
	constructor(props, context) {
		super(props, context)
	}

	static propTypes = {
		
	}

	render() {
		const compose = require('../../assets/compose.png'),
			  upload = require('../../assets/upload.png'),
			  desk = require('../../assets/desk_drawing.png'),
			  file_formats = require('../../assets/file_formats.png'),
			  transfer = require('../../assets/transfer.png'),
			  sample_learn = require('../../assets/sample_learn.png'),
			  school_logos = require('../../assets/sample_schools.png'),
			  chat = require('../../assets/chat_icon.png'),
			  doc = require('../../assets/set_icon_lines.png'),
			  cards = require('../../assets/flashcards.png'),
			  quiz = require('../../assets/quiz_program.png'),
			  carrot_down = require('../../assets/carrot_down_white.png'),
			  hero_image = require('../../assets/hero_image.png'),
			  study_formats = require('../../assets/study_formats.png');
		return(		
			<div className="landing_page">
				<div style={{maxWidth: '405px'}} className="landing_page_container landing_beta">
					<div className="marketing_copy">
						<h1>Join the Ace beta</h1>
						<p className="product_description">An app that automatically turns your files and links into interactive <span className="">study material.</span> </p>
						<SignUpForm beta={true} shouldAutoFocus={true} />
					</div>
					<div style={{
						paddingLeft: '500px',
						paddingTop: '4.5em'
					}} className="sign_up hero">
						<img style={{
							height: '475px'
						}} src={hero_image} className="hero_image"/>
					</div>
				</div>
				<div className="sample_transform beta">
					<p className="leading_question">Check out all you can do in Ace.</p>
					<img src={carrot_down}/>
				</div>
				<div className="product_slides">
					<ul className="slide_list">
						<li className="slide" id="drag_drop">
							<section>
								<img src={file_formats}/>
								<h1 className="header">
									Drag, drop and transform
								</h1>
								<p className="product_description">
									Not just your notes, or your problem set, but <b>all your files</b>, videos, PDFs, and documents can be stored, and transformed into study material. <br/> <br/>  If you use services like YouTube or Wikipedia, just paste the link and the content will be <b>instantly available</b> too.
								</p>
							</section>
						</li>
						<li className="slide" id="share">
							<section>
								<h1 className="header">
									Eliminate wasted time
								</h1>
								<p className="product_description"> 
									Sometimes you don't have the time to type it all out. When you're on the go <b>you can instantly turn your documents into any interactive format you need</b>--from outlines, flashcards and tutorials to practice tests. 
								</p>
								<img style={{
									top: '58px',
								    right: '4.39rem',
								    height: '250px',
								    width: '250px'
								}}  src={transfer}/>
							</section>
						</li>
						<li className="slide" id="learn">
							<section>
								<img src={sample_learn}/>
								<h1 className="header">
									Never fail again
								</h1>
								<p className="product_description">
									 Bombed the last assignment? Your future is safe. Sign up for Ace and <b>get grilled on your material with more examples, hints and step-by-step feedback</b>. Your progress will be stored, so you can learn about your mistakes and avoid them next time.
								</p>
							</section>
						</li>
					</ul>
				</div>
				<div className="last_call">
					<SignUpForm beta={true} shouldAutoFocus={false} last_call={true} />
				</div>
				<div style={{
					margin: '0 auto',
					textAlign: 'center',
					color: 'rgba(255, 255, 255, .4)',
					fontSize: '13px',
					letterSpacing: '.2px',
					lineHeight: '19px',
					padding: '1.5em'
				}} className="footer">	
					<p>&copy; Ace 2015. The Apple logo is a trademark of it's respective owner.</p>
				</div>
			</div>
		);
	}
}

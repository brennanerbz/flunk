import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
require('./LandingPage.scss')
import SignUpForm from './SignUpForm';

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
			  sample_share = require('../../assets/sample_share.png'),
			  sample_learn = require('../../assets/sample_learn.png'),
			  school_logos = require('../../assets/sample_schools.png'),
			  chat = require('../../assets/chat_icon.png'),
			  doc = require('../../assets/set_icon_lines.png'),
			  cards = require('../../assets/flashcards.png'),
			  quiz = require('../../assets/quiz_program.png'),
			  carrot_down = require('../../assets/carrot_down_white.png');
		return(		
			<div className="landing_page">
				<div className="landing_page_container landing_beta">
					<div className="marketing_copy">
						<h1>Join the Ace beta</h1>
						<p className="product_description">We're working on a new productivity tool that automatically turns your files and links into interactive <span className="">study material.</span> </p>
					</div>
					<div className="sign_up">
						<SignUpForm beta={true} shouldAutoFocus={true} />
					</div>
				</div>
				<div className="sample_transform beta">
					<p className="leading_question">What you'll be able to do</p>
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
									Not just your class notes, but <b>all your files</b>, images, videos, PDFs, and documents can be stored, and transformed in Ace. <br/> <br/>  If you use services like YouTube or Wikipedia, just paste the link and the content will be <b>immediately in sync, and transformable too</b>.
								</p>
							</section>
						</li>
						<li className="slide" id="share">
							<section>
								<h1 className="header">
									Choose your format
								</h1>
								<p className="product_description"> 
									Everything in Ace— text, files, links, and all— is automatically parsed so that <b>you can turn it into any interactive format that you want</b>— test, outline, problem set, flashcards— whenever you want. Cut the time it takes to create your study material to nothing.
								</p>
								<img src={sample_share}/>
							</section>
						</li>
						<li className="slide" id="learn">
							<section>
								<img src={sample_learn}/>
								<h1 className="header">
									Never fail again
								</h1>
								<p className="product_description">
									 Bombed the last test or assignment? Your future is safe. Just sign up for Ace and <b>get grilled on the material you specify with more examples, hints and step-by-step feedback</b>. Your progress will be tracked, stored and waiting for you once you’re done.
								</p>
							</section>
						</li>
					</ul>
				</div>
				<div className="last_call">
					<SignUpForm beta={true} shouldAutoFocus={false} last_call={true} />
				</div>
				<div className="footer">	
					<ul className="footer_links">
						<div className="left">
							<a className="">Students</a>
							<a className="">Teachers</a>
						</div>
						<div className="right">
							<a className="">Terms</a>
							<a className="">Privacy</a>
						</div>
					</ul>
				</div>
			</div>
		);
	}
}

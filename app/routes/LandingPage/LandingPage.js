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
			  chat = require('../../assets/chat.png'),
			  desk = require('../../assets/desk_drawing.png'),
			  file_formats = require('../../assets/file_formats.png'),
			  sample_share = require('../../assets/sample_share.png'),
			  sample_learn = require('../../assets/sample_learn.png'),
			  school_logos = require('../../assets/sample_schools.png');
		return(		
			<div className="landing_page">
				<div className="landing_page_container">
					<div className="marketing_copy">
						<h1>A <span className="underline">learning tool</span> that does the <br /> hard work for you</h1>
						<p className="product_description">Ace can take the material in front of you, <br/> and turn it into practicable questions.</p>
					</div>
					<div className="sign_up">
						<SignUpForm />
					</div>
				</div>
				<div className="sample_transform">
					<p className="call_to_action">
					Transform a YouTube video or Wikipedia article
					</p>
					<input placeholder="Link goes here"/>
					<button className="button primary">Try it</button>
				</div>
				<div className="product_slides">
					<ul className="slide_list">
						<li className="slide" id="drag_drop">
							<section>
								<img src={file_formats}/>
								<h1 className="header">
									Drag, drop and transform.
								</h1>
								<p className="product_description">
									Not just a link or your class notes, but <b>all your files,</b> images, videos, PDFs, and documents can be dropped into Ace and <b>transformed into study sets. </b> 
								</p>
							</section>
						</li>
						<li className="slide" id="share">
							<section>
								<h1 className="header">
									Collaborate with a few clicks.
								</h1>
								<p className="product_description"> 
									Send material with just a click to whoever you choose—<b>one person, your team, or your entire class.</b> You also have the choice to keep your material private. It's all up to you.
								</p>
								<img src={sample_share}/>
							</section>
						</li>
						<li className="slide" id="learn">
							<section>
								<img src={sample_learn}/>
								<h1 className="header">
									Learn your stuff, with help from us.
								</h1>
								<p className="product_description">
									 You map in or upload your material, and Ace adapts with <b>more examples, facts and step-by-step feedback</b> right where you need it.
								</p>
							</section>
						</li>
					</ul>
				</div>
				<section className="happy_users">
					<div className="section_content">
						<h3>Thousands of happy students, including:</h3>
						<img src={school_logos} />
					</div>
				</section>
				<div className="last_call">
					<SignUpForm last_call={true} />
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

// <button className="google_button button">
// 	<img className="icon" 
// 		 src={g_icon}/>
// 	Sign up with Google
// </button>
// <button className="facebook_button button">
// 	<img className="icon"
// 		 src={f_icon}/>
// 	Sign up with Facebook
// </button>
import React, { Component, PropTypes } from 'react';
import AutoexpandTextarea from '../../components/CreateSet/AutoexpandTextarea/AutoexpandTextarea';
require('./Upload.scss');

export default class Upload extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div className="upload_page">
				<div className="upload_container">
					<div id="upload_progress">
					</div>
					<div className="prompt_box">
						<h1>Create a new study set</h1>
						<div className="file_container">
							<img className="big icon" src=""/>
							<h2>Select a file to upload</h2>
						</div>
						<div className="day_divider">
							<hr className="separator"/>
							<i className="copy_only"/>
							<div className="day_divider_label">
								or
							</div>
						</div>
						<div className="link_container">
							<h2>Paste a link or text</h2>
							<AutoexpandTextarea className="link_input" placeholder="Link or text..." />
							<button className="button green">Create</button>
						</div>
					</div>
					<div className="instructions">
						<ul className="">
							<li className="instruction">
								<h2>Upload or Paste</h2>
								<div className="step">
									<img src=""/>
									<p>Import your....</p>
								</div>
							</li>
							<li className="instruction">
								<h2>Transform</h2>
								<div className="step">
									<img src=""/>
									<p>Your....</p>
								</div>
							</li>
							<li className="instruction">
								<h2>Final product</h2>
								<div className="step">
									<img src=""/>
									<p>Comes out cooking...</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
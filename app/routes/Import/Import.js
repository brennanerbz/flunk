import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import DocumentTitle from 'react-document-title';
import AutoexpandTextarea from '../../components/CreateSet/AutoexpandTextarea/AutoexpandTextarea';
require('./Import.scss');

export default class Upload extends Component {
	static propTypes = {
	}

	state = {
		drop_box_hover: false,
		link_focused: false
	}

	render() {
		const big_upload = require('../../assets/big_upload.png'),
			  big_upload_red = require('../../assets/big_upload_red.png'),
			  transform = require('../../assets/transform.png'),
			  set = require('../../assets/set_icon_grey.png');
		return(
			<DocumentTitle title='Upload - Ace'>
				<div className="upload_page">
					<div className="upload_container">
						<div id="upload_progress">
						</div>
						<div className="prompt_box">
							<h1>Create a new study set</h1>
							<div className="drop_box"
								 onMouseOver={() => this.setState({drop_box_hover: true})}
								 onMouseLeave={() => this.setState({drop_box_hover: false})}>
								<img className={classnames({"over": this.state.drop_box_hover})} 
									 src={big_upload}/>
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
								<div className={classnames("auto_expand_container", 
									{'focus': this.state.link_focused})}>
									<AutoexpandTextarea focus={() => this.setState({link_focused: true})} 
														blur={() => this.setState({link_focused: false})}
														placeholder="Link or text..."
														autoFocus={true} />
								</div>
								<button className="button green">Create</button>
							</div>
						</div>
						<div className="instructions">
							<h2>How it works</h2>
							<ul className="">
								<li className="instruction">
									<h2>Upload or Paste</h2>
									<div className="step">
										<img id="upload" src={big_upload}/>
										<p>Import your class notes, powerpoint slides, PDF, a web page or a section of text.</p>
									</div>
								</li>
								<li className="instruction">
									<h2>Transform</h2>
									<div className="step">
										<img id="transform" src={transform}/>
										<p>Your document is broken down into smaller meaningful pieces.</p>
									</div>
								</li>
								<li className="instruction">
									<h2>Final product</h2>
									<div className="step">
										<img id="set" src={set}/>
										<p>A study set is automatically created for you and whoever you want to share it with.</p>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</DocumentTitle>
		);
	}
}
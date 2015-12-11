import React, { Component, PropTypes } from 'react';

export default class ViewerAvatar extends Component {
	static propTypes = {
	}

	state = {
		photoUrl: null
	}

	componentDidMount() {
		if(this.props.photoUrl !== undefined) {
			this.setState({photoUrl: this.props.photoUrl})
		}
	}

	render() {
		return(
			<div>
				<Faceholder 
					dimension={this.props.dimension}
					photoUrl={this.state.photoUrl}
					defaultAvatar={this.props.defaultAvatar}
				/>
			</div>
		);
	}
}

class Faceholder extends Component {
	static propTypes = {

	}
	render() {
		<div style={{
				width: this.props.dimension + "px",
				height: this.props.dimension + 'px'
			}} 
			className="circle avatar_component">
			<Image 
				src={this.props.photoUrl !== null ? this.props.photoUrl : this.props.defaultAvatar} 
				alt="" 
			/>
		</div>
	}
}

class Image extends Component {
	static propTypes = {

	}
	render() {
		<div>
			<img className="" src={this.props.src}/>
		</div>
	}
}
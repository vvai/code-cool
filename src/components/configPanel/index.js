import { h, Component } from 'preact';

export default class ConfigPanel extends Component {

	changeBackground = (event) => {
		this.props.onChangeBackground(event.target.value);
	}

	changeFontSize = (event) => {
		this.props.onChangeFontSize(event.target.value);
	}

	render() {
		return (
			<div class="config">
				<div class="field cfg-bg">
					<label for="">Background:</label>
					<input type="color" onChange={this.changeBackground} value={this.props.background} />
				</div>
				<div class="field cfg-fsize">
					<label for="">Font Size:</label>
					<input type="number" onChange={this.changeFontSize} value={this.props.fontSize} />
				</div>
			</div>
		);
	}
}
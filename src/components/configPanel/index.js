import { h, Component } from 'preact';

export default class ConfigPanel extends Component {

	changeBackground = (event) => {
		this.props.onChangeBackground(event.target.value);
	}

	changeFontSize = (event) => {
		this.props.onChangeFontSize(event.target.value);
	}

	changeLanguage = (event) => {
		this.props.onChangeLanguage(event.target.value);
	}

	render() {
		return (
			<div class="config">
				<div>
					<label for="config-language">Language:</label>
					<select id="config-language" value={this.props.currentLanguage} onChange={this.changeLanguage}>
					{
						this.props.languages.map(function(language) {
							return <option key={language.value}
							value={language.value}>{language.label}</option>;
						})
					}
					</select>
				</div>
				<div class="field cfg-bg">
					<label for="config-color">Background:</label>
					<input id="config-color" type="color" onChange={this.changeBackground} value={this.props.background} />
				</div>
				<div class="field cfg-fsize">
					<label for="config-font-size">Font Size:</label>
					<input id="config-font-size" type="number" onChange={this.changeFontSize} value={this.props.fontSize} />
				</div>
			</div>
		);
	}
}
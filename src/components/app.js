import { h, Component } from 'preact';
import domtoimage from 'dom-to-image';

import ConfigPanel from './configPanel';
import CodeEditor from './codeEditor';
import ScreenshotPreview from './screenshotPreview';

export default class App extends Component {

	constructor(props) {
		super(props);
		const codeText = localStorage.getItem('code-cool') || '';
		this.state = {
			background: '#1B202D',
			fontSize: 14,
			codeText
		};
	}

	changeCodeSnippet = (value) => {
		localStorage.setItem('code-cool', value);
		this.setState((state) => ({ ...state, codeText: value }));
	}

	exportImage = () => {
		const previewElem = this.preview.base;
		domtoimage
			.toPng(previewElem, {
				style: {
					transform: `scale(${devicePixelRatio})`,
					'transform-origin': 'center'
				},
				width: previewElem.clientWidth * devicePixelRatio,
				height: previewElem.clientHeight * devicePixelRatio
			})
			.then(this.downloadImage)
			.catch(console.error);
	}

	downloadImage = (dataurl) => {
		const link = document.createElement('a');
		link.download = 'code-cool.png';
		link.href = dataurl;
		document.body.appendChild(link);
		link.click();
		link.remove();
	}

	setBackground = (background) => {
		this.setState((state) => ({ ...state, background }));
	}

	setFontSize = (fontSize) => {
		this.setState((state) => ({ ...state, fontSize }));
	}

	render() {
		return (
			<div class="wrap">
				<h1>😎 Code Cool 😎</h1>

				<CodeEditor value={this.state.codeText} onChange={this.changeCodeSnippet} />
				<ConfigPanel
					background={this.state.background}
					fontSize={this.state.fontSize}
					onChangeBackground={this.setBackground}
					onChangeFontSize={this.setFontSize}
				/>

				<ScreenshotPreview
					ref={(preview) => { this.preview = preview; }}
					value={this.state.codeText}
					background={this.state.background}
					fontSize={this.state.fontSize}
				/>

				<div class="bottom">
					<button onClick={this.exportImage} class="btn export">Export Image</button>
				</div>

			</div>
		);
	}
}

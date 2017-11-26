import { h, Component } from 'preact';
import domtoimage from 'dom-to-image';

import ConfigPanel from './configPanel';
import CodeEditor from './codeEditor';
import ScreenshotPreview from './screenshotPreview';

const languages = [
	{ label: '--language--', value: ''},
	{ label: 'Clojure', value: 'clojure'},
	{ label: 'CSS', value: 'css'},
	{ label: 'Elm', value: 'elm'},
	{ label: 'Erlang', value: 'erlang'},
	{ label: 'Go', value: 'go'},
	{ label: 'Haskell', value: 'haskell'},
	{ label: 'JavaScript', value: 'javascript'},
	{ label: 'jsx', value: 'jsx'},
	{ label: 'Markdown', value: 'markdown'},
	{ label: 'PHP', value: 'php'},
	{ label: 'Python', value: 'python'},
	{ label: 'Ruby', value: 'ruby'},
	{ label: 'Rust', value: 'rust'},
	{ label: 'SQL', value: 'sql'},
	{ label: 'Swift', value: 'swift'},
	{ label: 'HTML/XML', value: 'xml'},
	{ label: 'Shell', value: 'shell'},
	{ label: 'Java', value: 'java'},
	{ label: 'C#', value: 'cs'},
	{ label: 'C++', value: 'cpp'}
]

export default class App extends Component {

	constructor(props) {
		super(props);
		const codeText = localStorage.getItem('code-cool') || '';
		this.state = {
			background: '#1B202D',
			fontSize: 14,
			currentLanguage: '',
			codeText,
			languages
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

	setLanguage = (language) => {
		this.setState((state) => ({ ...state, currentLanguage: language }));
	}

	render() {
		return (
			<div class="wrap">
				<h1>😎 Code Cool 😎</h1>

				<CodeEditor 
					value={this.state.codeText} 
					language={this.state.currentLanguage} 
					onChange={this.changeCodeSnippet} />
				<ConfigPanel
					background={this.state.background}
					fontSize={this.state.fontSize}
					onChangeBackground={this.setBackground}
					onChangeFontSize={this.setFontSize}
					onChangeLanguage={this.setLanguage}
					languages={this.state.languages}
					currentLanguage={this.state.currentLanguage}
				/>

				<ScreenshotPreview
					ref={(preview) => { this.preview = preview; }}
					value={this.state.codeText}
					background={this.state.background}
					fontSize={this.state.fontSize}
					onChangeLanguage={this.setLanguage}
					languages={this.state.languages}
					currentLanguage={this.state.currentLanguage}
				/>

				<div class="bottom">
					<button onClick={this.exportImage} class="btn export">Export Image</button>
				</div>

			</div>
		);
	}
}

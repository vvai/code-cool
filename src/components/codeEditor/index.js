import { h, Component } from 'preact';
import codeMirror from 'codemirror';
import parinfer from 'parinfer';
import parinferCodeMirror from 'parinfer-codemirror';

export default class CodeEditor extends Component {

	componentDidMount() {
		const cm = codeMirror(this.codeEditor);
		parinferCodeMirror.init(cm);
		cm.setValue(this.props.value);

		cm.on('change', cm => {
			this.props.onChange(cm.getValue());
		});
	}

	render() {
		return <div ref={(editor) => { this.codeEditor = editor; }} class="input" />;
	}
}
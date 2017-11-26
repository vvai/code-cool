import { h, Component } from 'preact';
import CodeMirror from 'react-codemirror';

require('codemirror/mode/clojure/clojure');
require('codemirror/mode/css/css');
require('codemirror/mode/elm/elm');
require('codemirror/mode/erlang/erlang');
require('codemirror/mode/go/go');
require('codemirror/mode/haskell/haskell');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/jsx/jsx');
require('codemirror/mode/markdown/markdown');
require('codemirror/mode/php/php');
require('codemirror/mode/python/python');
require('codemirror/mode/ruby/ruby');
require('codemirror/mode/rust/rust');
require('codemirror/mode/sql/sql');
require('codemirror/mode/swift/swift');
require('codemirror/mode/xml/xml');
require('codemirror/mode/clike/clike');
require('codemirror/mode/shell/shell');

export default class CodeEditor extends Component {

	codeUpdated = (value) => {
		this.props.onChange(value);
	}

	render() {
		let language = this.props.language;
		if (language === 'java' || language === 'cs' || language === 'cpp') {
			language = 'clike';
		}
		const options = {
			lineNumbers: true,
			matchBrackets: true,
			mode: language
		}
		return <CodeMirror className="input" value={this.props.value} onChange={this.codeUpdated} options={options} />
	}
}
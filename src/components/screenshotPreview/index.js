import { h, Component } from "preact";
import hljs from "highlight.js";

export default class ScreenshotPreview extends Component {
  componentDidMount() {
    hljs.highlightBlock(this.code);
  }

  componentDidUpdate() {
    this.code.innerHTML = this.props.value;
    hljs.highlightBlock(this.code);
  }

  render() {
    const backgroundStyle = `background-color: ${this.props.background}`;
    const fontStyle = `font-size: ${this.props.fontSize}px`;
    return (
      <pre class="viewport" style={backgroundStyle}>
        <code
          ref={code => {
            this.code = code;
          }}
          class="clojure display-code"
          style={fontStyle}
        >
          {this.props.value}
        </code>
      </pre>
    );
  }
}

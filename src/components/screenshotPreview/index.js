import { h, Component } from "preact";
import hljs from "highlight.js";
import { setTimeout } from "timers";

export default class ScreenshotPreview extends Component {
  componentDidMount() {
    hljs.initHighlightingOnLoad()
    setTimeout(this.detectLanguage, 500)
  }

  detectLanguage = () => {
    const classNameInsideLanguageList = (className) => {
      return this.props.languages.find(language => {
        return language.value === className;
      });
    }

    this.code.classList.forEach(className => {
      if (classNameInsideLanguageList(className)) {
        this.props.onChangeLanguage(className);
      }
    });
  }

  componentDidUpdate() {
    this.code.innerHTML = this.props.value;
    hljs.highlightBlock(this.code);
  }

  render() {
    const backgroundStyle = `background-color: ${this.props.background}`;
    const fontStyle = `font-size: ${this.props.fontSize}px`;
    const classNames = `display-code ${this.props.currentLanguage}`
    return (
      <pre class="viewport" style={backgroundStyle}>
        <code
          ref={code => {
            this.code = code;
          }}
          class={classNames}
          style={fontStyle}
        >
          {this.props.value}
        </code>
      </pre>
    );
  }
}

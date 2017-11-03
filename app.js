class Atom {
  constructor(value) {
    this._value = value;
  }
  swap(fn) {
    this._value = fn(this._value);
    return this._value;
  }
  deref() {
    return this._value;
  }
}

Atom.of = value => new Atom(value);

class Dispacther {
  constructor(controllers, { ref }) {
    this._controllers = controllers;
    this._ref = ref;
  }
  dispatch(controllerName, event, ...args) {
    const controller = this._controllers[controllerName];
    if (controller) {
      this._ref.swap(value => controller.callMethod(event, args, value));
    } else {
      console.error(`Controller "${controllerName}" is not registered`);
    }
  }
}

Dispacther.of = (controllers, ref) => new Dispacther(controllers, ref);

class Controller {
  constructor(name) {
    this._name = name;
    this._methods = {};
  }
  addMethod(methodName, methodFn) {
    this._methods[methodName] = methodFn;
  }
  callMethod(methodName, ...args) {
    const method = this._methods[methodName];
    if (method) {
      return method(...args);
    } else {
      console.error(
        `Method "${method}" is not registered in "${this._name}" controller`
      );
    }
  }
}

Controller.of = name => new Controller(name);

// =====

const state = Atom.of({
  border: '#fe2596',
  background: '#1B202D',
  fontSize: 14
});

const configController = Controller.of('config');

const dispatch = (() => {
  const dispatcher = Dispacther.of(
    {
      config: configController
    },
    { ref: state }
  );
  return dispatcher.dispatch.bind(dispatcher);
})();

const input = document.querySelector('.input');
const code = document.querySelector('.display-code');

const borderColor = document.querySelector('.cfg-border input');
const bgColor = document.querySelector('.cfg-bg input');
const fSize = document.querySelector('.cfg-fsize input');

const viewport = document.querySelector('.viewport');
const codePre = document.querySelector('.viewport > pre');

configController.addMethod('set-config', ([config], state) => {
  const nextState = { ...state, ...config };
  const { background, border, fontSize } = nextState;

  borderColor.value = border;
  bgColor.value = background;
  fSize.value = fontSize;

  viewport.style.background = border;
  codePre.style.background = background;
  code.style.fontSize = `${fontSize}px`;

  return nextState;
});

dispatch('config', 'set-config');

borderColor.addEventListener('change', () => {
  dispatch('config', 'set-config', { border: borderColor.value });
});

bgColor.addEventListener('change', () => {
  dispatch('config', 'set-config', { background: bgColor.value });
});

fSize.addEventListener('change', () => {
  dispatch('config', 'set-config', { fontSize: fSize.value });
});

var cm = CodeMirror(input);
parinferCodeMirror.init(cm);

const value = localStorage.getItem('code-cool') || '';
cm.setValue(value);
code.textContent = value;
hljs.highlightBlock(code);

cm.on('change', cm => {
  const value = cm.getValue();
  localStorage.setItem('code-cool', value);
  code.textContent = value;
  hljs.highlightBlock(code);
});
// auto-complete codeMirror

// add theme options for the ditor
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import AppState from './AppState';

import Codemirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';

const CodeMirror = require('codemirror');

@observer
class App extends Component {
  constructor(props) {
    super(props)
    this.updateCode = this.updateCode.bind(this);
  }

  // componentDidMount() {
  //   let self = this;
  //
  //   this.codemirror = CodeMirror(React.findDOMNode().querySelector('.editor-codemirror'), {
  //     lineNumbers: true,
  //     mode: 'javascript',
  //     lint: function(text, options, cm) {
  //         let linter = cm.getHelper(CodeMirror.Pos(0, 0), 'lint');
  //         return linter(text, options);
  //       },
  //     gutters: ['CodeMirror-lint-markers']
  //   })
  // }

  updateCode(code) {
    this.props.appState.updateCode(code);
  }

  interact(cm) {
    console.log(cm.getValue());
  }

  render() {
    let options = {
      lineNumbers: true,
      mode: 'javascript',
      gutters: ["CodeMirror-lint-markers"],
      tabSize: 2,
      indentWithTabs: true,
      lint: true
    };

    return (
      <div>
        <Codemirror
          value={this.props.appState.code}
          onChange={this.updateCode}
          options={options}
          interact = {this.interact}
        />
        <DevTools />
      </div>
    );
  }

  onReset = () => {
    this.props.appState.resetTimer();
  }
};

export default App;

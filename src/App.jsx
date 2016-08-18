// auto-complete codeMirror
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import Codemirror from 'react-codemirror';
import AppState from './AppState';
require('codemirror/mode/javascript/javascript');

@observer
class App extends Component {
  constructor(props) {
    super(props)
    this.updateCode = this.updateCode.bind(this);
  }

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
      tabSize: 2,
      indentWithTabs: true
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

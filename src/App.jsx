// TO-DO:
// wrap the processing canvas


// IDEAS:
// add theme options for the editor


// make a console section...

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import AppState from './AppState';

import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';

import 'brace/theme/github';
// THEMES: solarized_dark, solarized_light, twilight, and more


@observer
class App extends Component {
  constructor(props) {
    super(props)
    this.updateCode = this.updateCode.bind(this);
  }


  updateCode(code) {
    console.log('mobX code', code);
    this.props.appState.updateCode(code);
  }

  interact(cm) {
    console.log(cm.getValue());
  }

  render() {
    return (
      <div>
        <AceEditor
          mode="javascript"
          theme='github'
          onChange={this.updateCode}
          name="pjs_editor"
          setOptions={{
            // would this be helpful?
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: false
          }}
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

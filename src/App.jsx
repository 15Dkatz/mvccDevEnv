// TO-DO:
// wrap the processing canvas


// IDEAS:
// add theme options for the editor
// can we use flexBox?
// add autoCompletion option


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

import {Button} from 'react-bootstrap';

//requiring process
require('../processing.js');

@observer
class App extends Component {
  constructor(props) {
    super(props)
    this.updateCode = this.updateCode.bind(this);
    this.save = this.save.bind(this);
  }

  updateCode(code) {
    this.props.appState.updateCode(code);
  }

  interact(cm) {
    console.log(cm.getValue());
  }

  sketchProc(processing) {
    processing.draw = () => {
      processing.background(224);
    }
  }

  save() {
    let code = this.props.appState.code;
    let canvas = document.getElementById("pjs-canvas");
    let processingInstance = new Processing(canvas, code);
  }

  render() {
    return (
      <div className="row">
        <AceEditor
          mode="javascript"
          theme='github'
          placeholder='// Start coding here...'
          onChange={this.updateCode}
          value={this.props.appState.code}
          name="pjs-editor"
          //would auto-completion help?
        />
        <Button
          bsStyle="success"
          bsSize="small"
          onClick={this.save}
        >
          Save and Run
        </Button>
        <canvas id="pjs-canvas"></canvas>
        <DevTools />
      </div>
    );
  }
};

export default App;

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
    console.log('mobX code', code);
    this.props.appState.updateCode(code);
  }

  interact(cm) {
    console.log(cm.getValue());
  }

  save() {
    console.log('outwrite edited.pde with code');
    let code = this.props.appState.code;
    let processingCode = Processing.compile(code).sourceCode;
    let canvas = document.getElementById("pjs-canvas");
    let processingInstance = new Processing(canvas, processingCode);
    console.log('processingInstance', processingInstance);
    // console.log('processingCode', processingCode);
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
          //enableBasicAutocompletion={true}
          //enableLiveAutocompletion={true}
        />
        <Button
          bsStyle="success"
          bsSize="small"
          onClick={this.save}
        >
          Save and Run
        </Button>
        <canvas id="pjs-canvas" data-processing-sources="anything.pde"></canvas>
        <DevTools />
      </div>
    );
  }

  onReset = () => {
    this.props.appState.resetTimer();
  }
};

export default App;

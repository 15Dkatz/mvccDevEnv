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
      <div>
        <Button
          bsStyle="success"
          bsSize="small"
          onClick={this.save}
          className="col-xs-offset-5"
        >
          Save and Run
        </Button>
        <DevTools />
        <div className="row between-xs">
          <AceEditor
            mode="javascript"
            theme='github'
            placeholder='// Start coding here...'
            onChange={this.updateCode}
            value={this.props.appState.code}
            name="pjs-editor"
            height="100vh"
            className="col-xs"
            fontSize="15px"
          />
          <div className='pjs-space'>
            <canvas id="pjs-canvas" className="col-xs"></canvas>
          </div>
        </div>
      </div>
    );
  }
};

export default App;

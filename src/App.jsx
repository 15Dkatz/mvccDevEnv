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
//requiring process
require('../processing.js');

@observer
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width: 500,
      height: 500
    }

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

  onResize(event, {element, size}) {
    let {width, height} = size;
    this.setState({width, height})
  }

  render() {
    return (
      <div>
        <div
          style={styles.header}
        >
          <div
            onClick={this.save}
            className="button-save border"
          >
            Save and Run
          </div>
        </div>
        <DevTools />
        <div
          className="border"
          style={styles.row}
          >
          <AceEditor
            mode="javascript"
            theme='github'
            onChange={this.updateCode}
            value={this.props.appState.code}
            name="pjs-editor"
            height='100%'
            width='50%'
            fontSize={15}
            editorProps={{$blockScrolling: true}}
            className='ace-editor half'
          />
          <div
            id='pjs-space'
            className='half'
            style={styles.centerContainer}
          >
            <canvas id="pjs-canvas"
              className='border'
            ></canvas>
          </div>
        </div>
      </div>
    );
  }
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '98.5vw'
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '98.5vw'
  },

  centerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default App;

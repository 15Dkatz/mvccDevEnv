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
// requiring process
import DraggableCore from 'react-draggable';

// make sure editor runs work with all pjs repos
require('../processing.js');

@observer
class App extends Component {
  constructor(props) {
    super(props)
    this.save = this.save.bind(this);
    this.drag = this.drag.bind(this);
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

    // catch JS defined processing instances here and convert to js code

    let processingInstance = new Processing(canvas, code);
  }


  drag(ev) {
    console.log('ev.screenX', ev.screenX);
    console.log('document.getElementById(dragger)', document.getElementById('dragger'));
    // let width_workspace = document.body.clientWidth;
    // let width_pjs_editor = ev.screenX * 0.91459627;
    // let width_pjs_space = width_workspace - width_pjs_editor;
    // this.props.appState.updateWidths(width_pjs_editor, width_pjs_space);
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
          id='workspace'
          className='border'
          style={styles.row}
          >
          <AceEditor
            mode='javascript'
            theme='github'
            onChange={(code) => this.props.appState.updateCode(code)}
            value={this.props.appState.code}
            name='pjs-editor'
            id='pjs-editor'
            height='90vh'
            width={`${this.props.appState.width_pjs_editor}px`}
            fontSize={15}
            editorProps={{$blockScrolling: true}}
          />
          <div
            draggable={true}
            onDrag={this.drag}
            id='dragger'
          >
          </div>
          <div
            id='pjs-space'
            className='borderLeft'
            style={Object.assign({}, styles.centerContainer, {width: `${this.props.appState.width_pjs_space}px`})}
          >
            <canvas id="pjs-canvas"
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
    width: '100vw'
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100vw'
  },

  centerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export default App;

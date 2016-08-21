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
import Draggable from 'react-draggable';

// make sure editor runs work with all pjs repos
require('../processing.js');

@observer
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width_left: `${document.body.clientWidth/2}%`,
      width_right: `${document.body.clientWidth/2}%`
      // width_left: '40vh',
      // width_right: '60vh'
    }

    this.updateCode = this.updateCode.bind(this);
    this.save = this.save.bind(this);
    this.drag = this.drag.bind(this);
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

  drag(ev) {
    console.log('ev', ev);
    let width_left = (ev.screenX/document.getElementById('workspace').clientWidth)*100;
    let width_right = 100-width_left;
    width_left = `${width_left}vw`;
    width_right = `${width_right}vw`;
    console.log('width_left', width_left, 'width_right', width_right);
    this.setState({width_left, width_right});
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
            onChange={this.updateCode}
            value={this.props.appState.code}
            name='pjs-editor'
            height='100%'
            width={this.state.width_left}
            fontSize={15}
            editorProps={{$blockScrolling: true}}
          />
          {/*<Draggable
            onDrag={this.drag}
            axis='x'
          >
            <div
              className='dragger'
            >
            </div>
          </Draggable>*/}
          <div
            className='borderLeft'
            style={Object.assign({}, styles.centerContainer, {width: this.state.width_right})}
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
    alignItems: 'center',
  }
}

export default App;

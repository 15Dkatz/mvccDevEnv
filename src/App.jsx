// IDEAS:
// add theme options for the editor
// add autoCompletion option
// make a console section for logging variables and state


// Questions
// on the PJS code
// are we converting the pjs inherently to the js equivalent?
// why does the draw function work on some repos? and w/o it on others?
// do some inherently have the size(500, 500) line?

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

import SplitPane from 'react-split-pane/lib/SplitPane';

// make sure editor runs work with all pjs repos
require('../processing.js');

@observer
class App extends Component {
  constructor(props) {
    super(props)
    this.save = this.save.bind(this);
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
      <div style={{
        flex: '1'
      }}>
        <DevTools />
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
        <SplitPane
          split='vertical'
          className="border"
          defaultSize="50%"
          minSize={75}
          maxSize={-75}
          style={{
            width: `${document.body.clientWidth}px`,
          }}
        >
          <AceEditor
            mode='javascript'
            theme='github'
            onChange={(code) => this.props.appState.updateCode(code)}
            value={this.props.appState.code}
            name='pjs-editor'
            id='pjs-editor'
            height='90vh'
            width='inherit'
            fontSize={15}
            editorProps={{$blockScrolling: true}}
          />
          <div
            id='pjs-space'
            style={styles.centerContainer}
            width='inherit'
          >
            <canvas
              id="pjs-canvas"
            >
            </canvas>
          </div>
        </SplitPane>
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
    alignItems: 'center',
    paddingLeft: '5px'
  }
}

export default App;

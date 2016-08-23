// TASKS:
// add suggestions to UI, and add collapsable panes to each section
//  foldable panes: https://gist.github.com/Qt-dev/4ca4c41b8ec8f6c0bb27
// sections: [LessonExplorer][Editor][Editing space]

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
    this.collapse = this.collapse.bind(this);
    this.togglePanes = this.togglePanes.bind(this);
    this.state = {
      size: '50%',
      panes: [{open: true}, {open: true}],
      prev_width: ''
    }
  }

  save() {
    let code = this.props.appState.code;
    let canvas = document.getElementById("pjs_canvas");
    let processingInstance = new Processing(canvas, code);
  }

  togglePanes(id) {
    let newPanes = this.state.panes;
    newPanes[id].open = !newPanes[id].open;
    return newPanes;
  }

  collapse(pane_num) {

    //add width to previous pane
    let pane = document.getElementsByClassName(`Pane${pane_num}`)[0];
    console.log('attempting to collapse', pane);
    pane_num -= 1; //necessary because react-split-pane numbers starting from 1 not 0...
    if (this.state.panes[pane_num].open) {
      this.setState({prev_width: pane.style.width});
      pane.style.width = '0px';
    } else {
      pane.style.width = this.state.prev_width;
    }

    let panes = this.state.panes;
    panes[pane_num].open = !panes[pane_num].open;
    this.setState({
      panes
    })

  }

  render() {
    return (
      <div>
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
          defaultSize={this.state.size}
          minSize={75}
          maxSize={-75}
          style={{
            width: '100vw',
          }}
        >
          <div>
            <AceEditor
              mode='javascript'
              theme='github'
              onChange={(code) => this.props.appState.updateCode(code)}
              value={this.props.appState.code}
              name='pjs_editor'
              id='pjs_editor'
              className='sectionContent'
              height='90vh'
              width='inherit'
              fontSize={15}
              editorProps={{$blockScrolling: true}}
            />
            <div
              className='button-toggle'
              onClick={() => this.collapse(1)}
            >
              &#9654;
            </div>
          </div>
          <div>
            <div
              id='pjs_space'
              style={styles.centerContainer}
              width='inherit'
            >
              <canvas
                id="pjs_canvas"
              >
              </canvas>
            </div>
            <div
              className='button-toggle'
              onClick={() => this.collapse(2)}
            >
              &#9654;
            </div>
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

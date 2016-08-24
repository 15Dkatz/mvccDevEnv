// TASKS:
// add suggestions to UI, and add collapsable panes to each section
//  foldable panes: https://gist.github.com/Qt-dev/4ca4c41b8ec8f6c0bb27
//    ADD blue highlights to foldable pane buttons when active
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
// Is it ok to mix MobX state and have localState?

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
    this.state = {
      size: '50%',
      // simply keeping track of all 3 panes
      panes: [{open: true}, {open: true}, {open: true}],
      prev_widths: []
    }
  }

  save() {
    let code = this.props.appState.code;
    let canvas = document.getElementById("pjs_canvas");
    let processingInstance = new Processing(canvas, code);
  }

  // BEAUTIFY this working method
  // SHOULD work with added panes.
  allOpen(panes) {
    for (let i=0; i<panes.length; i++) {
      if (panes[i].open == false) {
        return false;
      }
    }
    return true;
  }

  togglePaneOpen(pane_num) {
    // toggle the pane_num opening in state
    let {panes} = this.state;
    panes[pane_num].open = !panes[pane_num].open;
    this.setState({panes});
    console.log('panes_state of pane', pane_num, ':', panes[pane_num]);
  }

  collapse(pane_num) {
    // following if statement only allows you to toggle one pane at a time
    let pane_leftover = '4%';
    // uncomment following line to have only one pane collapsable at time
    // [option1] if (this.state.panes[pane_num].open == false || this.allOpen(this.state.panes)) {
    // [option2] -> next if statement | allows you to have all panes collapsable at a time;
    if ('multi-collapse' == 'multi-collapse') {
      switch (pane_num) {
        case 0:
          // console.log('toggling pane 1');
          let pane = document.getElementsByClassName(`Pane${pane_num+1}`)[0];
          if (this.state.panes[pane_num].open) {
            let prev_widths = this.state.prev_widths;
            prev_widths[pane_num] = pane.clientWidth;
            this.setState({prev_widths});
            pane.style.width = pane_leftover;
          } else {
            // console.log('attempting to set to the previous width in pane 1');
            pane.style.width = this.state.prev_widths[pane_num];
          }
          break;
        case 1:
          pane = document.getElementsByClassName(`Pane${pane_num}`)[1];
          // console.log('toggling pane', pane);
          if (this.state.panes[pane_num].open) {
            let prev_widths = this.state.prev_widths;
            prev_widths[pane_num] = pane.clientWidth;
            this.setState({prev_widths});
            pane.style.width = pane_leftover;
          } else {
            // console.log('attempting to set to the previous width in pane 2');
            pane.style.width = this.state.prev_widths[pane_num];
          }
          break;
        case 2:
          pane = document.getElementsByClassName(`Pane${pane_num-1}`)[1];
          // console.log('toggling pane', pane);
          if (this.state.panes[pane_num].open) {
            let prev_widths = this.state.prev_widths;
            prev_widths[pane_num] = pane.clientWidth;
            this.setState({prev_widths});
            let add_pane = document.getElementsByClassName('Pane2')[1];
            let new_width = parseInt(pane.clientWidth) + parseInt(add_pane.clientWidth);
            new_width = `calc(${new_width}px - ${pane_leftover})`;
            pane.style.width = new_width;
          } else {
            // console.log('attempting to set to the previous width of pane 3 (pane2)(pane2) by resetting (pane2)(pane1)');
            pane.style.width = this.state.prev_widths[pane_num];
          }
          break;
      }
      this.togglePaneOpen(pane_num);
    }
  }

  renderButton(id) {
    return (
      <div
        className={`button-toggle ${this.state.panes[id].open ? '' : 'blue'}`}
        onClick={() => this.collapse(id)}
      >
        &#9705;
      </div>
    )
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
          defaultSize='33.33%'
          split='vertical'
          height='100vh'
          maxSize={-50}
          minSize={50}
          className='border panes'
        >
          <div>
            MVCode Lessons
            {this.renderButton(0)}
          </div>
          <SplitPane
            defaultSize='50%'
            maxSize={-50}
            minSize={50}
            split='vertical'
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
              {this.renderButton(1)}
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
              {this.renderButton(2)}
            </div>
          </SplitPane>
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

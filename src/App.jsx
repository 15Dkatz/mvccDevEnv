import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import Codemirror from 'react-codemirror';
require('codemirror/mode/javascript/javascript');

@observer
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '// Start coding here!'
    }
  }

  updateCode(code) {
    this.setState({
      code
    })
  }

  interact(cm) {
    console.log(cm.getValue());
  }

  render() {
    let options = {
      lineNumbers: true,
      mode: 'javascript'
    };

    return (
      <div>
        <DevTools />
        {/*<button onClick={this.onReset}>
          Seconds passed: {this.props.appState.timer}
        </button>*/}
        <Codemirror
          value={this.state.code}
          onChange={this.updateCode}
          options={options}
          interact = {this.interact}
        />
      </div>
    );
  }

  onReset = () => {
    this.props.appState.resetTimer();
  }
};

export default App;

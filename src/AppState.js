import { observable, action } from 'mobx';

class AppState {
  @observable code = '// Start coding here!';

  // constructor() {
  //   setInterval(() => {
  //     this.timer += 1;
  //   }, 1000);
  // }
  //
  // resetTimer() {
  //   this.timer = 0;
  // }
  @action updateCode(newCode) {
    this.code = newCode;
  }
}

export default AppState;

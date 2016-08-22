import { observable, action } from 'mobx';

class AppState {
  @observable code = '// Start coding here! \nsize(500,500);';

  @action updateCode(newCode) {
    this.code = newCode;
  }
}

export default AppState;

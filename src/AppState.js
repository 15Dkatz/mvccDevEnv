import { observable, action } from 'mobx';

class AppState {
  @observable code = '// Start coding here! \nsize(500,500);';

  @action updateCode(newCode) {
    this.code = newCode;
  }

  @observable doc_width = document.body.clientWidth/2;
  @observable width_pjs_editor = this.doc_width;
  @observable width_pjs_space = this.doc_width;

  @action updateWidths(w_editor, w_space) {
    if (w_editor>0 && w_space>0) {
      this.width_pjs_editor = w_editor;
      this.width_pjs_space = w_space;
    }
  }


}

export default AppState;

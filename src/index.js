import './scss/main.scss';
import { codeMirrorCommonConfig } from './js/config/codeMirrorCommonConfig.js';

const textEditorHtml = CodeMirror.fromTextArea(document.querySelector('.boxInput--html'), Object.assign({
  mode: 'xml',
  htmlMode: true
}, codeMirrorCommonConfig)
);

const textEditorJs = CodeMirror.fromTextArea(document.querySelector('.boxInput--js'), Object.assign({
  mode: {
    name: 'javascript'
  },
}, codeMirrorCommonConfig)
);
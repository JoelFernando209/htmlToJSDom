import './scss/main.scss';
import { codeMirrorCommonConfig } from './js/codeMirrorCommonConfig.js';

const textEditorHtml = CodeMirror(document.querySelector('.boxInput--html'), Object.assign({
  mode: 'xml',
  htmlMode: true
}, codeMirrorCommonConfig)
);

const textEditorJs = CodeMirror(document.querySelector('.boxInput--js'), Object.assign({
  mode: 'javascript',
}, codeMirrorCommonConfig)
);
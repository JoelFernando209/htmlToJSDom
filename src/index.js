import './scss/main.scss';
import { codeMirrorCommonConfig } from './js/config/codeMirrorCommonConfig.js';
import { createProcess } from './js/general/generalConfig.js';
import { getTextEditorValue } from './js/general/codemirrorComponents.js';
import { deleteComments, putOutputInBoard } from './js/htmlManipulation/phasesComponents.js';

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

const htmlConvertProcess = createProcess(
  [
    putOutputInBoard,
    deleteComments,
    getTextEditorValue
  ],
  {
    editor: textEditorHtml
  }
);

textEditorHtml.on('keyup', () => {
  htmlConvertProcess(textEditorHtml);
})
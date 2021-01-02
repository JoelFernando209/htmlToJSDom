import loadingState from './assets/loading-state.svg';
import completedState from './assets/completed-state.svg';

import './scss/main.scss';
import { codeMirrorCommonConfig } from './js/config/codeMirrorCommonConfig.js';
import { createProcess, resetOutput } from './js/general/generalConfig.js';
import { getTextEditorValue, setJSEditorOutput } from './js/general/codemirrorComponents.js';
import { deleteComments, deleteEnters } from './js/htmlManipulation/phasesComponents.js';
import { putOutputInBoard, getParentElementsHtmlBoard, loopChildNodes } from './js/htmlManipulation/domComponents.js';

const textEditorHtml = CodeMirror.fromTextArea(document.querySelector('.boxInput--html'), Object.assign({
  mode: 'xml',
  htmlMode: true
}, codeMirrorCommonConfig)
);

export const textEditorJs = CodeMirror.fromTextArea(document.querySelector('.boxInput--js'), Object.assign({
  mode: {
    name: 'javascript'
  },
}, codeMirrorCommonConfig)
);

const htmlConvertProcess = createProcess(
  [
    setJSEditorOutput,
    loopChildNodes,
    getParentElementsHtmlBoard,
    putOutputInBoard,
    deleteEnters,
    deleteComments,
    getTextEditorValue,
    resetOutput
  ],
  {
    editor: textEditorHtml
  }
);

textEditorHtml.on('keyup', () => {
  const statusSquare = document.querySelector('.statusSquare__icon');
  
  statusSquare.setAttribute('src', '../assets/loading-state.svg');
  
  htmlConvertProcess(textEditorHtml);
  
  statusSquare.setAttribute('src', '../assets/completed-state.svg');
  
  if(getTextEditorValue({ editor: textEditorHtml }).htmlInput.length === 0) {
    statusSquare.setAttribute('src', '../assets/hourglass-wait.svg');
  }
  
})
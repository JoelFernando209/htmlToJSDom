import { textEditorJs } from '../../index.js';

export const getTextEditorValue = ({ editor }) => {
  return {
    htmlInput: editor.getValue()
  }
};

export const setJSEditorOutput = ({ output }) => {
  textEditorJs.getDoc().setValue(output);
  
  return {
    output
  }
}
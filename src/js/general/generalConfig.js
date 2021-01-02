export let outputJs = ``;

const compose = (fn1, fn2) => (...args) => fn1(fn2(...args));

const multipleCompose = (...functions) => functions.reduce(compose);

export const createProcess = (functions, param) => () => multipleCompose(
  ...functions
)(param);

const getNewId = () => {
  let currentId = 0;
  
  return () => {
    currentId++;
    
    return currentId;
  }
};

export const createNewId = getNewId();

export const modifyOutput = (modify) => {
  outputJs += modify;
  
  return outputJs;
}

export const resetOutput = ({ editor }) => {
  outputJs = `
// Consider htmlInputBoardElement as the parent element of all the HTML you putted in the input.
  `;
  
  return {
    editor
  }
}
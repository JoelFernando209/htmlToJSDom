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
  
  console.log(outputJs);
  
  return outputJs;
}
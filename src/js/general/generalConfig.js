const compose = (fn1, fn2) => (...args) => fn1(fn2(...args));

const multipleCompose = (...functions) => functions.reduce(compose);

export const createProcess = (functions, param) => () => multipleCompose(
  ...functions
)(param);
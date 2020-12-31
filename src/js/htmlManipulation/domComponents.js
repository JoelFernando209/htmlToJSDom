import { createNewId, modifyOutput } from '../general/generalConfig.js';
import { convertToCamelCase, selectLongestSelector } from '../general/formatComponents.js';

export const putOutputInBoard = ({ htmlInput }) => {
  const inputBoard = document.querySelector('.htmlInputBoard');
  
  inputBoard.innerHTML = htmlInput;
  
  return {
    htmlInput
  };
};

export const getParentElementsHtmlBoard = ({ htmlInput }) => {
  const inputBoard = document.querySelector('.htmlInputBoard');
  
  const inputBoardChilds = inputBoard.childNodes;
  
  console.log(inputBoardChilds);
  
  return {
    htmlInput,
    arrChildNodes: inputBoardChilds
  }
}

export const setIdClassElement = ({ element }) => {
  const newId = createNewId();
  
  element.setAttribute('class', `element-${newId}`);
}

export const checkIfElementHasNotClassOrId = ({ child }) => {
  if(!child.hasAttribute('class') && !child.hasAttribute('id')) {
    setIdClassElement({
      element: child
    });
  }
  
  return {
    child
  }
}

export const putOutputClassOrId = ({ child }) => {
  if(child.hasAttribute('class')) {
    const longestClass = selectLongestSelector(child.getAttribute('class'));
    const elementClass = convertToCamelCase(longestClass);
    
    modifyOutput(`
      const ${elementClass} = document.createElement('${child.tagName.toLowerCase()}');
      ${elementClass}.className = '${child.getAttribute('class')}';
      
    `);
    
  } else if(child.hasAttribute('id')) {
    const longestId = selectLongestSelector(child.getAttribute('id'));
    const elementId = convertToCamelCase(longestId);
    
    modifyOutput(`
      const ${elementId} = document.createElement('${child.tagName.toLowerCase()}');
      ${elementId}.id = '${child.getAttribute('id')}';
      
    `);
    
  }
  
  return {
    child
  }
};

export const checkIfElementHasChildNodes = ({ htmlInput, child }) => {
  if(child.hasChildNodes()) {
    loopChildNodes({
      htmlInput,
      arrChildNodes: child.childNodes
    })
  }
  
  return {
    htmlInput,
    child
  }
}

export const loopChildNodes = ({ htmlInput, arrChildNodes }) => {
  arrChildNodes.forEach(child => {
    
    if(child.nodeName === '#text') {
      /*Change this later to convert it to createTextNode*/
      
      return;
    }
    
    checkIfElementHasNotClassOrId({ child });
    
    putOutputClassOrId({ child });
    
    checkIfElementHasChildNodes({ htmlInput, child });
  })
  
  return {
    htmlInput
  }
};
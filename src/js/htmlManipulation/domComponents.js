import { createNewId, modifyOutput, outputJs } from '../general/generalConfig.js';
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

export const getClassOrIdElement = ({ element }) => {
  if(element.hasAttribute('class')) {
    const longestClass = selectLongestSelector(element.getAttribute('class'));
    
    return convertToCamelCase(longestClass);
  } else if (element.hasAttribute('id')) {
    const longestId = selectLongestSelector(element.getAttribute('id'));
    
    return convertToCamelCase(longestId);
  }
}

export const putOutputClassOrId = ({ child }) => {
  const parent = child.parentElement;
  const selectorParent = getClassOrIdElement({ element: parent })+'Element';
  
  if(child.hasAttribute('class')) {
    const longestClass = selectLongestSelector(child.getAttribute('class'));
    const elementClass = convertToCamelCase(longestClass)+'Element';
    
    modifyOutput(`
const ${elementClass} = document.createElement('${child.tagName.toLowerCase()}');
${elementClass}.className = '${child.getAttribute('class')}';
${selectorParent}.appendChild(${elementClass});
      
    `);
    
  } else if(child.hasAttribute('id')) {
    const longestId = selectLongestSelector(child.getAttribute('id'));
    const elementId = convertToCamelCase(longestId)+'Element';
    
    modifyOutput(`
const ${elementId} = document.createElement('${child.tagName.toLowerCase()}');
${elementId}.id = '${child.getAttribute('id')}';
${selectorParent}.appendChild(${elementId});
      
    `);
    
  }
  
  return {
    child
  }
};

export const putOutputText = ({ child }) => {
  const parent = child.parentElement;
  let selectorParent = getClassOrIdElement({ element: parent })+'Element';
  
  modifyOutput(`
const ${selectorParent}Text = document.createTextNode('${child.textContent.trim()}');
${selectorParent}.appendChild(${selectorParent}Text)
    
  `)
  
  return {
    child
  }
}

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
      putOutputText({ child });
      
      return;
    }
    
    checkIfElementHasNotClassOrId({ child });
    
    putOutputClassOrId({ child });
    
    checkIfElementHasChildNodes({ htmlInput, child });
  })
  
  return {
    output: outputJs
  }
};
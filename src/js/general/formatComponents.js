export const selectLongestSelector = (classTarget) => {
  let longest = '';
  const classArr = classTarget.split(' ');
  
  classArr.forEach(classItem => {
    if(classItem.length >= longest.length) {
      longest = classItem;
    }
  });
  
  return longest;
}

export const convertToCamelCase = (input) => {
  try {
    const splitBySpecialCharacters = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;
    
    const inputSplitted = input.match(splitBySpecialCharacters);
    
    let result = '';
    
    for(let i = 0, len = inputSplitted.length; i < len; i++) {
      let currentStr = inputSplitted[i];
      
      let tempStr = currentStr.toLowerCase();
      
      if(i !== 0) {
        tempStr = tempStr.substr(0, 1).toUpperCase() + tempStr.substr(1);
      }
      
      result += tempStr;
    }
    
    return result;
  } catch(e) {
    console.log('ERROR, input: ', input)
  }
  
}
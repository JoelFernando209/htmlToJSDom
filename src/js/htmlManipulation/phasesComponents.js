export const deleteComments = ({ htmlInput }) => {
  const deleteHtmlComments = /<!--(?!>)[\S\s]*?-->/g;
  
  return {
    htmlInput: htmlInput.replace(deleteHtmlComments, '')
  };
};

export const putOutputInBoard = ({ htmlInput }) => {
  const inputBoard = document.querySelector('.htmlInputBoard');
  
  inputBoard.innerHTML = htmlInput;
  
  return {
    htmlInput
  };
};
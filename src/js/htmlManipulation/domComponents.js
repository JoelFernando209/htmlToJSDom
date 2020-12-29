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
    inputBoardChilds
  }
}
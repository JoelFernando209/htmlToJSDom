export const deleteComments = ({ htmlInput }) => {
  const deleteHtmlComments = /<!--(?!>)[\S\s]*?-->/g;
  
  return {
    htmlInput: htmlInput.replace(deleteHtmlComments, '')
  };
};

export const deleteEnters = ({ htmlInput }) => {
  const deleteEnters = /(\r\n|\n|\r)/gm;
  
  return {
    htmlInput: htmlInput.replace(deleteEnters, '')
  }
}
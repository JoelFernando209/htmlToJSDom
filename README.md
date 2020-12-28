🚧Under construction🚧

**HTML** to **JS DOM** converter 🌊

Just copy & paste your HTML and we convert it to JS DOM ready to copy to your code 😆

### Requirements
1. Its a requirement to include class/id attributes to all your elements in the HTML, the values of that attributes are going to be used as the names of the variables of the JS selectors and added to its className/id. If they are not included, your elements with no selector are going to be changed giving a random hash class to it (which its obviously not ideal). **Example:**
```html
<!--HTML-->
<div class='parent'>
  <span id='parent__title'>Cool blog</span>
  <div class='parent__content'>
    This is a interesting dev blog
  </div>
  <div> <!--In the output this is going to be changed to <div class='randomHash'>-->
    This is a footer with no class
  </div>
</div>
```
```js
// JS
const parentElement = document.createElement('div');
parentElement.className = 'parent';

const parentTitleElement = document.createElement('span');
parentTitleElement.id = 'parent__title';

const parentContentElement = document.createElement('div');
parentContentElement.className = 'parent__content';
const parentContentElementText = document.createTextNode('This is a interesting dev blog');

parentContentElement.appendChild(parentContentElementText);

const randomHashElement = document.createElement('div');
randomHashElement.className = 'randomHash';
const randomHashElementText = document.createTextNode('This is a footer with no class');

randomHashElement.appendChild(randomHashElementText);

parentElement.appendChild(parentTitleElement);
parentElement.appendChild(parentContentElement);
parentElement.appendChild(randomHashElement);
```
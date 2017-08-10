console.log('Loaded!');

//change the text of main-text div
var element = document.getElementById('main-text');

element.innerHTML = 'New Value';

//Move the image
var img = document.geElementByID('img');
img.onclick = function() {
    img.style.marginleft = '100px';
};
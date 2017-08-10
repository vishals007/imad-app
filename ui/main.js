console.log('Loaded!');

//change the text of main-text div
var element = document.getElementById('main-text');

element.innerHTML = 'New Value';

//Move the image
var img = document.getElementById('madi');
img.oneclick = function () {
    img.style.marginLeft = '100px';
};
'use strict';

//create an array to store the array of objects for each picture
Products.possibleProducts =[];

//create a constructor function for the images
function Products(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  this.timesShown = 0;
  this.timesClicked = 0;
  Products.possibleProducts.push(this);
}

//create new instances for each picture
new Products('img/bag.jpg', 'R2D2 Rolling Bag');
new Products('img/banana.jpg', 'Banana Slicer');
new Products('img/bathroom.jpg', 'Bathroom Tech Stand');
new Products('img/boots.jpg', 'Toeless Rain Boots');
new Products('img/breakfast.jpg', 'Breakfast Station');
new Products('img/bubblegum.jpg', 'Meatball Bubblegum');
new Products('img/chair.jpg', 'Modern Art Chair');
new Products('img/cthulhu.jpg', 'Cthulhu Action Figure');
new Products('img/dog-duck.jpg', 'Dog Duck Mask');
new Products('img/dragon.jpg', 'Dragon Meat');
new Products('img/pen.jpg', 'Utensil Pens');
new Products('img/pet-sweep.jpg', 'Pet Sweep Dusting Boots');
new Products('img/scissors.jpg', 'Pizza Slice Scissors');
new Products('img/shark.jpg', 'Shark Sleeping Bag');
new Products('img/sweep.jpg', 'Baby Dusting Romper');
new Products('img/tauntaun.jpg', 'TaunTaun Sleeping Bag');
new Products('img/unicorn.jpg', 'Unicorn Meat');
new Products('img/usb.jpg', 'Octopus Tentacle USB');
new Products('img/water-can.jpg', 'Modern Art Watering Can');
new Products('img/wine-glass.jpg', 'Imbibing Moderator Wine Glass');


//access the DOM element
var pic1Element = document.getElementById('pic1');
var pic2Element = document.getElementById('pic2');
var pic3Element = document.getElementById('pic3');
//create an event listener that doesn't go beyond 25 votes
pic1Element.addEventListener('click', randomImage);
pic2Element.addEventListener('click', randomImage);
pic3Element.addEventListener('click', randomImage);

//create a random number function to randomly get the index for each image
function randomImage() {
  //create a random number
  var randomIndex1 = Math.floor(Math.random() * Products.possibleProducts.length);
  var randomIndex2 = Math.floor(Math.random() * Products.possibleProducts.length);
  var randomIndex3 = Math.floor(Math.random() * Products.possibleProducts.length);
  //search the indexes randomly
  pic1Element.src = Products.possibleProducts[randomIndex1].filepath;
  pic2Element.src = Products.possibleProducts[randomIndex2].filepath;
  pic3Element.src = Products.possibleProducts[randomIndex3].filepath;

  pic1Element.alt = Products.possibleProducts[randomIndex1].name;
  pic2Element.alt = Products.possibleProducts[randomIndex2].name;
  pic3Element.alt = Products.possibleProducts[randomIndex3].name;
}

//render the image on the page
randomImage();
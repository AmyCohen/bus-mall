'use strict';

//create an array to store the array of objects for each picture
Products.possibleProducts =[];
var imageAssortment =[];
var allotedGuesses = 0;

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
new Products('img/sweep.png', 'Baby Dusting Romper');
new Products('img/tauntaun.jpg', 'TaunTaun Sleeping Bag');
new Products('img/unicorn.jpg', 'Unicorn Meat');
new Products('img/usb.gif', 'Octopus Tentacle USB');
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

//create array to hold current assortment to compare against next assortment
// var previousAssortment = [];

//create a random number function to randomly get the index for each image
function randomImage() {
  imageAssortment = [];
  //create a random number
  var randomIndex1 = Math.floor(Math.random() * Products.possibleProducts.length);
  var randomIndex2 = Math.floor(Math.random() * Products.possibleProducts.length);
  var randomIndex3 = Math.floor(Math.random() * Products.possibleProducts.length);

  while (allotedGuesses <= 25) {
  //search the indexes randomly
    while ((randomIndex1 === randomIndex2) || (randomIndex2 === randomIndex3) || (randomIndex3 === randomIndex1)) {
      randomIndex1 = Math.floor(Math.random() * Products.possibleProducts.length);
      randomIndex2 = Math.floor(Math.random() * Products.possibleProducts.length);
      randomIndex3 = Math.floor(Math.random() * Products.possibleProducts.length);
    }

    imageAssortment.push(randomIndex1, randomIndex2, randomIndex3);

    pic1Element.src = Products.possibleProducts[randomIndex1].filepath;
    pic2Element.src = Products.possibleProducts[randomIndex2].filepath;
    pic3Element.src = Products.possibleProducts[randomIndex3].filepath;

    pic1Element.alt = Products.possibleProducts[randomIndex1].name;
    pic2Element.alt = Products.possibleProducts[randomIndex2].name;
    pic3Element.alt = Products.possibleProducts[randomIndex3].name;
    allotedGuesses ++;
  }
  // viewed(imageAssortment);
  console.log(imageAssortment);
  viewed(imageAssortment);

}
// var itemClicked = [];
var i = 0;
function whatClicked() {
  document.getElementById('pic1').value = i++;
  document.getElementById('pic2').value = i++;
  document.getElementById('pic3').value = i++;
}
// previousAssortment = imageAssortment;
//trying to find out how many times a picture is shown
function viewed(imageAssortment) {
  for (var j = 0; j < imageAssortment.length; j++) {
    Products.possibleProducts[imageAssortment[j]].timesShown++;
    console.log(Products.possibleProducts[imageAssortment[j]].name + ' has shown up ' + Products.possibleProducts[imageAssortment[j]].timesShown + ' time(s)');
  }
}

// function clicked(){
//   pic1Element.onclick = Products.possibleProducts.timesClicked ++;
//   pic2Element.onclick = Products.possibleProducts.timesClicked ++;
//   pic3Element.onclick = Products.possibleProducts.timesClicked ++;
//   console.log(Products.possibleProducts.timesClicked);
//   // button.innerHTML = "Click me: " + count;
// }


//render the image on the page
randomImage();
whatClicked();
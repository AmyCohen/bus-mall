'use strict';

//create an array to store the array of objects for each picture
Products.possibleProducts =[];
Products.imageAssortment =[];
Products.allotedGuesses = 0;

//names only in array for graphs
var productNamesArray = [];
//votes per picture
var imageSelection = [];

console.log('first declaration of this array ', imageSelection);
//how many times picture is shown
var imageShown = [];

//access the DOM element
var pic1Element = document.getElementById('pic1');
var pic2Element = document.getElementById('pic2');
var pic3Element = document.getElementById('pic3');

//access the ul element from the DOM
var ulImageElement = document.getElementById('imageClicked');


//create a constructor function for the images
function Products(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  this.timesShown = 0;
  this.timesClicked = 0;
  Products.possibleProducts.push(this);
  productNamesArray.push(this.name);
}

function pictureList () {
  //write an "if statement" to check if this exists AND writes it to local storage
  var pictures = localStorage.getItem('listOfProducts');
  var productList = JSON.parse(pictures);

  if (productList && productList.length) {
    Products.possibleProducts = productList;

    for (var i = 0; i < Products.possibleProducts.length; i++){
      productNamesArray[i] = Products.possibleProducts[i].name;
    }
    return;
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
}

//create a random number function to randomly get the index for each image
function randomImage() {
  //create a random number
  var randomIndex1 = Math.floor(Math.random() * Products.possibleProducts.length);
  var randomIndex2 = Math.floor(Math.random() * Products.possibleProducts.length);
  var randomIndex3 = Math.floor(Math.random() * Products.possibleProducts.length);

  //search the indexes randomly
  while ((randomIndex1 === randomIndex2) ||
  (randomIndex2 === randomIndex3) ||
  (randomIndex3 === randomIndex1) ||
  (Products.imageAssortment.includes(randomIndex1)) ||
  (Products.imageAssortment.includes(randomIndex2)) ||
  (Products.imageAssortment.includes(randomIndex3 ))) {

    randomIndex1 = Math.floor(Math.random() * Products.possibleProducts.length);
    randomIndex2 = Math.floor(Math.random() * Products.possibleProducts.length);
    randomIndex3 = Math.floor(Math.random() * Products.possibleProducts.length);
  }

  pic1Element.src = Products.possibleProducts[randomIndex1].filepath;
  pic1Element.alt = Products.possibleProducts[randomIndex1].name;

  pic2Element.src = Products.possibleProducts[randomIndex2].filepath;
  pic2Element.alt = Products.possibleProducts[randomIndex2].name;

  pic3Element.src = Products.possibleProducts[randomIndex3].filepath;
  pic3Element.alt = Products.possibleProducts[randomIndex3].name;

  //incremented the nuber of times displayed
  Products.possibleProducts[randomIndex1].timesShown++;
  Products.possibleProducts[randomIndex2].timesShown++;
  Products.possibleProducts[randomIndex3].timesShown++;

  //push to an array to track how many times an image is shown
  for (var i = 0; i < Products.possibleProducts.length; i++) {
    imageShown[i] = Products.possibleProducts[i].timesShown;
  }

  //Track last images used (replaced my viewed Function)
  Products.imageAssortment[0] = randomIndex1;
  Products.imageAssortment[1] = randomIndex2;
  Products.imageAssortment[2] = randomIndex3;
}

function handleClick(event) {
  //increment the click counter
  Products.allotedGuesses++;
  //increment the votes per image and loop through to find image that was clicked
  for (var i = 0; i < Products.possibleProducts.length; i++) {
    if(event.target.alt === Products.possibleProducts[i].name) {
      Products.possibleProducts[i].timesClicked++;
    }
  }

  if(Products.allotedGuesses > 24) {
    //turn off event listener
    ulImageElement.removeEventListener('click', handleClick);

    //save data to local storage upon completion of the list
    var saveProducts = JSON.stringify(Products.possibleProducts);
    localStorage.setItem('listOfProducts', saveProducts);

    //update image selections
    updateWhenClicked();

    //display chart
    renderSelectionChart();
    renderImageChart();
    renderComparisonChart();

  } else {
    //if less than 25, keep displaying images
    randomImage();
  }
}

function updateWhenClicked () {
  for (var i = 0; i < Products.possibleProducts.length; i++) {
    imageSelection[i] = Products.possibleProducts[i].timesClicked;
  }
}

ulImageElement.addEventListener('click', handleClick);

//render the image on the page - PAGE LOAD
pictureList();
randomImage();


//CHART SECTION ONLY

//Transparant colors for the main bar and wedges.
var arrayOfColors = ['rgba(142, 1, 81, 0.6)', 'rgba(197, 27, 126, 0.6)', 'rgba(222, 120, 174, 0.6)', 'rgba(241, 182, 219, 0.6)', 'rgba(253, 226, 240, 0.6)', 'rgba(231, 245, 209, 0.6)', 'rgba(183, 224, 133, 0.6)', 'rgba(128, 190, 65, 0.6)', 'rgba(76, 145, 33, 0.6)', 'rgba(40, 102, 25, 0.6)', 'rgba(82, 47, 5, 0.6)', 'rgba(138, 80, 10, 0.6)', 'rgba(190, 129, 45, 0.6)', 'rgba(222, 193, 124, 0.6)', 'rgba(246, 232, 193, 0.6)', 'rgba(200, 234, 229, 0.6)', 'rgba(126, 205, 193, 0.6)', 'rgba(53, 151, 143, 0.6)', 'rgba(1, 101, 93, 0.6)', 'rgba(0, 61, 49, 0.6)'];

//Solid colors of the transparent ones above for borders shown on HOVER ONLY
var arrayOfAccentColors = ['#8E0152', '#C51B7D', '#DE77AE', '#F1B6DA', '#FDE0EF', '#E6F5D0', '#B8E186', '#7FBC41', '#4D9221', '#276419', '#543005', '#8C510A', '#BF812D', '#DFC27D', '#F6E8C3', '#C7EAE5', '#80CDC1', '#35978F', '#01665E', '#003C30'];

//Use Chart.js to create a graph
function renderSelectionChart() {
  //access the canvas element from the DOM using var
  var context = document.getElementById('results-chart').getContext('2d');

  new Chart(context, {
    type: 'bar',
    data: {
      labels: productNamesArray,
      datasets: [{
        label: 'Product Selections',
        data: imageSelection,
        backgroundColor: arrayOfColors,
        borderColor: arrayOfAccentColors,
        borderWidth: 0,
        hoverBorderWidth: 7,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1,
          }
        }],
        xAxes: [{
          ticks: {
            autoSkip: false,
          }
        }]
      }
    }
  });
}

function renderImageChart() {
  //access the canvas element from the DOM using var
  var context = document.getElementById('images-chart').getContext('2d');

  new Chart(context, {
    type: 'doughnut',
    data: {
      labels: productNamesArray,
      datasets: [{
        label: 'Images Shown',
        data: imageShown,
        backgroundColor: arrayOfColors,
        borderColor: arrayOfAccentColors,
        borderWidth: 0,
        hoverBorderWidth: 7,
      }]
    },
    options: {
      cutoutPercentage: 50,
      legend: {
        display: true,
        position: 'left'
      },
      scales: {
      },
    }
  });
}


function renderComparisonChart() {
  //access the canvas element from the DOM using var
  var context = document.getElementById('comparison-chart').getContext('2d');

  new Chart(context, {
    type: 'line',
    data: {
      labels: productNamesArray,
      datasets: [{
        label: 'Votes Per Item',
        data: imageSelection,
        lineTension: 0,
        fill: true,
        borderColor: 'rgb(54, 132, 175)',
        backgroundColor: 'rgba(54, 132, 175, 0.6',
        pointBorderColor: 'rgb(54, 132, 175)',
        pointBackgroundColor: arrayOfAccentColors,
        pointRadius: 5,
        pointHoverRadius: 10,
        pointHitRadius: 30,
        pointBorderWidth: 2,
        pointStyle: 'rectRounded'
      },{
        label: 'Times Item Was Shown',
        data: imageShown,
        lineTension: 0,
        fill: true,
        borderColor: 'rgb(95, 180, 126)',
        backgroundColor: 'rgba(95, 180, 126, 0.6)',
        pointBorderColor: 'rgb(95, 180, 126)',
        pointBackgroundColor: arrayOfAccentColors,
        pointRadius: 5,
        pointHoverRadius: 10,
        pointHitRadius: 30,
        pointBorderWidth: 2,
        pointStyle: 'rectRounded'
      }],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 3,
          }
        }],
        xAxes: [{
          ticks: {
            autoSkip: false,
          }
        }]
      }
    }
  });
}

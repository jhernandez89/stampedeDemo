/* global $ window */

const flyingGif = ['/flying1.gif', '/flying2.gif',
  '/flying3.gif', '/flying4.gif',
  '/flying5.gif', '/flying6.gif',
  '/flying7.gif', '/flying8.gif',
  '/flying9.gif', '/flying10.gif',
  '/flying11.gif', '/flying12.gif',
  '/flying13.gif', '/flying14.gif',
  '/flying15.gif', '/flying16.gif',
  '/flying17.gif', '/flying18.gif',
  '/flying19.gif', '/flying20.gif',
  '/flying21.gif',
];

const width = 500;

/* this takes the width of the screen (which is needed becuase screen sizes
are all different) */
const screenWidth = $(window).width();

/* global variables for randomly generated numbers */
let marginTop;
let duration;
let imgNum;
let timeBetweenImages;

/* This function randomly generates the position the gif will take
on the vertical axis */
function generateRandomMargin(milliseconds) {
  const num = Math.floor(Math.random() * milliseconds);
  return num;
}

/* this function randomly generates the time it will take the images
to cross the screen */
function generateRandomDuration(millisecStatic, millisecDynamic) {
  const num = (Math.floor(Math.random() * millisecDynamic)) + millisecStatic;
  return num;
}

/* this function randomly selects a gif */
function chooseRandomGif(numOfGifs) {
  const num = (Math.floor(Math.random() * numOfGifs));
  return num;
}

/* this function randomly generates the time between gifs.  The 'i' is needed
because the delay in time is always referencing the beginning point.
multiplying by 'i' allows the random number to continue increasing in size
so each additional gif starts further and further away */
function timeBetween(range, i) {
  const num = Math.floor(Math.random() * range) * i;
  return num;
}

function setImgDivAttributes(imgDiv) {
  imgDiv.attr('src', `images/${flyingGif[imgNum]}`);
  imgDiv.attr('width', '90px');
  imgDiv.attr('height', 'auto');
  imgDiv.attr('left', '-100px');
  imgDiv.appendTo('.flyYouFools');
}
/* Edit variables within these two comments to change height, duration,
git numbers, and how many gifs should be used (probably don't change 'i') */

/* in the function below, generateRandomDuration(a, b), the first parameter is the
starting duration for the gifs (they'll never be smaller than the set
value).  The second paramter is the range of of a randomly generated
number
(I.e., if the first value is 5000 and the second is 7000, the duration range
would be randomly generated between 5000 and 12000 miliseconds)
*/
function defineRandomVariables(i) {
  marginTop = generateRandomMargin(580);
  duration = generateRandomDuration(10000, 10000);
  imgNum = chooseRandomGif(flyingGif.length);
  timeBetweenImages = timeBetween(70, i);
}
const howManyImages = 75;
/* Edit variables within these two comment to change height, duration,
git numbers, and how many gifs should be used (probably don't change i) */

function putImagesIn(i) {
  return () => {
    /* defineRandomVariables defines random variables */
    defineRandomVariables(i);

    /* imgDiv is what all the gif divs are made out of, it appends it to the
    parent div "flyYouFools" a number of times equal to the variable
    "howManyImages" using the for loop in the function "loopThroughImages" */
    const imgDiv = $(`<img id=flyingAnimal class=flying${i}>`);

    /* This defines the imgDiv attributes.  It could be done in this function,
    but for readability it's done in it's own function */
    setImgDivAttributes(imgDiv);

    /* Margin top determines what position the gif will be on the
    vertical axis */
    $(`.flying${i}`).css({
      'margin-top': `${marginTop}px`,
    });

    /* These next three lines are where the images actually get animated */
    imgDiv.css('left', (-width)).animate({
      left: screenWidth + 3000,
    }, duration);
  };
}

function loopThroughImages() {
  for (let i = 0; i < howManyImages; i += 1) {
    defineRandomVariables(i);

    /* setTimeout determines how long the computer will wait before placing
    in the next gif div */
    setTimeout(putImagesIn(i), timeBetweenImages);
  }
}

$('.stampede').click(() => {
  loopThroughImages();
  /* This empty function empties the parent div so if a user clicks a button
  multiple times, the gifs won't keep building up */
  $('.flyYouFools').empty();
});

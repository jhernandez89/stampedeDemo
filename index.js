/* global $ window */

const flyingGif = ['/flying1.gif', '/flying2.gif',
  '/flying3.gif', '/flying4.gif',
  '/flying5.gif', '/flying6.gif',
  '/flying7.gif', '/flying8.gif',
  '/flying9.gif', '/flying10.gif',
  '/flying11.gif'];

const width = 500;
const screenWidth = $(window).width();
let margin;
let duration;
let imgNum;
let timeBetweenImages;

function generateRandomMargin(milliseconds) {
  const num = Math.floor(Math.random() * milliseconds);
  return num;
}

function generateRandomDuration(millisecDynamic, millisecStatic) {
  const num = (Math.floor(Math.random() * millisecDynamic)) + millisecStatic;
  return num;
}

function chooseRandomGif(numOfGifs) {
  const num = (Math.floor(Math.random() * numOfGifs));
  return num;
}

function timeBetween(range, i) {
  const num = Math.floor(Math.random() * range) * i;
  return num;
}

function setImgDivAttributes(imgDiv) {
  imgDiv.attr('src', `images/${flyingGif[imgNum]}`);
  imgDiv.attr('height', '40px');
  imgDiv.attr('left', '-100px');
  imgDiv.appendTo('.flyYouFools');
}
// Edit variables within these two comments to change height, duration,
// git numbers, and how many gifs should be used (probably don't change i)
function defineRandomVariables(i) {
  margin = generateRandomMargin(580);
  duration = generateRandomDuration(10000, 10000);
  imgNum = chooseRandomGif(flyingGif.length);
  timeBetweenImages = timeBetween(70, i);
}
const howManyImages = 75;
// Edit variables within these two comment to change height, duration,
// git numbers, and how many gifs should be used (probably don't change i)

function putImagesIn(i) {
  return () => {
    defineRandomVariables();
    const imgDiv = $(`<img id=flyingAnimal class=dinosaur${i}>`);
    setImgDivAttributes(imgDiv);
    $(`.dinosaur${i}`).css({
      'margin-top': `${margin}px`,
    });
    imgDiv.css('left', (-width)).animate({
      left: screenWidth + 3000,
      bottom: '+=70',
    }, duration);
  };
}

function loopThroughImages() {
  for (let i = 0; i < howManyImages; i += 1) {
    defineRandomVariables(i);
    setTimeout(putImagesIn(i), timeBetweenImages);
  }
}

$('.stampede').click(() => {
  loopThroughImages();
  $('.flyYouFools').empty();
});
